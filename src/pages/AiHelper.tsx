import { useState, useRef, useCallback, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { Dialog } from 'primereact/dialog'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import {
  MOCK_AI_TEMPLATES, MOCK_MEDICAL_PATIENTS, getHisSourceData, getAiHelperResult,
  type AiTemplate, type HisSourceData,
} from '@/data/mockData'

const categoryMap: Record<string, { label: string; severity: 'info' | 'success' | 'warning' | 'danger' }> = {
  nursing: { label: '護理', severity: 'info' },
  emergency: { label: '急診', severity: 'danger' },
  physician: { label: '醫師', severity: 'success' },
  custom: { label: '自訂', severity: 'warning' },
}

const AiHelper = () => {
  const { showSuccess, showInfo, showError } = useToast()

  // 控制區 state
  const [scopeFilter, setScopeFilter] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<AiTemplate | null>(null)
  const [chartNo, setChartNo] = useState('')
  const [patient, setPatient] = useState<typeof MOCK_MEDICAL_PATIENTS[0] | null>(null)
  const [hisData, setHisData] = useState<HisSourceData | null>(null)
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([])
  const [additionalInfo, setAdditionalInfo] = useState('')

  // 生成 state
  const [genText, setGenText] = useState('')
  const [genStatus, setGenStatus] = useState<'idle' | 'generating' | 'complete'>('idle')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 回饋 Dialog
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [scores, setScores] = useState({ ui: 0, content: 0, efficiency: 0 })
  const [feedbackComment, setFeedbackComment] = useState('')

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const startStreaming = useCallback((text: string) => {
    stopStreaming()
    setGenText('')
    setGenStatus('generating')
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 3
      if (idx >= text.length) {
        setGenText(text)
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setGenStatus('complete')
      } else {
        setGenText(text.slice(0, idx))
      }
    }, 10)
  }, [stopStreaming])

  useEffect(() => () => stopStreaming(), [stopStreaming])

  const filteredTemplates = scopeFilter === 'all'
    ? MOCK_AI_TEMPLATES.filter(t => t.isActive)
    : MOCK_AI_TEMPLATES.filter(t => t.isActive && t.scope === scopeFilter)

  const handlePatientSearch = () => {
    if (!chartNo.trim()) { showInfo('請輸入病歷號', ''); return }
    const found = MOCK_MEDICAL_PATIENTS.find(p => p.chartNo === chartNo.trim())
    if (found) {
      setPatient(found)
      setHisData(getHisSourceData(found.id) ?? null)
      showSuccess('查詢成功', `已找到病患：${found.name}`)
    } else {
      showError('查無病患', `病歷號 ${chartNo} 查無資料，請確認後重試`)
      setPatient(null)
      setHisData(null)
    }
  }

  const handleTemplateChange = (tpl: AiTemplate) => {
    setSelectedTemplate(tpl)
    const defaults = tpl.attachments.filter(a => a.isDefault).map(a => a.id)
    setSelectedAttachments(defaults)
  }

  const handleGenerate = () => {
    if (!selectedTemplate) { showInfo('請選擇模板', ''); return }
    if (!patient) { showInfo('請先查詢病患', ''); return }
    const result = getAiHelperResult(selectedTemplate.id, patient.id)
    startStreaming(result)
  }

  const handleConfirm = () => {
    setFeedbackVisible(true)
  }

  const handleSubmitFeedback = () => {
    setFeedbackVisible(false)
    setScores({ ui: 0, content: 0, efficiency: 0 })
    setFeedbackComment('')
    showSuccess('感謝回饋', '您的評分已記錄')
  }

  const templateOptionTemplate = (option: AiTemplate) => (
    <div className="flex align-items-center gap-2">
      <Tag value={categoryMap[option.category]?.label} severity={categoryMap[option.category]?.severity} style={{ fontSize: '0.65rem' }} />
      <span>{option.name}</span>
    </div>
  )

  const renderStars = (field: 'ui' | 'content' | 'efficiency') => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(v => (
        <i key={v}
          className={v <= scores[field] ? 'pi pi-star-fill' : 'pi pi-star'}
          style={{ cursor: 'pointer', color: v <= scores[field] ? '#f59e0b' : '#d1d5db', fontSize: '1.2rem' }}
          onClick={() => setScores(prev => ({ ...prev, [field]: v }))}
        />
      ))}
    </div>
  )

  return (
    <div className="content-inner">
      <PageHeader funcName="AI 生成" />

      {/* 控制區 */}
      <Card className="card">
        {/* Row 1: 模板選擇 */}
        <div className="flex align-items-center gap-3 mb-3 flex-wrap">
          <span className="font-bold text-sm white-space-nowrap">模板範圍：</span>
          {[{ label: '全部', value: 'all' }, { label: '全院', value: 'hospital' }, { label: '科別', value: 'department' }, { label: '個人', value: 'personal' }].map(opt => (
            <div key={opt.value} className="flex align-items-center gap-1">
              <RadioButton inputId={opt.value} value={opt.value} checked={scopeFilter === opt.value} onChange={e => setScopeFilter(e.value)} />
              <label htmlFor={opt.value} className="text-sm cursor-pointer">{opt.label}</label>
            </div>
          ))}
        </div>
        <div className="flex align-items-end gap-3 mb-3 flex-wrap">
          <div className="flex-1" style={{ minWidth: 280 }}>
            <label className="block text-sm font-semibold mb-1">選擇模板</label>
            <Dropdown
              value={selectedTemplate}
              options={filteredTemplates}
              onChange={e => handleTemplateChange(e.value)}
              optionLabel="name"
              placeholder="請選擇模板"
              filter filterPlaceholder="搜尋模板"
              itemTemplate={templateOptionTemplate}
              className="w-full"
            />
          </div>
          <div style={{ minWidth: 200 }}>
            <label className="block text-sm font-semibold mb-1">病歷號查詢</label>
            <div className="p-inputgroup">
              <InputText value={chartNo} onChange={e => setChartNo(e.target.value)} placeholder="例: A2025001"
                onKeyDown={e => { if (e.key === 'Enter') handlePatientSearch() }}
              />
              <Button icon="pi pi-search" onClick={handlePatientSearch} />
            </div>
          </div>
        </div>

        {/* 病患摘要 */}
        {patient && (
          <div className="flex align-items-center gap-4 mb-3 p-2" style={{ background: '#f0fdf4', borderRadius: 8, fontSize: '0.85rem' }}>
            <span><i className="pi pi-user mr-1" /><strong>{patient.name}</strong></span>
            <span className="text-500">{patient.chartNo}</span>
            <span>{patient.age}歲 / {patient.gender}</span>
            <span>床號 {patient.bed}</span>
            <Tag value={patient.diagnosis} severity="info" style={{ fontSize: '0.7rem' }} />
          </div>
        )}

        {/* 附件勾選 */}
        {selectedTemplate && selectedTemplate.attachments.length > 0 && (
          <div className="flex align-items-center gap-3 mb-3 flex-wrap">
            <span className="text-sm font-semibold">附件：</span>
            {selectedTemplate.attachments.map(att => (
              <div key={att.id} className="flex align-items-center gap-1">
                <Checkbox inputId={att.id} checked={selectedAttachments.includes(att.id)}
                  onChange={e => setSelectedAttachments(prev => e.checked ? [...prev, att.id] : prev.filter(id => id !== att.id))}
                />
                <label htmlFor={att.id} className="text-sm cursor-pointer">{att.name}</label>
              </div>
            ))}
          </div>
        )}

        {/* 補充說明 + 生成按鈕 */}
        <div className="flex align-items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">補充說明（選填）</label>
            <InputTextarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} rows={2} className="w-full" placeholder="例: 病患昨晚有發燒，今早已退燒" autoResize />
          </div>
          <Button label="開始生成" icon="pi pi-sparkles" onClick={handleGenerate}
            disabled={genStatus === 'generating'} loading={genStatus === 'generating'}
          />
        </div>
      </Card>

      {/* 左右對照 */}
      <div className="grid mt-0">
        {/* 左：HIS 原始資料 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 500 }}>
            <div className="flex align-items-center gap-2 mb-3">
              <i className="pi pi-database" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
              <span className="font-bold">HIS 原始資料</span>
              {hisData && <Tag value="已擷取" severity="success" style={{ fontSize: '0.7rem' }} />}
            </div>
            {hisData ? (
              hisData.sections.map((sec, si) => (
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
              ))
            ) : (
              <div className="flex flex-column align-items-center justify-content-center text-500" style={{ height: 380 }}>
                <i className="pi pi-database text-5xl mb-3" style={{ color: '#ccc' }} />
                <p>請輸入病歷號並查詢，系統將自動擷取 HIS 資料</p>
              </div>
            )}
          </Card>
        </div>

        {/* 右：AI 生成結果 */}
        <div className="col-12 lg:col-6">
          <Card className="card" style={{ minHeight: 500 }}>
            <div className="flex align-items-center justify-content-between mb-2">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-sparkles" style={{ color: 'var(--primary_color)', fontSize: '1.1rem' }} />
                <span className="font-bold">AI 生成結果</span>
                {genStatus === 'generating' && <Tag value="生成中..." severity="info" />}
                {genStatus === 'complete' && <Tag value="生成完成" severity="success" />}
              </div>
              {genStatus === 'generating' && <ProgressBar mode="indeterminate" style={{ height: 5, width: 100 }} />}
            </div>
            {genStatus === 'idle' ? (
              <div className="flex flex-column align-items-center justify-content-center text-500" style={{ height: 380 }}>
                <i className="pi pi-sparkles text-5xl mb-3" style={{ color: '#ccc' }} />
                <p>選擇模板與病患後，點擊「開始生成」</p>
              </div>
            ) : (
              <>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.8, background: '#fafafa', border: '1px solid #eee', borderRadius: 8, padding: '1rem', minHeight: 300, maxHeight: 500, overflowY: 'auto' }}>
                  {genText}
                  {genStatus === 'generating' && <span className="pi pi-spin pi-spinner ml-1" style={{ fontSize: '0.8rem' }} />}
                </div>
                {genStatus === 'complete' && (
                  <div className="flex gap-2 mt-3 justify-content-end">
                    <Button label="複製" icon="pi pi-copy" className="p-button-outlined p-button-sm" onClick={() => { navigator.clipboard.writeText(genText); showSuccess('已複製', '') }} />
                    <Button label="重新生成" icon="pi pi-refresh" className="p-button-outlined p-button-sm" onClick={handleGenerate} />
                    <Button label="確認" icon="pi pi-check" className="p-button-sm" onClick={handleConfirm} />
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </div>

      {/* 回饋 Dialog */}
      <Dialog header="請為這次生成評分" visible={feedbackVisible} onHide={() => setFeedbackVisible(false)} style={{ width: '450px' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="略過" className="p-button-text" onClick={() => { setFeedbackVisible(false); showSuccess('已確認', '生成紀錄已儲存') }} />
            <Button label="提交回饋" icon="pi pi-check" onClick={handleSubmitFeedback} />
          </div>
        }
      >
        <div className="flex flex-column gap-4">
          <div className="flex justify-content-between align-items-center">
            <span className="text-sm font-semibold">UI 直觀易用</span>
            {renderStars('ui')}
          </div>
          <div className="flex justify-content-between align-items-center">
            <span className="text-sm font-semibold">內容符合病情</span>
            {renderStars('content')}
          </div>
          <div className="flex justify-content-between align-items-center">
            <span className="text-sm font-semibold">提升工作效率</span>
            {renderStars('efficiency')}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">意見回饋</label>
            <InputTextarea value={feedbackComment} onChange={e => setFeedbackComment(e.target.value)} rows={3} className="w-full" placeholder="請輸入您的意見或建議..." />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default AiHelper
