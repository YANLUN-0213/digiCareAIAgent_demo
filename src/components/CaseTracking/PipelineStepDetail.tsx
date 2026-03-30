import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import type { WorkflowStep } from '@/components/TwpasWorkflow/twpas-workflow.types'
import type { VerificationResultItem } from '@/components/TwpasWorkflow/twpas-workflow.types'

interface Props {
  step: WorkflowStep
}

const severityTag = (item: VerificationResultItem) => {
  const map: Record<string, 'danger' | 'warning' | 'info'> = {
    error: 'danger',
    warning: 'warning',
    information: 'info',
  }
  return <Tag value={item.severity} severity={map[item.severity] ?? 'info'} />
}

const PipelineStepDetail = ({ step }: Props) => {
  if (step.status === 'skipped') {
    return (
      <div className="flex align-items-center gap-2 p-3" style={{ color: '#9ca3af' }}>
        <i className="pi pi-minus-circle" />
        <span>無適用 CQL 規則，此步驟已跳過</span>
      </div>
    )
  }

  if (step.status === 'pending') {
    return (
      <div className="flex align-items-center gap-2 p-3" style={{ color: '#9ca3af' }}>
        <i className="pi pi-clock" />
        <span>此步驟尚未執行</span>
      </div>
    )
  }

  if (step.status === 'in_progress') {
    return (
      <div className="flex align-items-center gap-2 p-3" style={{ color: '#3b82f6' }}>
        <i className="pi pi-spin pi-spinner" />
        <span>驗證執行中...</span>
      </div>
    )
  }

  const items = step.items ?? []

  return (
    <div className="ct-step-detail">
      <div className="flex gap-3 mb-3 text-sm">
        <span>資源數：<strong>{step.totalResources}</strong></span>
        <span style={{ color: '#ef4444' }}>錯誤：<strong>{step.errorCount}</strong></span>
        <span style={{ color: '#f59e0b' }}>警告：<strong>{step.warningCount}</strong></span>
      </div>
      {items.length > 0 ? (
        <DataTable value={items} size="small" stripedRows scrollable scrollHeight="250px">
          <Column header="嚴重度" body={severityTag} style={{ width: '90px' }} />
          <Column field="resourceType" header="資源類型" style={{ width: '140px' }} />
          <Column field="code" header="代碼" style={{ width: '130px' }} />
          <Column field="message" header="訊息" />
          <Column field="location" header="位置" style={{ width: '200px' }} />
        </DataTable>
      ) : (
        <div className="flex align-items-center gap-2" style={{ color: '#22c55e' }}>
          <i className="pi pi-check-circle" />
          <span>驗證通過，無任何問題</span>
        </div>
      )}
    </div>
  )
}

export default PipelineStepDetail
