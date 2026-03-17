import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Dialog } from 'primereact/dialog'
import WorkflowStepsIndicator from './WorkflowStepsIndicator'
import type { WorkflowRun, WorkflowStep, VerificationResultItem } from './twpas-workflow.types'

interface Props {
  visible: boolean
  onHide: () => void
  runs: WorkflowRun[]
}

const TwpasWorkflowDialog = ({ visible, onHide, runs }: Props) => {
  const [detailStep, setDetailStep] = useState<WorkflowStep | null>(null)

  const handleHide = () => {
    setDetailStep(null)
    onHide()
  }

  const overallStatus = (run: WorkflowRun) => {
    const last = [...run.steps].reverse().find(s => s.status !== 'pending')
    if (!last) return 'pending'
    if (run.steps.every(s => s.status === 'success')) return 'all-pass'
    return last.status
  }

  const statusTag = (run: WorkflowRun) => {
    const s = overallStatus(run)
    if (s === 'all-pass') return <Tag value="全部通過" severity="success" />
    if (s === 'failed') return <Tag value="驗證失敗" severity="danger" />
    if (s === 'in_progress') return <Tag value="進行中" severity="info" />
    return <Tag value="待執行" />
  }

  return (
    <>
      <Dialog
        header="案件流程追蹤"
        visible={visible}
        onHide={handleHide}
        style={{ width: '700px' }}
        maximizable
        footer={
          <Button label="關閉" icon="pi pi-times" className="p-button-secondary" onClick={handleHide} />
        }
      >
        {runs.length === 0 ? (
          <div className="text-center p-4" style={{ color: '#9ca3af' }}>
            <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }} />
            <div className="mt-2">尚無流程紀錄，請先點擊「產生FHIR格式且驗證」</div>
          </div>
        ) : (
          runs.map(run => (
            <div key={run.id} className="wf-run-card">
              <div className="wf-run-header">
                <span>
                  <i className="pi pi-clock mr-2" />{run.timestamp}
                </span>
                {statusTag(run)}
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <WorkflowStepsIndicator
                  steps={run.steps}
                  onStepClick={(idx) => setDetailStep(run.steps[idx])}
                />
              </div>
            </div>
          ))
        )}
      </Dialog>

      {/* 驗證結果明細 */}
      <Dialog
        header={detailStep ? `${detailStep.label} — 驗證結果` : '驗證結果'}
        visible={!!detailStep}
        onHide={() => setDetailStep(null)}
        style={{ width: '800px' }}
        footer={
          <Button label="返回" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => setDetailStep(null)} />
        }
      >
        {detailStep && (
          <>
            <div className="mb-3 flex align-items-center gap-3" style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              <Tag
                value={detailStep.status === 'success' ? '通過' : '失敗'}
                severity={detailStep.status === 'success' ? 'success' : 'danger'}
              />
              <span>驗證時間：{detailStep.timestamp}</span>
              <span>資源數：{detailStep.totalResources ?? '—'}</span>
              <span>錯誤：{detailStep.errorCount ?? 0}</span>
              <span>警告：{detailStep.warningCount ?? 0}</span>
            </div>
            {(!detailStep.items || detailStep.items.length === 0) ? (
              <div className="p-4 text-center" style={{ background: '#f0fdf4', borderRadius: 6 }}>
                <i className="pi pi-check-circle" style={{ color: '#22c55e', fontSize: '1.5rem' }} />
                <div className="mt-2 font-bold" style={{ color: '#166534' }}>所有資源驗證通過，無錯誤或警告</div>
              </div>
            ) : (
              <DataTable value={detailStep.items} size="small" stripedRows>
                <Column
                  header="嚴重度"
                  body={(item: VerificationResultItem) => (
                    <Tag
                      value={item.severity === 'error' ? '錯誤' : item.severity === 'warning' ? '警告' : '資訊'}
                      severity={item.severity === 'error' ? 'danger' : item.severity === 'warning' ? 'warning' : 'info'}
                    />
                  )}
                  style={{ width: '80px' }}
                />
                <Column field="resourceType" header="Resource" style={{ width: '140px' }} />
                <Column field="code" header="規則代碼" style={{ width: '120px' }} />
                <Column field="message" header="訊息" />
                <Column field="location" header="位置" style={{ width: '180px' }} />
              </DataTable>
            )}
          </>
        )}
      </Dialog>
    </>
  )
}

export default TwpasWorkflowDialog
