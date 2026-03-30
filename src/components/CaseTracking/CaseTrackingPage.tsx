import { useState, useCallback, useMemo } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import PipelineTracker from './PipelineTracker'
import PipelineStepDetail from './PipelineStepDetail'
import VpnUploadPanel from './VpnUploadPanel'
import { MOCK_CASES } from './case-tracking.mock'
import type { CaseRecord, CaseOverallStatus, VpnUploadResult } from './case-tracking.types'
import './case-tracking.scss'

const IG_OPTIONS = [
  { label: '全部', value: '' },
  { label: 'TWPAS', value: 'TWPAS' },
  { label: 'TWCI', value: 'TWCI' },
  { label: 'TWNGS', value: 'TWNGS' },
]

const STATUS_OPTIONS = [
  { label: '全部', value: '' },
  { label: '驗證中', value: 'validating' },
  { label: '驗證失敗', value: 'failed' },
  { label: '等待確認', value: 'waiting' },
  { label: '已完成', value: 'completed' },
]

function getOverallStatus(c: CaseRecord): CaseOverallStatus {
  if (c.vpnResult?.status === 'completed') return 'completed'
  const hasInProgress = c.steps.some(s => s.status === 'in_progress')
  const hasFailed = c.steps.some(s => s.status === 'failed')
  if (hasFailed) return 'failed'
  if (hasInProgress) return 'validating'
  // All non-skipped verification steps done (steps 0-3)
  const verifySteps = c.steps.slice(0, 4)
  const allVerified = verifySteps.every(s => s.status === 'success' || s.status === 'skipped')
  if (allVerified && c.steps[5].status !== 'success') return 'waiting'
  if (c.steps[5].status === 'success') return 'completed'
  return 'validating'
}

const statusTagMap: Record<CaseOverallStatus, { label: string; severity: 'success' | 'danger' | 'warning' | 'info' }> = {
  completed: { label: '已完成', severity: 'success' },
  failed: { label: '驗證失敗', severity: 'danger' },
  waiting: { label: '等待確認', severity: 'warning' },
  validating: { label: '驗證中', severity: 'info' },
  uploading: { label: '上傳中', severity: 'info' },
}

