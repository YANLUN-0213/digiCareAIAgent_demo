import { useMemo, useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { Paginator } from 'primereact/paginator'
import { MOCK_AGENT_EXECUTIONS, AgentExecution as AE } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'

const statusOptions = [
  { name: '全部', code: '' },
  { name: '執行中', code: 'running' },
  { name: '成功', code: 'success' },
  { name: '失敗', code: 'failed' },
  { name: '排隊中', code: 'queued' },
]

const AgentExecution = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [first, setFirst] = useState(0)
  const pageSize = 10
  const [detailVisible, setDetailVisible] = useState(false)
  const [detailItem, setDetailItem] = useState<AE | null>(null)

  const stats = useMemo(() => {
    const running = MOCK_AGENT_EXECUTIONS.filter(e => e.status === 'running').length
    const queued = MOCK_AGENT_EXECUTIONS.filter(e => e.status === 'queued').length
    const success = MOCK_AGENT_EXECUTIONS.filter(e => e.status === 'success').length
    const failed = MOCK_AGENT_EXECUTIONS.filter(e => e.status === 'failed').length
    return [
      { title: '執行中', value: `${running}`, icon: 'pi pi-spin pi-spinner', bgColor: '#e3f2fd', iconColor: '#1976d2' },
      { title: '排隊中', value: `${queued}`, icon: 'pi pi-clock', bgColor: '#f5f5f5', iconColor: '#757575' },
      { title: '今日完成', value: `${success}`, icon: 'pi pi-check-circle', bgColor: '#e8f5e9', iconColor: '#388e3c' },
      { title: '今日失敗', value: `${failed}`, icon: 'pi pi-times-circle', bgColor: '#fce4ec', iconColor: '#d32f2f' },
    ]
  }, [])

  const filtered = useMemo(() => {
    return MOCK_AGENT_EXECUTIONS.filter(e => !selectedStatus || e.status === selectedStatus)
  }, [selectedStatus])

  const paged = useMemo(() => filtered.slice(first, first + pageSize), [filtered, first])

  const statusBody = (row: AE) => {
    const map: Record<string, { label: string; severity: 'info' | 'success' | 'danger' | 'secondary' }> = {
      running: { label: '執行中', severity: 'info' },
      success: { label: '成功', severity: 'success' },
      failed: { label: '失敗', severity: 'danger' },
      queued: { label: '排隊中', severity: 'secondary' },
    }
    const s = map[row.status]
    return <Badge value={s.label} severity={s.severity} />
  }

  const triggerBody = (row: AE) => {
    const map: Record<string, { label: string; severity: 'info' | 'warning' | 'success' }> = {
      manual: { label: '手動', severity: 'info' },
      scheduled: { label: '排程', severity: 'warning' },
      webhook: { label: 'Webhook', severity: 'success' },
    }
    const s = map[row.trigger]
    return <Badge value={s.label} severity={s.severity} />
  }

  const handleDetail = (row: AE) => {
    setDetailItem(row)
    setDetailVisible(true)
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="Agent 執行狀態" />

      {/* 摘要卡片 */}
      <div className="grid">
        {stats.map((s, i) => (
          <div key={i} className="col-12 md:col-6 lg:col-3">
            <Card className="card shadow-2">
              <div className="flex align-items-center justify-content-between">
                <div>
                  <p className="text-500 text-sm mb-2 mt-0">{s.title}</p>
                  <p className="text-2xl font-bold m-0" style={{ color: '#333' }}>{s.value}</p>
                </div>
                <div className="flex align-items-center justify-content-center border-round" style={{ width: 48, height: 48, backgroundColor: s.bgColor }}>
                  <i className={`${s.icon} text-xl`} style={{ color: s.iconColor }} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 篩選 + 表格 */}
      <Card className="card">
        <div className="flex align-items-end gap-3 mb-3">
          <div>
            <label className="block mb-1">狀態篩選</label>
            <Dropdown value={selectedStatus} options={statusOptions} optionLabel="name" optionValue="code" className="w-12rem" onChange={e => { setSelectedStatus(e.value); setFirst(0) }} />
          </div>
          <Button label="清除" icon="pi pi-times" className="p-button-outlined" onClick={() => { setSelectedStatus(''); setFirst(0) }} />
        </div>

        <DataTable value={paged} showGridlines emptyMessage="查無資料">
          <Column field="agentName" header="Agent 名稱" sortable />
          <Column field="skillTitle" header="技能" style={{ width: 160 }} />
          <Column field="trigger" header="觸發方式" body={triggerBody} style={{ width: 100 }} />
          <Column field="status" header="狀態" body={statusBody} style={{ width: 90 }} />
          <Column field="startTime" header="開始時間" sortable style={{ width: 160 }} />
          <Column field="duration" header="耗時" style={{ width: 80 }} />
          <Column field="tokensUsed" header="Tokens" style={{ width: 90 }} body={(row: AE) => row.tokensUsed.toLocaleString()} />
          <Column header="操作" style={{ width: 70 }} body={(row: AE) => <Button icon="pi pi-search" className="p-button-sm" onClick={() => handleDetail(row)} />} />
        </DataTable>
        <div className="flex justify-content-between align-items-center">
          <p className="text-sm">總筆數：{filtered.length} 筆</p>
          <Paginator className="mt-3" first={first} rows={pageSize} totalRecords={filtered.length} onPageChange={e => setFirst(e.first)} />
        </div>
      </Card>

      {/* 詳情 Dialog */}
      <Dialog header="執行詳情" visible={detailVisible} style={{ width: 700 }} onHide={() => setDetailVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end"><Button label="關閉" className="p-button-outlined" onClick={() => setDetailVisible(false)} /></div>}>
        {detailItem && (
          <div className="flex flex-column gap-3 pt-2">
            <div className="grid">
              <div className="col-6">
                <label className="block mb-1 font-semibold text-sm">Agent 名稱</label>
                <span className="text-sm">{detailItem.agentName}</span>
              </div>
              <div className="col-3">
                <label className="block mb-1 font-semibold text-sm">狀態</label>
                {statusBody(detailItem)}
              </div>
              <div className="col-3">
                <label className="block mb-1 font-semibold text-sm">觸發方式</label>
                {triggerBody(detailItem)}
              </div>
            </div>
            <div className="grid">
              <div className="col-4">
                <label className="block mb-1 font-semibold text-sm">開始時間</label>
                <span className="text-sm">{detailItem.startTime}</span>
              </div>
              <div className="col-4">
                <label className="block mb-1 font-semibold text-sm">耗時</label>
                <span className="text-sm">{detailItem.duration}</span>
              </div>
              <div className="col-4">
                <label className="block mb-1 font-semibold text-sm">Tokens 使用</label>
                <span className="text-sm">{detailItem.tokensUsed.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm">輸入</label>
              <div className="p-3 surface-100 border-round text-sm">{detailItem.input}</div>
            </div>

            {detailItem.output && (
              <div>
                <label className="block mb-1 font-semibold text-sm">輸出</label>
                <div className="p-3 surface-100 border-round text-sm" style={{ whiteSpace: 'pre-wrap' }}>{detailItem.output}</div>
              </div>
            )}

            {detailItem.steps.length > 0 && (
              <div>
                <label className="block mb-2 font-semibold text-sm">執行步驟</label>
                <div className="flex flex-column gap-2">
                  {detailItem.steps.map((step, i) => (
                    <div key={i} className="flex align-items-center justify-content-between p-2 surface-100 border-round">
                      <div className="flex align-items-center gap-2">
                        <i className={`pi ${step.status === 'success' ? 'pi-check-circle text-green-500' : step.status === 'failed' ? 'pi-times-circle text-red-500' : 'pi-minus-circle text-400'}`} />
                        <span className="text-sm">{step.name}</span>
                      </div>
                      <span className="text-sm text-500">{step.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailItem.error && (
              <div>
                <label className="block mb-1 font-semibold text-sm" style={{ color: '#d32f2f' }}>錯誤訊息</label>
                <div className="p-3 border-round text-sm" style={{ backgroundColor: '#fce4ec', color: '#d32f2f', whiteSpace: 'pre-wrap' }}>{detailItem.error}</div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AgentExecution
