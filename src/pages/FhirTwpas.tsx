import { useState, useRef, useEffect, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RadioButton } from 'primereact/radiobutton'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { TwpasForm, defaultTwpasValues, exampleTwpasValues } from '@/components/Twpas/type/twpasform'
import HospInfo from '@/components/Twpas/hospinfo/HospInfo'
import PatientInfo from '@/components/Twpas/patientinfo/PatientInfo'
import OpdInfo from '@/components/Twpas/opdInfo/OpdInfo'
import MedicalInfo from '@/components/Twpas/medicalInfo/MedicalInfo'
import EvaluateForm from '@/components/Twpas/assessmentinfo/EvaluateForm'
import TreatmentForm from '@/components/Twpas/treatmentinfo/TreatmentForm'
import GeneticTestSection from '@/components/Twpas/geneinfo/GeneticTestSection'
import ResultForm from '@/components/Twpas/resultInfo/ResultForm'
import ApplyInfo from '@/components/Twpas/applyInfo/ApplyInfo'
import {
  MOCK_FHIR_BUNDLE_SNIPPET,
  MOCK_TWPAS_SAVED_RECORDS,
  TWPAS_AI_FIELD_PROMPTS,
  generateTwpasAiResponse,
  generateMockWorkflowRun,
} from '@/data/mockData'
import type { TwpasSavedRecord } from '@/data/mockData'
import TwpasWorkflowDialog from '@/components/TwpasWorkflow/TwpasWorkflowDialog'
import type { WorkflowRun } from '@/components/TwpasWorkflow/twpas-workflow.types'

/* ------------------------------------------------------------------ */
/*  Tab labels & required tabs                                        */
/* ------------------------------------------------------------------ */
const tabLabels: Record<string, string> = {
  hosp: '院所資訊(hosp)',
  patient: '病人資訊(patient)',
  opd: '門診病例(opd)',
  diagnosis: '疾病資訊(diagnosis)',
  evaluate: '評估資訊(evaluate)',
  treat: '治療資訊(treat)',
  gene: '基因資訊(gene)',
  result: '結果資訊(result)',
  apply: '申請項目(apply)',
}
const requiredTabs = new Set(['hosp', 'patient', 'diagnosis', 'apply'])