const CaseTrackingPage = () => {
  const [cases, setCases] = useState<CaseRecord[]>(() => [...MOCK_CASES])
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null)
  const [showVpnPanel, setShowVpnPanel] = useState(false)

  // Filters
  const [filterIg, setFilterIg] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterText, setFilterText] = useState('')

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      if (filterIg && c.igType !== filterIg) return false
      if (filterStatus && getOverallStatus(c) !== filterStatus) return false
      if (filterText) {
        const q = filterText.toLowerCase()
        if (!c.patientName.toLowerCase().includes(q) && !c.patientId.toLowerCase().includes(q) && !c.id.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [cases, filterIg, filterStatus, filterText])

  const openDetail = useCallback((c: CaseRecord) => {
    setSelectedCase(c)
    setActiveStepIdx(null)
    setShowVpnPanel(!!c.vpnResult)
    setDialogVisible(true)
  }, [])

  const handleStepClick = useCallback((idx: number) => {
    setActiveStepIdx(prev => prev === idx ? null : idx)
  }, [])

  const handleConfirmUpload = useCallback(() => {
    if (!selectedCase) return
    confirmDialog({
      message: `確定要將案件 ${selectedCase.id}（${selectedCase.patientName}）的資料正式上傳至健保署？`,
      header: '確認上傳',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認上傳',
      rejectLabel: '取消',
      accept: () => {
        // Mark step 5 as success, step 6 as in_progress
        setCases(prev => prev.map(c => {
          if (c.id !== selectedCase.id) return c
          const newSteps = [...c.steps]
          newSteps[4] = { ...newSteps[4], status: 'success', timestamp: new Date().toLocaleString('sv-SE').replace('T', ' ') }
          newSteps[5] = { ...newSteps[5], status: 'in_progress' }
          return { ...c, steps: newSteps }
        }))
        setSelectedCase(prev => {
          if (!prev) return prev
          const newSteps = [...prev.steps]
          newSteps[4] = { ...newSteps[4], status: 'success', timestamp: new Date().toLocaleString('sv-SE').replace('T', ' ') }
          newSteps[5] = { ...newSteps[5], status: 'in_progress' }
          return { ...prev, steps: newSteps }
        })
        setShowVpnPanel(true)
      },
    })
  }, [selectedCase])

  const handleVpnComplete = useCallback((result: VpnUploadResult) => {
    if (!selectedCase) return
    setCases(prev => prev.map(c => {
      if (c.id !== selectedCase.id) return c
      const newSteps = [...c.steps]
      newSteps[5] = { ...newSteps[5], status: 'success', timestamp: result.uploadTime }
      return { ...c, steps: newSteps, vpnResult: result }
    }))
    setSelectedCase(prev => {
      if (!prev) return prev
      const newSteps = [...prev.steps]
      newSteps[5] = { ...newSteps[5], status: 'success', timestamp: result.uploadTime }
      return { ...prev, steps: newSteps, vpnResult: result }
    })
  }, [selectedCase])

  const handleRevalidate = useCallback(() => {
    if (!selectedCase) return
    // Reset all steps for re-validation (simulate starting from step 1)
    setCases(prev => prev.map(c => {
      if (c.id !== selectedCase.id) return c
      const newSteps = c.steps.map((s, i) => {
        if (i === 0) return { ...s, status: 'in_progress' as const, timestamp: new Date().toLocaleString('sv-SE').replace('T', ' ') }
        if ((i === 1 || i === 3) && !c.hasCqlMatch) return { ...s, status: 'skipped' as const, timestamp: undefined }
        return { ...s, status: 'pending' as const, timestamp: undefined, items: [], errorCount: 0, warningCount: 0 }
      })
      return { ...c, steps: newSteps, vpnResult: undefined }
    }))
    setSelectedCase(prev => {
      if (!prev) return prev
      const newSteps = prev.steps.map((s, i) => {
        if (i === 0) return { ...s, status: 'in_progress' as const, timestamp: new Date().toLocaleString('sv-SE').replace('T', ' ') }
        if ((i === 1 || i === 3) && !prev.hasCqlMatch) return { ...s, status: 'skipped' as const, timestamp: undefined }
        return { ...s, status: 'pending' as const, timestamp: undefined, items: [], errorCount: 0, warningCount: 0 }
      })
      return { ...prev, steps: newSteps, vpnResult: undefined }
    })
    setShowVpnPanel(false)
    setActiveStepIdx(null)
  }, [selectedCase])

  // ===== Column renderers =====

  const miniPipeline = (c: CaseRecord) => (
    <div className="ct-mini-pipeline">
      {c.steps.map((s, i) => (
        <span key={i} className={`ct-mini-dot ct-dot-${s.status}`} title={s.label} />
      ))}
    </div>
  )

  const statusColumn = (c: CaseRecord) => {
    const st = getOverallStatus(c)
    const { label, severity } = statusTagMap[st]
    return <Tag value={label} severity={severity} />
  }

  const diagnosisColumn = (c: CaseRecord) => (
    <span>{c.diagnosisCodes.join(', ')}</span>
  )

  const actionColumn = (c: CaseRecord) => (
    <Button
      icon="pi pi-search"
      rounded
      text
      size="small"
      tooltip="查看詳情"
      tooltipOptions={{ position: 'top' }}
      onClick={() => openDetail(c)}
    />
  )

  const isWaiting = selectedCase ? getOverallStatus(selectedCase) === 'waiting' : false

  return (
    <div className="ct-page">
      <ConfirmDialog />

      {/* Filters */}
      <Card className="mb-3">
        <div className="flex flex-wrap gap-3 align-items-end">
          <div className="flex flex-column gap-1">
            <label className="text-sm font-medium">IG 類型</label>
            <Dropdown
              value={filterIg}
              options={IG_OPTIONS}
              onChange={e => setFilterIg(e.value)}
              placeholder="全部"
              style={{ width: '160px' }}
            />
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-sm font-medium">狀態</label>
            <Dropdown
              value={filterStatus}
              options={STATUS_OPTIONS}
              onChange={e => setFilterStatus(e.value)}
              placeholder="全部"
              style={{ width: '160px' }}
            />
          </div>
          <div className="flex flex-column gap-1">
            <label className="text-sm font-medium">搜尋</label>
            <InputText
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              placeholder="病人姓名 / 身分證 / 案件編號"
              style={{ width: '280px' }}
            />
          </div>
        </div>
      </Card>

      {/* Case list */}
      <Card>
        <DataTable
          value={filteredCases}
          paginator
          rows={10}
          stripedRows
          emptyMessage="無符合條件的案件"
          rowHover
          onRowClick={e => openDetail(e.data as CaseRecord)}
          style={{ cursor: 'pointer' }}
        >
          <Column field="id" header="案件編號" style={{ width: '110px' }} />
          <Column field="createdAt" header="建立時間" style={{ width: '160px' }} />
          <Column field="patientName" header="病人姓名" style={{ width: '100px' }} />
          <Column field="igType" header="IG 類型" style={{ width: '80px' }} />
          <Column header="診斷碼" body={diagnosisColumn} style={{ width: '120px' }} />
          <Column header="Pipeline" body={miniPipeline} style={{ width: '120px' }} />
          <Column header="狀態" body={statusColumn} style={{ width: '100px' }} />
          <Column header="" body={actionColumn} style={{ width: '60px' }} />
        </DataTable>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        header={selectedCase ? `案件詳情 — ${selectedCase.id}` : '案件詳情'}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        style={{ width: '900px' }}
        maximizable
        modal
      >
        {selectedCase && (
          <div className="ct-detail">
            {/* Patient summary */}
            <div className="ct-patient-summary">
              <div className="flex flex-wrap gap-4 text-sm">
                <span><strong>病人姓名：</strong>{selectedCase.patientName}</span>
                <span><strong>身分證號：</strong>{selectedCase.patientId}</span>
                <span><strong>醫事機構：</strong>{selectedCase.hospId}</span>
                <span><strong>IG 類型：</strong>{selectedCase.igType}</span>
                <span><strong>診斷碼：</strong>{selectedCase.diagnosisCodes.join(', ')}</span>
                {selectedCase.drugCode && <span><strong>藥品代碼：</strong>{selectedCase.drugCode}</span>}
              </div>
              {selectedCase.matchedCqlLibraries.length > 0 && (
                <div className="mt-2 text-sm" style={{ color: '#6366f1' }}>
                  <i className="pi pi-book mr-1" />
                  適用 CQL：{selectedCase.matchedCqlLibraries.map(l => l.name).join('、')}
                </div>
              )}
              {!selectedCase.hasCqlMatch && (
                <div className="mt-2 text-sm" style={{ color: '#9ca3af' }}>
                  <i className="pi pi-info-circle mr-1" />
                  無適用 CQL 規則，CQL 步驟將自動跳過
                </div>
              )}
            </div>

            <Divider />

            {/* Pipeline stepper */}
            <PipelineTracker steps={selectedCase.steps} onStepClick={handleStepClick} />

            {/* Step detail panel */}
            {activeStepIdx !== null && (
              <div className="ct-step-panel">
                <h4 className="mt-0 mb-2">{selectedCase.steps[activeStepIdx].label} — 驗證結果</h4>
                <PipelineStepDetail step={selectedCase.steps[activeStepIdx]} />
              </div>
            )}

            <Divider />

            {/* Action area */}
            <div className="flex gap-2 align-items-center">
              {isWaiting && !showVpnPanel && (
                <Button
                  label="確認上傳"
                  icon="pi pi-cloud-upload"
                  severity="success"
                  onClick={handleConfirmUpload}
                />
              )}
              {getOverallStatus(selectedCase) === 'failed' && (
                <Button
                  label="重新驗證"
                  icon="pi pi-refresh"
                  severity="warning"
                  outlined
                  onClick={handleRevalidate}
                />
              )}
              {getOverallStatus(selectedCase) === 'completed' && (
                <Tag value="已完成上傳" severity="success" icon="pi pi-check" className="text-base px-3 py-2" />
              )}
            </div>

            {/* VPN upload panel */}
            {showVpnPanel && (
              <>
                <Divider />
                <VpnUploadPanel
                  onComplete={handleVpnComplete}
                  existingResult={selectedCase.vpnResult}
                />
              </>
            )}
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default CaseTrackingPage
