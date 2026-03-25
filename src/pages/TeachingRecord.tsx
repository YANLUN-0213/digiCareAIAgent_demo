import { useState, useRef, useCallback, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import {
  MOCK_MEDICAL_PATIENTS,
  MOCK_TEACHING_CASES,
  type TeachingRecordCase,
  type DiffSegment,
} from '@/data/mockData'

const statusMap: Record<string, { label: string; severity: 'warning' | 'success' | 'info' }> = {
  pending: { label: '待審閱', severity: 'warning' },
  reviewed: { label: '已審閱', severity: 'info' },
  confirmed: { label: '已確認', severity: 'success' },
}

const diffColors = {
  added: { bg: '#d4edda', label: '新增', color: '#155724' },
  deleted: { bg: '#f8d7da', label: '刪除', color: '#721c24' },
  modified: { bg: '#fff3cd', label: '修改', color: '#856404' },
}

const TeachingRecord = () => {
  const { showSuccess, showInfo } = useToast()

  const [cases, setCases] = useState(MOCK_TEACHING_CASES)
  const [filterPatient, setFilterPatient] = useState('all')
  const [selectedCase, setSelectedCase] = useState<TeachingRecordCase | null>(null)
  const [rejectVisible, setRejectVisible] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  // AI streaming
  const [aiText, setAiText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    setIsStreaming(false)
  }, [])

  const startStreaming = useCallback((fullText: string) => {
    stopStreaming()
    setAiText('')
    setIsStreaming(true)
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 3
      if (idx >= fullText.length) {
        setAiText(fullText)
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setIsStreaming(false)
      } else {
        setAiText(fullText.slice(0, idx))
      }
    }, 10)
  }, [stopStreaming])

  useEffect(() => () => stopStreaming(), [stopStreaming])

  const filteredCases = filterPatient === 'all'
    ? cases
    : cases.filter(c => c.patientId === filterPatient)

  const patientOptions = [
    { label: '全部病人', value: 'all' },
    ...MOCK_MEDICAL_PATIENTS.map(p => ({ label: `${p.name} (${p.chartNo})`, value: p.id })),
  ]

  const handleOpenCase = (tc: TeachingRecordCase) => {
    setSelectedCase(tc)
    startStreaming(tc.aiSummary)
  }

  const handleBack = () => {
    stopStreaming()
    setSelectedCase(null)
  }

  const handleConfirm = () => {
    if (!selectedCase) return
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'confirmed' as const } : c))
    setSelectedCase(prev => prev ? { ...prev, status: 'confirmed' } : null)
    showSuccess('已確認', '修改內容已確認，教學紀錄已更新')
  }

  const handleReject = () => {
    if (!selectedCase) return
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'reviewed' as const } : c))
    setSelectedCase(prev => prev ? { ...prev, status: 'reviewed' } : null)
    setRejectVisible(false)
    setRejectReason('')
    showInfo('已退回', '已退回住院醫師修正')
  }

  const getPatient = (patientId: string) => MOCK_MEDICAL_PATIENTS.find(p => p.id === patientId)

  // === Diff 渲染 ===
  const renderDiffLeft = (segments: DiffSegment[]) =>
    segments.map((seg, i) => {
      if (seg.type === 'unchanged') return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{seg.text}</span>
      if (seg.type === 'deleted') return <span key={i} style={{ backgroundColor: diffColors.deleted.bg, textDecoration: 'line-through', padding: '1px 3px', borderRadius: 3, whiteSpace: 'pre-wrap' }}>{seg.residentText}</span>
      if (seg.type === 'modified') return <span key={i} style={{ backgroundColor: diffColors.modified.bg, padding: '1px 3px', borderRadius: 3, whiteSpace: 'pre-wrap' }}>{seg.residentText}</span>
      return null // added 不顯示在左邊
    })

  const renderDiffRight = (segments: DiffSegment[]) =>
    segments.map((seg, i) => {
      if (seg.type === 'unchanged') return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{seg.text}</span>
      if (seg.type === 'added') return <span key={i} style={{ backgroundColor: diffColors.added.bg, padding: '1px 3px', borderRadius: 3, whiteSpace: 'pre-wrap' }}>{seg.attendingText}</span>
      if (seg.type === 'modified') return <span key={i} style={{ backgroundColor: diffColors.modified.bg, padding: '1px 3px', borderRadius: 3, whiteSpace: 'pre-wrap' }}>{seg.attendingText}</span>
      return null // deleted 不顯示在右邊
    })

  // === 列表視圖 ===
  if (!selectedCase) {
    return (
      <div className="content-inner">
        <PageHeader funcName="教學病歷" />
        <Card className="card">
          <div className="flex align-items-center gap-3 mb-3">
            <Dropdown value={filterPatient} options={patientOptions} onChange={e => setFilterPatient(e.value)} placeholder="篩選病人" className="w-20rem" filter filterPlaceholder="搜尋病人姓名或病歷號" />
            <span className="text-sm text-500">共 {filteredCases.length} 筆案件</span>
          </div>
          <DataTable value={filteredCases} size="small" stripedRows emptyMessage="無案件資料">
            <Column header="病歷號" body={(row: TeachingRecordCase) => getPatient(row.patientId)?.chartNo} style={{ width: '100px' }} />
            <Column header="病人" body={(row: TeachingRecordCase) => getPatient(row.patientId)?.name} style={{ width: '100px' }} />
            <Column header="診斷" body={(row: TeachingRecordCase) => getPatient(row.patientId)?.diagnosis} />
            <Column header="住院醫師" body={(row: TeachingRecordCase) => getPatient(row.patientId)?.residentDoctor} style={{ width: '100px' }} />
            <Column header="主治醫師" body={(row: TeachingRecordCase) => getPatient(row.patientId)?.attendingDoctor} style={{ width: '100px' }} />
            <Column header="建立時間" field="createdAt" style={{ width: '140px' }} />
            <Column header="狀態" body={(row: TeachingRecordCase) => {
              const s = statusMap[row.status]
              return <Tag value={s.label} severity={s.severity} />
            }} style={{ width: '90px' }} />
            <Column header="操作" body={(row: TeachingRecordCase) => (
              <Button label="檢視" icon="pi pi-eye" className="p-button-sm p-button-outlined" onClick={() => handleOpenCase(row)} />
            )} style={{ width: '100px' }} />
          </DataTable>
        </Card>
      </div>
    )
  }

  // === 詳細視圖 ===
  const patient = getPatient(selectedCase.patientId)
  const st = statusMap[selectedCase.status]

  return (
    <div className="content-inner">
      <PageHeader funcName="教學病歷" />

      {/* 操作列 */}
      <Card className="card">
        <div className="flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="flex align-items-center gap-3">
            <Button icon="pi pi-arrow-left" label="回列表" className="p-button-text" onClick={handleBack} />
            <span className="font-bold">{patient?.name}</span>
            <span className="text-500">{patient?.chartNo}</span>
            <Tag value={st.label} severity={st.severity} />
          </div>
          <div className="flex gap-2">
            {selectedCase.status === 'pending' && (
              <>
                <Button label="確認修改" icon="pi pi-check" className="p-button-sm" onClick={handleConfirm} />
                <Button label="退回" icon="pi pi-times" className="p-button-sm p-button-outlined p-button-danger" onClick={() => setRejectVisible(true)} />
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Diff 對照 */}
      <Card className="card mt-3" title="病歷差異比對">
        <div className="grid">
          <div className="col-12 lg:col-6">
            <div className="font-bold mb-2" style={{ color: '#6c757d' }}>
              <i className="pi pi-user mr-2" />住院醫師版本（{patient?.residentDoctor}）
            </div>
            <div style={{ background: '#fafafa', border: '1px solid #dee2e6', borderRadius: 8, padding: '1rem', fontSize: '0.9rem', lineHeight: 1.8, minHeight: 300 }}>
              {renderDiffLeft(selectedCase.diffSegments)}
            </div>
          </div>
          <div className="col-12 lg:col-6">
            <div className="font-bold mb-2" style={{ color: '#155724' }}>
              <i className="pi pi-verified mr-2" />主治醫師版本（{patient?.attendingDoctor}）
            </div>
            <div style={{ background: '#fafafa', border: '1px solid #dee2e6', borderRadius: 8, padding: '1rem', fontSize: '0.9rem', lineHeight: 1.8, minHeight: 300 }}>
              {renderDiffRight(selectedCase.diffSegments)}
            </div>
          </div>
        </div>
        {/* 圖例 */}
        <div className="flex gap-4 mt-3 text-sm">
          {Object.entries(diffColors).map(([key, val]) => (
            <div key={key} className="flex align-items-center gap-2">
              <span style={{ display: 'inline-block', width: 16, height: 16, borderRadius: 3, backgroundColor: val.bg, border: '1px solid #ccc' }} />
              <span style={{ color: val.color }}>{val.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* AI 分析 */}
      <Card className="card mt-3">
        <div className="flex align-items-center gap-2 mb-3">
          <i className="pi pi-sparkles" style={{ color: 'var(--primary_color)', fontSize: '1.2rem' }} />
          <span className="font-bold text-lg">AI 修改分析</span>
          {isStreaming && <i className="pi pi-spin pi-spinner ml-2" style={{ color: '#999' }} />}
        </div>
        <div className="markdown-body" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiText}</ReactMarkdown>
        </div>
      </Card>

      {/* 退回 Dialog */}
      <Dialog header="退回修改" visible={rejectVisible} onHide={() => setRejectVisible(false)} style={{ width: '450px' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="取消" className="p-button-text" onClick={() => setRejectVisible(false)} />
            <Button label="確定退回" icon="pi pi-times" className="p-button-danger" onClick={handleReject} />
          </div>
        }
      >
        <p className="mb-2">請輸入退回原因或修改建議：</p>
        <InputTextarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4} className="w-full" placeholder="例：Present Illness 需補充更多 ROS..." />
      </Dialog>
    </div>
  )
}

export default TeachingRecord
