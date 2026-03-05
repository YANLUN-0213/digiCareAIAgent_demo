import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import { MOCK_DRIFT_ALERTS, DriftAlert } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const typeLabels: Record<string, string> = { conflict: '內容衝突', outdated: '文件過期', quality_drop: '品質下降' }
const typeIcons: Record<string, string> = { conflict: 'pi pi-exclamation-triangle', outdated: 'pi pi-calendar-times', quality_drop: 'pi pi-chart-line' }

const DriftMonitor = () => {
  const [alerts, setAlerts] = useState<DriftAlert[]>(MOCK_DRIFT_ALERTS)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('')
  const [detailVisible, setDetailVisible] = useState(false)
  const [detailItem, setDetailItem] = useState<DriftAlert | null>(null)
  const { showSuccess } = useToast()

  const filtered = alerts.filter(a => {
    const st = !filterStatus || a.status === filterStatus
    const sv = !filterSeverity || a.severity === filterSeverity
    return st && sv
  })

  const openCount = alerts.filter(a => a.status === 'open').length
  const highCount = alerts.filter(a => a.severity === 'high' && a.status === 'open').length

  const handleResolve = (alert: DriftAlert) => {
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: 'resolved' as const } : a))
    showSuccess('已解決', alert.title)
    setDetailVisible(false)
  }

  const handleDismiss = (alert: DriftAlert) => {
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: 'dismissed' as const } : a))
    showSuccess('已忽略', alert.title)
    setDetailVisible(false)
  }

  const handleRunCheck = () => {
    showSuccess('掃描完成', '已完成漂移檢測掃描，未發現新的異常')
  }

  const severityBadge = (severity: string) => {
    const map: Record<string, 'danger' | 'warning' | 'info'> = { high: 'danger', medium: 'warning', low: 'info' }
    const labels: Record<string, string> = { high: '高', medium: '中', low: '低' }
    return <Badge value={labels[severity]} severity={map[severity]} />
  }

  const statusBadge = (status: string) => {
    const map: Record<string, 'danger' | 'success' | 'secondary'> = { open: 'danger', resolved: 'success', dismissed: 'secondary' }
    const labels: Record<string, string> = { open: '待處理', resolved: '已解決', dismissed: '已忽略' }
    return <Badge value={labels[status]} severity={map[status]} />
  }

  const statusOpts = [{ name: '全部', code: '' }, { name: '待處理', code: 'open' }, { name: '已解決', code: 'resolved' }, { name: '已忽略', code: 'dismissed' }]
  const severityOpts = [{ name: '全部', code: '' }, { name: '高', code: 'high' }, { name: '中', code: 'medium' }, { name: '低', code: 'low' }]

  // RAG Triad 指標
  const metrics = [
    { name: '檢索精準度', value: 91, target: 90, unit: '%', trend: '+2%' },
    { name: '回答忠實度', value: 96, target: 95, unit: '%', trend: '+1%' },
    { name: '回答相關性', value: 87, target: 85, unit: '%', trend: '-1%' },
  ]

  return (
    <div className="content-inner">
      <PageHeader funcName="漂移監控" />

      {/* RAG Triad 指標 */}
      <div className="grid">
        {metrics.map((m, i) => (
          <div key={i} className="col-12 md:col-4">
            <Card className="card shadow-2">
              <div className="flex justify-content-between align-items-center">
                <div>
                  <p className="text-500 text-sm mb-1 mt-0">{m.name}</p>
                  <p className="text-3xl font-bold m-0" style={{ color: m.value >= m.target ? '#388e3c' : '#d32f2f' }}>{m.value}{m.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-500 mb-1 mt-0">目標 ≥ {m.target}{m.unit}</p>
                  <Badge value={m.trend} severity={m.trend.startsWith('+') ? 'success' : 'danger'} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 警示統計 + 篩選 */}
      <Card className="card">
        <div className="flex justify-content-between align-items-center mb-3">
          <div className="flex align-items-center gap-3">
            <h3 className="m-0">漂移警示</h3>
            <Badge value={`${openCount} 待處理`} severity={openCount > 0 ? 'danger' : 'success'} />
            {highCount > 0 && <Badge value={`${highCount} 高嚴重性`} severity="danger" />}
          </div>
          <div className="flex gap-2">
            <Dropdown value={filterStatus} options={statusOpts} optionLabel="name" optionValue="code" placeholder="狀態" className="w-8rem" onChange={e => setFilterStatus(e.value)} />
            <Dropdown value={filterSeverity} options={severityOpts} optionLabel="name" optionValue="code" placeholder="嚴重性" className="w-8rem" onChange={e => setFilterSeverity(e.value)} />
            <Button label="執行掃描" icon="pi pi-sync" className="p-button-outlined" onClick={handleRunCheck} />
          </div>
        </div>

        <Divider />

        {/* 警示列表 */}
        <div className="flex flex-column gap-3">
          {filtered.length === 0 && (
            <div className="text-center text-500 py-5"><i className="pi pi-check-circle text-4xl mb-3 block" style={{ color: '#388e3c' }} /><p>目前沒有符合條件的警示</p></div>
          )}
          {filtered.map(alert => (
            <Card key={alert.id} className="shadow-1" style={{
              borderLeft: `4px solid ${alert.severity === 'high' ? '#d32f2f' : alert.severity === 'medium' ? '#f57c00' : '#1976d2'}`,
              opacity: alert.status !== 'open' ? 0.6 : 1,
            }}>
              <div className="flex justify-content-between align-items-start">
                <div className="flex gap-3 align-items-start flex-1">
                  <i className={typeIcons[alert.type]} style={{ fontSize: 24, color: alert.severity === 'high' ? '#d32f2f' : alert.severity === 'medium' ? '#f57c00' : '#1976d2', marginTop: 2 }} />
                  <div className="flex-1">
                    <div className="flex align-items-center gap-2 mb-1">
                      <span className="font-bold">{alert.title}</span>
                      {severityBadge(alert.severity)}
                      {statusBadge(alert.status)}
                    </div>
                    <p className="text-sm text-700 mt-1 mb-1">{alert.description}</p>
                    <div className="flex gap-3 text-xs text-500">
                      <span><i className="pi pi-database mr-1" />{alert.affectedKB}</span>
                      <span><i className="pi pi-tag mr-1" />{typeLabels[alert.type]}</span>
                      <span><i className="pi pi-clock mr-1" />{alert.detectedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button icon="pi pi-search" className="p-button-sm" onClick={() => { setDetailItem(alert); setDetailVisible(true) }} tooltip="詳情" />
                  {alert.status === 'open' && (
                    <>
                      <Button icon="pi pi-check" className="p-button-sm p-button-outlined p-button-success" onClick={() => handleResolve(alert)} tooltip="解決" />
                      <Button icon="pi pi-times" className="p-button-sm p-button-outlined p-button-secondary" onClick={() => handleDismiss(alert)} tooltip="忽略" />
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* 詳情 Dialog */}
      <Dialog header="警示詳情" visible={detailVisible} style={{ width: 600 }} onHide={() => setDetailVisible(false)} draggable={false}
        footer={detailItem?.status === 'open' ? (
          <div className="flex justify-content-end gap-2">
            <Button label="忽略" className="p-button-outlined p-button-secondary" onClick={() => detailItem && handleDismiss(detailItem)} />
            <Button label="標記已解決" icon="pi pi-check" onClick={() => detailItem && handleResolve(detailItem)} />
          </div>
        ) : <Button label="關閉" className="p-button-outlined" onClick={() => setDetailVisible(false)} />}>
        {detailItem && (
          <div className="flex flex-column gap-3 pt-2">
            <div className="flex gap-2 align-items-center">{severityBadge(detailItem.severity)} {statusBadge(detailItem.status)} <Badge value={typeLabels[detailItem.type]} severity="info" /></div>
            <div><label className="block mb-1 font-semibold text-sm">標題</label><span>{detailItem.title}</span></div>
            <div><label className="block mb-1 font-semibold text-sm">說明</label><div className="p-3 surface-100 border-round text-sm">{detailItem.description}</div></div>
            <div className="grid">
              <div className="col-6"><label className="block mb-1 font-semibold text-sm">影響知識庫</label><span className="text-sm">{detailItem.affectedKB}</span></div>
              <div className="col-6"><label className="block mb-1 font-semibold text-sm">偵測時間</label><span className="text-sm">{detailItem.detectedAt}</span></div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default DriftMonitor
