import { useState, useRef, useCallback, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { Panel } from 'primereact/panel'
import { MOCK_MEDICAL_PATIENTS, getNursingWritingDraft, getNursingHisSourceData, NURSING_FORMAT_OPTIONS } from '@/data/mockData'

const NURSING_WRITING_TYPES = [
  { key: 'admission-nursing', label: '入院護理紀錄', subtitle: 'Admission Nursing Assessment', icon: 'pi pi-sign-in' },
  { key: 'narrative-nursing', label: '敘述性護理紀錄', subtitle: 'Narrative Nursing Note', icon: 'pi pi-pencil' },
  { key: 'shift-handoff', label: '交班護理紀錄', subtitle: 'Shift Handoff Report', icon: 'pi pi-arrow-right-arrow-left' },
  { key: 'inter-unit-transfer', label: '單位間交班紀錄', subtitle: 'Inter-unit Transfer Report', icon: 'pi pi-building' },
  { key: 'discharge-nursing', label: '出院護理摘要', subtitle: 'Discharge Nursing Summary', icon: 'pi pi-sign-out' },
]

const NursingWriting = () => {
  const { showSuccess, showInfo } = useToast()

  const [selectedType, setSelectedType] = useState('admission-nursing')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState('isbar')
  const [draftText, setDraftText] = useState('')
  const [genStatus, setGenStatus] = useState<'idle' | 'generating' | 'complete'>('idle')

  // streaming
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fullTextRef = useRef('')

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const startStreaming = useCallback((text: string) => {
    stopStreaming()
    fullTextRef.current = text
    setDraftText('')
    setGenStatus('generating')
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 3
      if (idx >= text.length) {
        setDraftText(text)
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setGenStatus('complete')
      } else {
        setDraftText(text.slice(0, idx))
      }
    }, 10)
  }, [stopStreaming])

  useEffect(() => () => stopStreaming(), [stopStreaming])

  const handleGenerate = () => {
    if (!selectedPatient) {
      showInfo('請選擇病人', '請先選擇一位病人再進行 AI 生成')
      return
    }
    const content = getNursingWritingDraft(selectedType, selectedPatient, selectedFormat)
    startStreaming(content)
  }

  const handleRegenerate = () => {
    if (!selectedPatient) return
    const content = getNursingWritingDraft(selectedType, selectedPatient, selectedFormat)
    startStreaming(content)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText)
    showSuccess('已複製', '護理紀錄草稿已複製到剪貼簿')
  }

  const handleSave = () => {
    showSuccess('已儲存', '草稿已暫存成功')
  }

  const patientOptions = MOCK_MEDICAL_PATIENTS.map(p => ({
    label: `${p.name} — ${p.chartNo} — ${p.diagnosis}`,
    value: p.id,
  }))

  const hisData = selectedPatient ? getNursingHisSourceData(selectedPatient) : undefined

  return (
    <div className="content-inner">
      <PageHeader funcName="護理紀錄寫作" />

      {/* 類型選擇 — 5 張卡片 */}
      <div className="grid mb-0">
        {NURSING_WRITING_TYPES.map(t => {
          const isActive = selectedType === t.key
          return (
            <div key={t.key} className="col-12 sm:col-6 xl:col">
              <div
                onClick={() => { setSelectedType(t.key); if (genStatus !== 'generating') { setGenStatus('idle'); setDraftText('') } }}
                style={{
                  border: isActive ? '2px solid var(--primary_color)' : '1px solid #dee2e6',
                  borderRadius: 10,
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  background: isActive ? 'var(--lightblue)' : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <div className="flex align-items-center gap-2">
                  <i className={t.icon} style={{ fontSize: '1.25rem', color: isActive ? 'var(--primary_color)' : '#999' }} />
                  <div>
                    <div className="font-bold" style={{ fontSize: '0.9rem', color: isActive ? 'var(--primary_color)' : '#333' }}>{t.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#999' }}>{t.subtitle}</div>
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
            onChange={e => { setSelectedPatient(e.value); if (genStatus !== 'generating') { setGenStatus('idle'); setDraftText('') } }}
            placeholder="請選擇病人"
            className="flex-1"
            style={{ minWidth: '280px' }}
            filter
          />
          <Dropdown
            value={selectedFormat}
            options={NURSING_FORMAT_OPTIONS}
            onChange={e => { setSelectedFormat(e.value); if (genStatus !== 'generating') { setGenStatus('idle'); setDraftText('') } }}
            placeholder="輸出格式"
            style={{ minWidth: '280px' }}
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
          </div>
          <div className="flex gap-2">
            <Button label="重新生成" icon="pi pi-refresh" className="p-button-outlined p-button-sm" onClick={handleRegenerate} disabled={genStatus !== 'complete'} />
            <Button label="複製內容" icon="pi pi-copy" className="p-button-outlined p-button-sm" onClick={handleCopy} disabled={genStatus !== 'complete'} />
            <Button label="儲存草稿" icon="pi pi-save" className="p-button-sm" onClick={handleSave} disabled={genStatus !== 'complete'} />
          </div>
        </div>
      </Card>

      {/* 左右對照：NIS 原始資料 ｜ AI 生成草稿 */}
      <div className="grid mt-0">
        {/* 左：NIS 原始資料 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 550 }}>
            <div className="flex align-items-center gap-2 mb-3">
              <i className="pi pi-database" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
              <span className="font-bold">NIS / HIS 原始資料</span>
              {hisData && <Tag value="已從院內系統擷取" severity="success" className="ml-1" style={{ fontSize: '0.7rem' }} />}
            </div>
            {hisData ? (
              <>
                <p className="text-xs text-500 mt-0 mb-3">以下為系統自動從 NIS/HIS/藥囑等院內系統擷取之護理相關資料，作為 AI 生成護理紀錄的輸入來源。</p>
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
                <p>請先選擇病人，系統將自動擷取護理相關資料</p>
              </div>
            )}
          </Card>
        </div>

        {/* 右：AI 生成草稿 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 550 }}>
            <div className="flex align-items-center justify-content-between mb-2">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-sparkles" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
                <span className="font-bold">{NURSING_WRITING_TYPES.find(t => t.key === selectedType)?.label} — AI 生成草稿</span>
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
              placeholder={genStatus === 'idle' ? '請選擇病人並點擊「AI 生成」，系統將根據左側護理資料自動產生護理紀錄草稿...' : ''}
              disabled={genStatus === 'generating'}
              autoResize
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NursingWriting