const AI_FIELD_LABELS: Record<string, string> = {
  imgItem: '影像報告項目',
  inspect: '檢驗(查)名稱',
  reportType: '報告類型',
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */
const FhirTwpas = () => {
  const { showSuccess, showError, showInfo } = useToast()

  const methods = useForm<TwpasForm>({
    defaultValues: defaultTwpasValues as TwpasForm,
    mode: 'onBlur',
  })

  const [activeTab, setActiveTab] = useState(0)

  // AI Sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [aiTab, setAiTab] = useState(2)
  const [aiText, setAiText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [aiFieldContext, setAiFieldContext] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const aiResponseRef = useRef<string>('')

  // FHIR Dialog
  const [fhirDialogVisible, setFhirDialogVisible] = useState(false)

  // 查詢舊案清單 Dialog
  const [oldCaseDialogVisible, setOldCaseDialogVisible] = useState(false)
  const [selectedSavedRecord, setSelectedSavedRecord] = useState<TwpasSavedRecord | null>(null)

  // 下載檔案 Dialog
  const [downloadDialogVisible, setDownloadDialogVisible] = useState(false)

  // 案件流程追蹤
  const [workflowDialogVisible, setWorkflowDialogVisible] = useState(false)
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([])


  /* ---------- streaming helpers ---------- */
  const stopStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const startStreaming = useCallback((responseText?: string) => {
    stopStreaming()
    const fullText = responseText ?? aiResponseRef.current
    aiResponseRef.current = fullText
    setAiText('')
    setIsStreaming(true)
    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 2
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

  useEffect(() => {
    return () => stopStreaming()
  }, [stopStreaming])

  /* ---------- error helpers ---------- */
  const hasError = (key: string) => {
    const obj = (methods.formState.errors as Record<string, unknown>)[key]
    return !!obj
  }

  const renderTabHeader = (key: string) => {
    const isRequired = requiredTabs.has(key)
    return (
      <span>
        {isRequired && <i className="pi pi-star-fill mr-2" />}
        {tabLabels[key]}
        {hasError(key) && <i className="pi pi-exclamation-circle text-red-500 ml-2" />}
      </span>
    )
  }

  /* ---------- handlers ---------- */
  const openAiSidebar = useCallback((fieldKey: string) => {
    setAiFieldContext(fieldKey)
    setSidebarVisible(true)
    setAiTab(2)
    const currentData = methods.getValues()
    const response = generateTwpasAiResponse(fieldKey, currentData)
    startStreaming(response)
  }, [startStreaming, methods])

  const handleLoadExample = () => {
    methods.reset(exampleTwpasValues as TwpasForm)
    showSuccess('已帶入範例', '表單已帶入範例資料')
  }

  const handleReset = () => {
    confirmDialog({
      message: '確定要清空目前表單並新建一筆嗎？',
      header: '新建確認',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確定',
      rejectLabel: '取消',
      accept: () => {
        methods.reset(defaultTwpasValues as TwpasForm)
        setActiveTab(0)
        showSuccess('已新建', '表單已重置為預設值')
      },
    })
  }

  const handleSave = () => {
    showSuccess('已暫存', '表單資料已暫存成功')
  }

  const onValid = () => {
    const run = generateMockWorkflowRun()
    setWorkflowRuns(prev => [run, ...prev])
    setFhirDialogVisible(true)
    const allPass = run.steps.every(s => s.status === 'success')
    const failedStep = run.steps.find(s => s.status === 'failed')
    if (allPass) {
      showSuccess('驗證完成', '所有流程驗證皆通過')
    } else if (failedStep) {
      showError('驗證失敗', `${failedStep.label}：${failedStep.errorCount} 個錯誤`)
    }
  }

  const onInvalid = () => {
    showError('表單驗證失敗', '請檢查各頁籤中標示錯誤的欄位')
  }

  const handleFhir = () => {
    methods.handleSubmit(onValid, onInvalid)()
  }

  const copyFhir = () => {
    navigator.clipboard.writeText(JSON.stringify(MOCK_FHIR_BUNDLE_SNIPPET, null, 2))
    showSuccess('已複製', 'FHIR Bundle JSON 已複製到剪貼簿')
  }

  const handleLoadOldCase = () => {
    if (!selectedSavedRecord) return
    confirmDialog({
      message: `確定要帶入「${selectedSavedRecord.data.patient.name}」的暫存資料嗎？目前表單內容將被覆蓋。`,
      header: '帶入確認',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確定',
      rejectLabel: '取消',
      accept: () => {
        methods.reset(selectedSavedRecord.data)
        setOldCaseDialogVisible(false)
        setSelectedSavedRecord(null)
        showSuccess('已帶入', `已帶入「${selectedSavedRecord.data.patient.name}」的暫存資料`)
      },
    })
  }

  // AI sidebar data
  const aiQueryData = JSON.stringify(methods.getValues(), null, 2)
  const currentPrompt = aiFieldContext ? TWPAS_AI_FIELD_PROMPTS[aiFieldContext] ?? '' : ''
  const sidebarTitle = aiFieldContext
    ? `AI 小幫手 — ${AI_FIELD_LABELS[aiFieldContext] ?? aiFieldContext}`
    : 'AI 小幫手'

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="癌藥事審TWPAS IG" />

      {/* 主要內容 */}
      <FormProvider {...methods}>
        <Card className="card mt-3">
          <h3 className="mt-0 mb-3">TWPAS IG版本 1.1.0</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* TabView (9 Tabs) */}
            <TabView
              scrollable
              renderActiveOnly={false}
              activeIndex={activeTab}
              onTabChange={(e) => setActiveTab(e.index)}
            >
              <TabPanel header={renderTabHeader('hosp')}>
                <HospInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('patient')}>
                <PatientInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('opd')}>
                <OpdInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('diagnosis')}>
                <MedicalInfo methods={methods} onAiHelper={openAiSidebar} />
              </TabPanel>
              <TabPanel header={renderTabHeader('evaluate')}>
                <EvaluateForm methods={methods} onAiHelper={openAiSidebar} />
              </TabPanel>
              <TabPanel header={renderTabHeader('treat')}>
                <TreatmentForm methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('gene')}>
                <GeneticTestSection methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('result')}>
                <ResultForm methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('apply')}>
                <ApplyInfo methods={methods} />
              </TabPanel>
            </TabView>

            {/* Toolbar 按鈕 (TabView 下方) */}
            <div className="justify-content-center flex flex-wrap gap-1 mt-3">
              <Button type="button" label="案件流程追蹤" icon="pi pi-sitemap" onClick={() => setWorkflowDialogVisible(true)} />
              <Button type="button" label="查詢舊案清單" icon="pi pi-search" onClick={() => setOldCaseDialogVisible(true)} />
              <Button type="button" label="帶入院方資料" icon="pi pi-search" onClick={() => showInfo('提示', '帶入院方資料需連線院方系統')} />
              <Button type="button" label="新建一筆" icon="pi pi-plus" onClick={handleReset} />
              <Button type="button" label="暫存" icon="pi pi-save" severity="success" onClick={handleSave} />
              <Button type="submit" label="產生FHIR格式且驗證" icon="pi pi-upload" onClick={handleFhir} />
              <Button type="button" label="下載檔案" icon="pi pi-download" onClick={() => setDownloadDialogVisible(true)} />
              <Button type="button" label="上傳 Excel" icon="pi pi-file-arrow-up" onClick={() => showInfo('提示', '上傳 Excel 需連線後端')} />
              <Button type="button" label="上傳 FHIRJson" icon="pi pi-file-arrow-up" onClick={() => showInfo('提示', '上傳 FHIRJson 需連線後端')} />
              <Button type="button" label="上傳院方 Json" icon="pi pi-file-arrow-up" onClick={() => showInfo('提示', '上傳院方 Json 需連線後端')} />
            </div>

            {/* Demo 專屬按鈕 */}
            <div className="justify-content-center flex flex-wrap gap-1 mt-2">
              <Button
                type="button"
                label="帶入範例資料"
                icon="pi pi-file-import"
                className="p-button-outlined"
                onClick={handleLoadExample}
              />
            </div>
          </form>
        </Card>
      </FormProvider>

      {/* 查詢舊案清單 Dialog */}
      <Dialog
        header="TWPAS IG 暫存清單"
        visible={oldCaseDialogVisible}
        onHide={() => {
          setOldCaseDialogVisible(false)
          setSelectedSavedRecord(null)
        }}
        style={{ width: '800px' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="帶入資料" icon="pi pi-check" disabled={!selectedSavedRecord} onClick={handleLoadOldCase} />
            <Button label="取消" icon="pi pi-times" className="p-button-secondary" onClick={() => { setOldCaseDialogVisible(false); setSelectedSavedRecord(null) }} />
          </div>
        }
      >
        <DataTable
          value={MOCK_TWPAS_SAVED_RECORDS}
          selectionMode="single"
          selection={selectedSavedRecord}
          onSelectionChange={(e) => setSelectedSavedRecord(e.value as TwpasSavedRecord)}
          dataKey="id"
        >
          <Column header="" body={(rowData: TwpasSavedRecord) => (<RadioButton checked={selectedSavedRecord?.id === rowData.id} onChange={() => setSelectedSavedRecord(rowData)} />)} style={{ width: '3rem' }} />
          <Column field="createdAt" header="建立時間" sortable />
          <Column header="病人姓名" body={(row: TwpasSavedRecord) => row.data.patient.name} />
          <Column header="身分證字號" body={(row: TwpasSavedRecord) => row.data.patient.idCard} />
          <Column header="院所代碼" body={(row: TwpasSavedRecord) => row.data.hosp.hospId} />
          <Column header="診斷日期" body={(row: TwpasSavedRecord) => row.data.diagnosis.diagDate} />
        </DataTable>
      </Dialog>

      {/* 下載檔案 Dialog */}
      <Dialog header="下載檔案" visible={downloadDialogVisible} onHide={() => setDownloadDialogVisible(false)} style={{ width: '400px' }}>
        <div className="flex flex-column gap-2">
          <Button label="純下載FHIR格式" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
          <Button label="下載PDF附件" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
          <Button label="下載DICOM" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
        </div>
      </Dialog>

      {/* AI 側邊欄 */}
      <Sidebar
        visible={sidebarVisible}
        position="right"
        onHide={() => {
          setSidebarVisible(false)
          stopStreaming()
        }}
        style={{ width: '700px' }}
        header={<span className="font-bold text-lg"><i className="fa-solid fa-robot mr-2" />{sidebarTitle}</span>}
      >
        <TabView activeIndex={aiTab} onTabChange={(e) => setAiTab(e.index)}>
          <TabPanel header="Data" leftIcon="pi pi-database mr-2">
            <pre
              style={{
                fontSize: 12,
                maxHeight: '70vh',
                overflow: 'auto',
                background: '#f8f9fa',
                padding: 12,
                borderRadius: 6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {aiQueryData}
            </pre>
          </TabPanel>
          <TabPanel header="Prompt" leftIcon="pi pi-code mr-2">
            <pre
              style={{
                fontSize: 13,
                maxHeight: '70vh',
                overflow: 'auto',
                background: '#f8f9fa',
                padding: 12,
                borderRadius: 6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {currentPrompt}
            </pre>
          </TabPanel>
          <TabPanel header="AI 建議回覆" leftIcon="pi pi-sparkles mr-2">
            <div
              style={{
                maxHeight: '70vh',
                overflow: 'auto',
                padding: '0 4px',
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              <div className="markdown-preview">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiText}</ReactMarkdown>
                {isStreaming && <span className="typing-cursor">▍</span>}
              </div>
              {!isStreaming && aiText.length > 0 && (
                <div className="mt-3 pt-2 border-top-1 surface-border">
                  <Button
                    label="重新生成"
                    icon="pi pi-refresh"
                    className="p-button-sm p-button-outlined"
                    onClick={() => startStreaming()}
                  />
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>
      </Sidebar>

      {/* FHIR Dialog */}
      <Dialog
        header="FHIR格式 (TWPAS IG版本 1.1.0)"
        visible={fhirDialogVisible}
        onHide={() => setFhirDialogVisible(false)}
        style={{ width: '700px' }}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="複製FHIR格式" icon="pi pi-copy" className="p-button-outlined" onClick={copyFhir} />
            <Button label="關閉" icon="pi pi-times" className="p-button-secondary" onClick={() => setFhirDialogVisible(false)} />
          </div>
        }
      >
        <pre
          style={{
            fontSize: 12,
            maxHeight: '60vh',
            overflow: 'auto',
            background: '#f8f9fa',
            padding: 12,
            borderRadius: 6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {JSON.stringify(MOCK_FHIR_BUNDLE_SNIPPET, null, 2)}
        </pre>
      </Dialog>

      {/* 案件流程追蹤 / 查詢驗證結果 Dialog */}
      <TwpasWorkflowDialog
        visible={workflowDialogVisible}
        onHide={() => setWorkflowDialogVisible(false)}
        runs={workflowRuns}
      />
    </div>
  )
}

export default FhirTwpas
