import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import { SelectButton } from 'primereact/selectbutton'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { Panel } from 'primereact/panel'
import {
  MOCK_MEDICAL_PATIENTS,
  getMedicalWritingDraft,
  getHisSourceData,
  OUTPUT_FORMAT_OPTIONS,
  MOCK_MANUAL_WRITING_EXAMPLES,
  getManualWritingExample,
} from '@/data/mockData'

const WRITING_TYPES = [
  { key: 'admission', label: '入院病摘', subtitle: 'Admission Note', icon: 'pi pi-sign-in' },
  { key: 'discharge', label: '出院病摘', subtitle: 'Discharge Summary', icon: 'pi pi-sign-out' },
  { key: 'weekly', label: '每週摘要', subtitle: 'Weekly Summary', icon: 'pi pi-calendar' },
]

type GenStatus = 'idle' | 'generating' | 'complete'

const MedicalWriting = () => {
  const { showSuccess, showInfo } = useToast()

  const [selectedType, setSelectedType] = useState('admission')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState('standard')
  const [hisMode, setHisMode] = useState<'system' | 'manual'>('system')

  // 系統擷取模式狀態
  const [systemDraft, setSystemDraft] = useState('')
  const [systemStatus, setSystemStatus] = useState<GenStatus>('idle')

  // 手動輸入模式狀態
  const [manualJson, setManualJson] = useState('')
  const [selectedManualExample, setSelectedManualExample] = useState<string | null>(null)
  const [manualDraft, setManualDraft] = useState('')
  const [manualStatus, setManualStatus] = useState<GenStatus>('idle')

  // streaming
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const startStreaming = useCallback((
    text: string,
    setDraft: (t: string) => void,
    setStatus: (s: GenStatus) => void,
  ) => {
    stopStreaming()
    setDraft('')
    setStatus('generating')
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 3
      if (idx >= text.length) {
        setDraft(text)
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
        setStatus('complete')
      } else {
        setDraft(text.slice(0, idx))
      }
    }, 10)
  }, [stopStreaming])

  useEffect(() => () => stopStreaming(), [stopStreaming])

  // 依當前模式取 draft 與 status
  const draftText = hisMode === 'system' ? systemDraft : manualDraft
  const genStatus = hisMode === 'system' ? systemStatus : manualStatus
  const setDraftText = hisMode === 'system' ? setSystemDraft : setManualDraft

  const handleGenerate = () => {
    if (hisMode === 'system') {
      if (!selectedPatient) {
        showInfo('請選擇病人', '請先選擇一位病人再進行 AI 生成')
        return
      }
      const content = getMedicalWritingDraft(selectedType, selectedPatient, selectedFormat)
      startStreaming(content, setSystemDraft, setSystemStatus)
    } else {
      if (!selectedManualExample) {
        showInfo('請選擇範例', '請先點選一筆範例資料作為 AI 生成的輸入來源')
        return
      }
      const ex = getManualWritingExample(selectedManualExample)
      if (!ex) return
      const typeKey = (['admission', 'discharge', 'weekly'].includes(selectedType) ? selectedType : 'admission') as 'admission' | 'discharge' | 'weekly'
      const formatKey = (selectedFormat === 'soap' ? 'soap' : 'standard') as 'standard' | 'soap'
      const content = ex.drafts[typeKey]?.[formatKey] ?? ex.drafts[ex.defaultType].standard
      startStreaming(content, setManualDraft, setManualStatus)
    }
  }

  const handleRegenerate = () => handleGenerate()

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText)
    showSuccess('已複製', '病歷草稿已複製到剪貼簿')
  }

  const handleSave = () => {
    showSuccess('已儲存', '草稿已暫存成功')
  }

  const handlePickManualExample = (id: string) => {
    const ex = getManualWritingExample(id)
    if (!ex) return
    setSelectedManualExample(id)
    setManualJson(ex.hisJson)
    // 切換至範例預設類型（使用者仍可再切換）
    setSelectedType(ex.defaultType)
    if (manualStatus !== 'generating') {
      setManualStatus('idle')
      setManualDraft('')
    }
  }

  const handleClearManual = () => {
    setSelectedManualExample(null)
    setManualJson('')
    if (manualStatus !== 'generating') {
      setManualStatus('idle')
      setManualDraft('')
    }
  }

  const patientOptions = MOCK_MEDICAL_PATIENTS.map(p => ({
    label: `${p.name} — ${p.chartNo} — ${p.diagnosis}`,
    value: p.id,
  }))

  const hisData = selectedPatient ? getHisSourceData(selectedPatient) : undefined

  const currentExample = useMemo(
    () => (selectedManualExample ? getManualWritingExample(selectedManualExample) : undefined),
    [selectedManualExample],
  )

  return (
    <div className="content-inner">
      <PageHeader funcName="病歷寫作" />

      {/* 類型選擇 */}
      <div className="grid mb-0">
        {WRITING_TYPES.map(t => {
          const isActive = selectedType === t.key
          return (
            <div key={t.key} className="col-12 md:col-4">
              <div
                onClick={() => {
                  setSelectedType(t.key)
                  if (genStatus !== 'generating') {
                    if (hisMode === 'system') { setSystemStatus('idle'); setSystemDraft('') }
                    else { setManualStatus('idle'); setManualDraft('') }
                  }
                }}
                style={{
                  border: isActive ? '2px solid var(--primary_color)' : '1px solid #dee2e6',
                  borderRadius: 10,
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  background: isActive ? 'var(--lightblue)' : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <div className="flex align-items-center gap-3">
                  <i className={t.icon} style={{ fontSize: '1.5rem', color: isActive ? 'var(--primary_color)' : '#999' }} />
                  <div>
                    <div className="font-bold" style={{ color: isActive ? 'var(--primary_color)' : '#333' }}>{t.label}</div>
                    <div className="text-sm text-500">{t.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 控制區 */}
      <Card className="card">
        <div className="flex align-items-center gap-3 flex-wrap">
          <Dropdown
            value={selectedPatient}
            options={patientOptions}
            onChange={e => {
              setSelectedPatient(e.value)
              if (systemStatus !== 'generating') { setSystemStatus('idle'); setSystemDraft('') }
            }}
            placeholder="請選擇病人"
            className="flex-1"
            style={{ minWidth: '280px' }}
            filter
            disabled={hisMode === 'manual'}
          />
          <Dropdown
            value={selectedFormat}
            options={OUTPUT_FORMAT_OPTIONS}
            onChange={e => {
              setSelectedFormat(e.value)
              if (hisMode === 'system') {
                if (systemStatus !== 'generating') { setSystemStatus('idle'); setSystemDraft('') }
              } else {
                if (manualStatus !== 'generating') { setManualStatus('idle'); setManualDraft('') }
              }
            }}
            placeholder="輸出格式"
            style={{ minWidth: '220px' }}
          />
          <Button
            label="AI 生成"
            icon="pi pi-sparkles"
            onClick={handleGenerate}
            disabled={genStatus === 'generating'}
            loading={genStatus === 'generating'}
          />
        </div>
      </Card>

      {/* 狀態列 + 操作按鈕 */}
      <Card className="card">
        <div className="flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="flex align-items-center gap-3">
            <span className="text-sm text-500">生成狀態：</span>
            {genStatus === 'idle' && <Tag value="待生成" severity="warning" />}
            {genStatus === 'generating' && <Tag value="AI 生成中" severity="info" />}
            {genStatus === 'complete' && <Tag value="生成完成" severity="success" />}
            {genStatus === 'generating' && (
              <ProgressBar mode="indeterminate" style={{ height: 6, width: 120 }} />
            )}
            <Tag value={hisMode === 'system' ? '系統擷取' : '手動輸入'} severity="info" style={{ fontSize: '0.7rem' }} />
          </div>
          <div className="flex gap-2">
            <Button label="重新生成" icon="pi pi-refresh" className="p-button-outlined p-button-sm" onClick={handleRegenerate} disabled={genStatus !== 'complete'} />
            <Button label="複製內容" icon="pi pi-copy" className="p-button-outlined p-button-sm" onClick={handleCopy} disabled={genStatus !== 'complete'} />
            <Button label="儲存草稿" icon="pi pi-save" className="p-button-sm" onClick={handleSave} disabled={genStatus !== 'complete'} />
          </div>
        </div>
      </Card>

      {/* 左右對照：HIS 原始資料 ｜ AI 生成草稿 */}
      <div className="grid mt-0">
        {/* 左：HIS 原始資料 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 550 }}>
            <div className="flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-database" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
                <span className="font-bold">HIS 原始資料</span>
                {hisMode === 'system' && hisData && <Tag value="已從院內系統擷取" severity="success" className="ml-1" style={{ fontSize: '0.7rem' }} />}
                {hisMode === 'manual' && currentExample && <Tag value={`範例：${currentExample.label}`} severity="warning" className="ml-1" style={{ fontSize: '0.7rem' }} />}
              </div>
              <div className="his-mode-toggle">
                <style>{`.his-mode-toggle .p-selectbutton .p-button:not(.p-highlight) { background: #ffffff !important; color: #495057 !important; }`}</style>
                <SelectButton
                  value={hisMode}
                  options={[{ label: '系統擷取', value: 'system' }, { label: '手動輸入', value: 'manual' }]}
                  onChange={e => { if (e.value) setHisMode(e.value) }}
                  className="p-buttonset-sm"
                  style={{ fontSize: '0.75rem' }}
                />
              </div>
            </div>
            {hisMode === 'system' ? (
              hisData ? (
                <>
                  <p className="text-xs text-500 mt-0 mb-3">以下為系統自動從 HIS/EMR/LIS 等院內系統擷取之病人資料，作為 AI 生成病歷的輸入來源。</p>
                  {hisData.sections.map((sec, si) => (
                    <Panel key={si} header={
                      <span className="flex align-items-center gap-2">
                        <span className="font-bold">{sec.title}</span>
                        <Tag value={sec.source} severity="info" style={{ fontSize: '0.65rem' }} />
                      </span>
                    } toggleable collapsed={si > 2} className="mb-2">
                      <div className="grid" style={{ fontSize: '0.82rem' }}>
                        {sec.items.map((item, ii) => (
                          <div key={ii} className="col-12 xl:col-6 py-1">
                            <span className="text-500">{item.label}：</span>
                            <span className="font-semibold" style={{ color: item.value.includes('↑') || item.value.includes('↓') ? '#e74c3c' : '#333' }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  ))}
                </>
              ) : (
                <div className="flex flex-column align-items-center justify-content-center text-500" style={{ height: 400 }}>
                  <i className="pi pi-database text-5xl mb-3" style={{ color: '#ccc' }} />
                  <p>請先選擇病人，系統將自動擷取 HIS 資料</p>
                </div>
              )
            ) : (
              <>
                <p className="text-xs text-500 mt-0 mb-2">點選下方範例可自動帶入對應 HIS JSON，按「AI 生成」即可產出病歷草稿。</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {MOCK_MANUAL_WRITING_EXAMPLES.map(ex => (
                    <Button
                      key={ex.id}
                      label={ex.label}
                      icon={selectedManualExample === ex.id ? 'pi pi-check' : 'pi pi-file-edit'}
                      className={`p-button-sm ${selectedManualExample === ex.id ? '' : 'p-button-outlined'}`}
                      tooltip={ex.description}
                      tooltipOptions={{ position: 'top' }}
                      onClick={() => handlePickManualExample(ex.id)}
                      style={{ fontSize: '0.78rem' }}
                    />
                  ))}
                  {selectedManualExample && (
                    <Button
                      label="清除"
                      icon="pi pi-times"
                      className="p-button-sm p-button-text p-button-secondary"
                      onClick={handleClearManual}
                      style={{ fontSize: '0.78rem' }}
                    />
                  )}
                </div>
                <InputTextarea
                  value={manualJson}
                  onChange={e => setManualJson(e.target.value)}
                  rows={18}
                  autoResize
                  className="w-full"
                  placeholder={'點選上方範例，或貼入 JSON 格式的 HIS 資料，例如：\n{\n  "patient": "王建民",\n  "chartNo": "A2025001",\n  "vitals": { "BP": "120/80" },\n  "labs": [ ... ]\n}'}
                  style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}
                />
              </>
            )}
          </Card>
        </div>

        {/* 右：AI 生成草稿 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 550 }}>
            <div className="flex align-items-center justify-content-between mb-2">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-sparkles" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
                <span className="font-bold">{WRITING_TYPES.find(t => t.key === selectedType)?.label} — AI 生成草稿</span>
              </div>
              {genStatus === 'complete' && <Tag value="可編輯" severity="success" />}
              {genStatus === 'generating' && <Tag value="生成中..." severity="info" />}
            </div>
            <InputTextarea
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              rows={28}
              className="w-full"
              style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7 }}
              placeholder={genStatus === 'idle'
                ? (hisMode === 'system'
                  ? '請選擇病人並點擊「AI 生成」，系統將根據左側 HIS 資料自動產生病歷草稿...'
                  : '請於左側點選一筆範例資料，再點擊「AI 生成」，系統將產生對應的病歷草稿...')
                : ''}
              disabled={genStatus === 'generating'}
              autoResize
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MedicalWriting
