import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RadioButton } from 'primereact/radiobutton'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Tag } from 'primereact/tag'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { TwciForm, defaultTwciValues, exampleTwciValues } from '@/components/Twci/type/twciform'
import HospInfo from '@/components/Twci/hospInfo/HospInfo'
import PatientInfo from '@/components/Twci/patientinfo/PatientInfo'
import DoctorInfo from '@/components/Twci/doctorInfo/DoctorInfo'
import DiagnosisInfo from '@/components/Twci/diagnosisInfo/DiagnosisInfo'
import CiInfo from '@/components/Twci/ciInfo/CiInfo'
import CancerStageInfo from '@/components/Twci/cancerStageInfo/CancerStageInfo'
import IllnessInfo from '@/components/Twci/illnessInfo/IllnessInfo'
import {
  MOCK_TWCI_SAVED_RECORDS,
  MOCK_TWCI_FHIR_BUNDLE,
  MOCK_TWCI_BATCH_CASES,
  generateTwciMockWorkflowRun,
} from '@/data/mockData'
import type { TwciSavedRecord, TwciBatchCase, TwciBatchFile } from '@/data/mockData'
import TwpasWorkflowDialog from '@/components/TwpasWorkflow/TwpasWorkflowDialog'
import type { WorkflowRun } from '@/components/TwpasWorkflow/twpas-workflow.types'

/* ------------------------------------------------------------------ */
/*  Tab labels & required tabs                                        */
/* ------------------------------------------------------------------ */
const tabLabels: Record<string, string> = {
  hosp: '院所資訊(hosp)',
  patient: '病人資訊(patient)',
  doctor: '醫師資訊(doctor)',
  diagnosis: '疾病資訊(diagnosis)',
  condition: '重大傷病(condition)',
  cancerStage: '癌症期別(cancerStage)',
  illness: '惡性腫瘤重大傷病換發評估表(illness)',
}
const requiredTabs = new Set(['hosp', 'patient', 'diagnosis', 'condition'])

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */
const FhirTwci = () => {
  const { showSuccess, showError, showInfo } = useToast()

  const methods = useForm<TwciForm>({
    defaultValues: defaultTwciValues as TwciForm,
    mode: 'onBlur',
  })

  const [activeTab, setActiveTab] = useState(0)

  // FHIR Dialog
  const [fhirDialogVisible, setFhirDialogVisible] = useState(false)

  // Old case Dialog
  const [oldCaseDialogVisible, setOldCaseDialogVisible] = useState(false)
  const [selectedSavedRecord, setSelectedSavedRecord] = useState<TwciSavedRecord | null>(null)

  // Download Dialog
  const [downloadDialogVisible, setDownloadDialogVisible] = useState(false)

  // Workflow tracking
  const [workflowDialogVisible, setWorkflowDialogVisible] = useState(false)
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([])

  // Batch download
  const [batchDialogVisible, setBatchDialogVisible] = useState(false)
  const [batchSelectedCases, setBatchSelectedCases] = useState<TwciBatchCase[]>([])
  const [batchExpandedRows, setBatchExpandedRows] = useState<any>(null)

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
  const handleLoadExample = () => {
    methods.reset(exampleTwciValues as TwciForm)
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
        methods.reset(defaultTwciValues as TwciForm)
        setActiveTab(0)
        showSuccess('已新建', '表單已重置為預設值')
      },
    })
  }

  const handleSave = () => {
    showSuccess('已暫存', '表單資料已暫存成功')
  }

  const onValid = () => {
    const run = generateTwciMockWorkflowRun()
    setWorkflowRuns(prev => [run, ...prev])
    setFhirDialogVisible(true)
    const verifySteps = run.steps.slice(0, -1)
    const allVerifyPass = verifySteps.every(s => s.status === 'success')
    const failedStep = run.steps.find(s => s.status === 'failed')
    if (allVerifyPass) {
      showInfo('驗證完成', '所有驗證皆通過，可至案件流程追蹤進行正式上傳')
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
    navigator.clipboard.writeText(JSON.stringify(MOCK_TWCI_FHIR_BUNDLE, null, 2))
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

  /* ---------- batch download ---------- */
  const handleBatchDownload = () => {
    if (batchSelectedCases.length === 0) {
      showError('請選擇案件', '請至少勾選一筆案件')
      return
    }
    const hospId = batchSelectedCases[0].hospId
    const today = new Date()
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`
    const zipName = `${hospId}_${dateStr}_001.zip`
    const totalFiles = batchSelectedCases.reduce((sum, c) => sum + c.files.length, 0)
    showSuccess(
      '批次打包完成（Demo）',
      `已選取 ${batchSelectedCases.length} 筆案件，共 ${totalFiles} 個檔案，打包為 ${zipName}（實際下載需連線後端）`,
    )
    setBatchDialogVisible(false)
    setBatchSelectedCases([])
  }

  const batchFileExpansionTemplate = (rowData: TwciBatchCase) => (
    <div className="p-3" style={{ background: '#f8f9fa' }}>
      <h5 className="mt-0 mb-2">檔案清單（{rowData.files.length} 個檔案）</h5>
      <DataTable value={rowData.files} size="small">
        <Column
          header="類別"
          body={(f: TwciBatchFile) => {
            const colors: Record<string, 'info' | 'success' | 'warning' | 'danger'> = { XML: 'info', ATT: 'success', DCF: 'warning', EMR: 'danger' }
            return <Tag value={f.type} severity={colors[f.type] ?? 'info'} />
          }}
          style={{ width: '80px' }}
        />
        <Column field="fileName" header="檔案名稱" />
        <Column field="size" header="大小" style={{ width: '100px' }} />
      </DataTable>
    </div>
  )

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="重大傷病TWCI IG" />

      <FormProvider {...methods}>
        <Card className="card mt-3">
          <h3 className="mt-0 mb-3">TWCI IG版本 1.0.0</h3>
          <form onSubmit={(e) => e.preventDefault()}>
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
              <TabPanel header={renderTabHeader('doctor')}>
                <DoctorInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('diagnosis')}>
                <DiagnosisInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('condition')}>
                <CiInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('cancerStage')}>
                <CancerStageInfo methods={methods} />
              </TabPanel>
              <TabPanel header={renderTabHeader('illness')}>
                <IllnessInfo methods={methods} />
              </TabPanel>
            </TabView>

            {/* Toolbar */}
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
              <Button type="button" label="TWCI 下載批次打包檔" icon="pi pi-box" severity="warning" onClick={() => setBatchDialogVisible(true)} />
            </div>

            {/* Demo buttons */}
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

      {/* Old case Dialog */}
      <Dialog
        header="TWCI IG 暫存清單"
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
          value={MOCK_TWCI_SAVED_RECORDS}
          selectionMode="single"
          selection={selectedSavedRecord}
          onSelectionChange={(e) => setSelectedSavedRecord(e.value as TwciSavedRecord)}
          dataKey="id"
        >
          <Column header="" body={(rowData: TwciSavedRecord) => (<RadioButton checked={selectedSavedRecord?.id === rowData.id} onChange={() => setSelectedSavedRecord(rowData)} />)} style={{ width: '3rem' }} />
          <Column field="createdAt" header="建立時間" sortable />
          <Column header="病人姓名" body={(row: TwciSavedRecord) => row.data.patient.name} />
          <Column header="身分證字號" body={(row: TwciSavedRecord) => row.data.patient.idCard} />
          <Column header="院所代碼" body={(row: TwciSavedRecord) => row.data.hosp.hospId} />
          <Column header="申請日期" body={(row: TwciSavedRecord) => row.data.hosp.applDate} />
        </DataTable>
      </Dialog>

      {/* Download Dialog */}
      <Dialog header="下載檔案" visible={downloadDialogVisible} onHide={() => setDownloadDialogVisible(false)} style={{ width: '400px' }}>
        <div className="flex flex-column gap-2">
          <Button label="純下載FHIR格式" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
          <Button label="下載PDF附件" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
          <Button label="下載DICOM" icon="pi pi-download" className="p-button-outlined" onClick={() => { showInfo('提示', '下載功能需連線後端'); setDownloadDialogVisible(false) }} />
        </div>
      </Dialog>

      {/* FHIR Dialog */}
      <Dialog
        header="FHIR格式 (TWCI IG版本 1.0.0)"
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
          {JSON.stringify(MOCK_TWCI_FHIR_BUNDLE, null, 2)}
        </pre>
      </Dialog>

      {/* Batch download Dialog */}
      <Dialog
        header="TWCI 下載批次打包檔"
        visible={batchDialogVisible}
        onHide={() => { setBatchDialogVisible(false); setBatchSelectedCases([]) }}
        style={{ width: '1050px' }}
        maximizable
        footer={
          <div className="flex justify-content-between align-items-center">
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              已勾選 {batchSelectedCases.length} 筆案件，共 {batchSelectedCases.reduce((s, c) => s + c.files.length, 0)} 個檔案
            </span>
            <div className="flex gap-2">
              <Button label="打包下載 ZIP" icon="pi pi-download" disabled={batchSelectedCases.length === 0} onClick={handleBatchDownload} />
              <Button label="取消" icon="pi pi-times" className="p-button-secondary" onClick={() => { setBatchDialogVisible(false); setBatchSelectedCases([]) }} />
            </div>
          </div>
        }
      >
        {/* Naming rules */}
        <div className="mb-3 p-3" style={{ background: '#fff8e1', borderRadius: 8, fontSize: '0.82rem', lineHeight: 1.8 }}>
          <div className="flex gap-5">
            <div>
              <b>【命名規則】</b><br />
              ZIP 檔名：(醫事機構代碼)_(系統日期)_(序號).zip<br />
              批次檔案：檔案類別(3碼) + 醫事機構代碼(10碼) + _ + 案件編號(16碼).副檔名<br />
              檔案類別：XML、ATT、DCF、EMR
            </div>
            <div>
              <b>【範例】</b><br />
              ZIP：0131060029_20260326_001.zip<br />
              XML：XML0131060029_2025102200000001.XML<br />
              ATT：ATT0131060029_2025102200000001.CAB
            </div>
          </div>
        </div>

        {/* Cases table */}
        <DataTable
          value={MOCK_TWCI_BATCH_CASES.filter(c => c.verifyStatus === 'passed')}
          selectionMode="checkbox"
          selection={batchSelectedCases}
          onSelectionChange={(e) => setBatchSelectedCases(e.value as unknown as TwciBatchCase[])}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          size="small"
          stripedRows
          expandedRows={batchExpandedRows}
          onRowToggle={(e) => setBatchExpandedRows(e.data)}
          rowExpansionTemplate={batchFileExpansionTemplate}
          emptyMessage="無已通過驗證之案件"
          tableStyle={{ minWidth: '50rem' }}
          header={
            <div className="flex justify-content-between align-items-center">
              <span className="font-bold">已通過 FHIR 驗證之案件</span>
              <div className="flex gap-2">
                <Button
                  label="全選"
                  icon="pi pi-check-square"
                  className="p-button-sm p-button-outlined"
                  onClick={() => setBatchSelectedCases(MOCK_TWCI_BATCH_CASES.filter(c => c.verifyStatus === 'passed'))}
                />
                <Button
                  label="取消全選"
                  icon="pi pi-stop"
                  className="p-button-sm p-button-outlined p-button-secondary"
                  onClick={() => setBatchSelectedCases([])}
                />
              </div>
            </div>
          }
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column expander style={{ width: '3rem' }} />
          <Column field="acptNo" header="受理編號" sortable style={{ minWidth: '120px' }} />
          <Column field="patientName" header="病人姓名" sortable />
          <Column field="idCard" header="身分證字號" style={{ minWidth: '120px' }} />
          <Column field="icd10cmCode" header="ICD-10" sortable style={{ width: '80px' }} />
          <Column field="icd10cmDisplay" header="診斷名稱" />
          <Column field="applDate" header="申請日期" sortable style={{ width: '110px' }} />
          <Column
            header="檔案數"
            body={(row: TwciBatchCase) => (
              <Tag value={`${row.files.length} 檔`} severity="info" />
            )}
            style={{ width: '70px' }}
          />
          <Column field="verifiedAt" header="驗證時間" sortable style={{ minWidth: '150px' }} />
        </DataTable>
      </Dialog>

      {/* Workflow tracking Dialog */}
      <TwpasWorkflowDialog
        visible={workflowDialogVisible}
        onHide={() => setWorkflowDialogVisible(false)}
        runs={workflowRuns}
        onUpload={(runId) => {
          const now = new Date()
          const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
          setWorkflowRuns(prev => prev.map(run =>
            run.id === runId
              ? {
                  ...run,
                  steps: run.steps.map((s, i) =>
                    i === run.steps.length - 1
                      ? { ...s, status: 'success' as const, timestamp: ts }
                      : s
                  ),
                }
              : run
          ))
          showSuccess('上傳成功', '案件已正式上傳至健保署')
        }}
      />
    </div>
  )
}

export default FhirTwci
