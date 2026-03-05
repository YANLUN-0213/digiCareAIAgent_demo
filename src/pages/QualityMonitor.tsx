import { useMemo, useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import { MOCK_QA_FEEDBACKS, QAFeedback } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const feedbackOptions = [
  { name: '全部', code: '' },
  { name: '正面', code: 'positive' },
  { name: '負面', code: 'negative' },
  { name: '未評', code: 'none' },
]

const statusOptions = [
  { name: '全部', code: '' },
  { name: '已審核', code: 'reviewed' },
  { name: '待審核', code: 'pending' },
  { name: '已修正', code: 'corrected' },
]

const QualityMonitor = () => {
  const [feedbacks, setFeedbacks] = useState<QAFeedback[]>(MOCK_QA_FEEDBACKS)
  const [selectedFeedback, setSelectedFeedback] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [first, setFirst] = useState(0)
  const pageSize = 10
  const { showSuccess } = useToast()

  const [detailVisible, setDetailVisible] = useState(false)
  const [detailItem, setDetailItem] = useState<QAFeedback | null>(null)
  const [correctedAnswer, setCorrectedAnswer] = useState('')

  const filtered = useMemo(() => {
    return feedbacks.filter(f => {
      const fb = !selectedFeedback || f.feedback === selectedFeedback
      const st = !selectedStatus || f.status === selectedStatus
      return fb && st
    })
  }, [feedbacks, selectedFeedback, selectedStatus])

  const paged = useMemo(() => filtered.slice(first, first + pageSize), [filtered, first])

  // 統計
  const totalCount = feedbacks.length
  const positiveCount = feedbacks.filter(f => f.feedback === 'positive').length
  const negativeCount = feedbacks.filter(f => f.feedback === 'negative').length
  const avgScore = Math.round(feedbacks.reduce((sum, f) => sum + f.score, 0) / totalCount)
  const pendingCount = feedbacks.filter(f => f.status === 'pending').length

  const feedbackBody = (row: QAFeedback) => {
    const map: Record<string, { icon: string; color: string }> = {
      positive: { icon: 'pi pi-thumbs-up-fill', color: '#388e3c' },
      negative: { icon: 'pi pi-thumbs-down-fill', color: '#d32f2f' },
      none: { icon: 'pi pi-minus', color: '#999' },
    }
    const s = map[row.feedback]
    return <i className={s.icon} style={{ color: s.color, fontSize: 16 }} />
  }

  const scoreBody = (row: QAFeedback) => {
    const color = row.score >= 90 ? '#388e3c' : row.score >= 70 ? '#f57c00' : '#d32f2f'
    return <span style={{ color, fontWeight: 600 }}>{row.score}</span>
  }

  const statusBody = (row: QAFeedback) => {
    const map: Record<string, 'success' | 'warning' | 'info'> = { reviewed: 'success', pending: 'warning', corrected: 'info' }
    const labels: Record<string, string> = { reviewed: '已審核', pending: '待審核', corrected: '已修正' }
    return <Badge value={labels[row.status]} severity={map[row.status]} />
  }

  const handleDetail = (row: QAFeedback) => {
    setDetailItem(row)
    setCorrectedAnswer(row.answer)
    setDetailVisible(true)
  }

  const handleMarkReviewed = () => {
    if (!detailItem) return
    setFeedbacks(prev => prev.map(f => f.id === detailItem.id ? { ...f, status: 'reviewed' as const } : f))
    showSuccess('已標記為審核完成')
    setDetailVisible(false)
  }

  const handleCorrect = () => {
    if (!detailItem) return
    setFeedbacks(prev => prev.map(f => f.id === detailItem.id ? { ...f, answer: correctedAnswer, status: 'corrected' as const, score: 95 } : f))
    showSuccess('修正成功', '回答已更新並標記為已修正')
    setDetailVisible(false)
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="回應品質監控" />

      {/* 統計卡片 */}
      <div className="grid">
        {[
          { title: '平均品質分數', value: `${avgScore} 分`, icon: 'pi pi-chart-line', bgColor: '#e3f2fd', iconColor: '#1976d2' },
          { title: '正面回饋', value: `${positiveCount} 筆`, icon: 'pi pi-thumbs-up', bgColor: '#e8f5e9', iconColor: '#388e3c' },
          { title: '負面回饋', value: `${negativeCount} 筆`, icon: 'pi pi-thumbs-down', bgColor: '#fce4ec', iconColor: '#d32f2f' },
          { title: '待審核', value: `${pendingCount} 筆`, icon: 'pi pi-clock', bgColor: '#fff3e0', iconColor: '#f57c00' },
        ].map((s, i) => (
          <div key={i} className="col-12 md:col-6 lg:col-3">
            <Card className="card shadow-2">
              <div className="flex align-items-center justify-content-between">
                <div><p className="text-500 text-sm mb-2 mt-0">{s.title}</p><p className="text-2xl font-bold m-0" style={{ color: '#333' }}>{s.value}</p></div>
                <div className="flex align-items-center justify-content-center border-round" style={{ width: 48, height: 48, backgroundColor: s.bgColor }}>
                  <i className={`${s.icon} text-xl`} style={{ color: s.iconColor }} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 篩選 */}
      <Card className="card">
        <div className="flex align-items-end gap-3 mb-3">
          <div><label className="block mb-1">回饋類型</label><Dropdown value={selectedFeedback} options={feedbackOptions} optionLabel="name" optionValue="code" className="w-10rem" onChange={e => { setSelectedFeedback(e.value); setFirst(0) }} /></div>
          <div><label className="block mb-1">審核狀態</label><Dropdown value={selectedStatus} options={statusOptions} optionLabel="name" optionValue="code" className="w-10rem" onChange={e => { setSelectedStatus(e.value); setFirst(0) }} /></div>
          <Button label="清除" icon="pi pi-times" className="p-button-outlined" onClick={() => { setSelectedFeedback(''); setSelectedStatus(''); setFirst(0) }} />
        </div>

        <DataTable value={paged} showGridlines emptyMessage="查無資料">
          <Column field="question" header="提問" style={{ maxWidth: 300 }} body={(row: QAFeedback) => <span className="text-sm" title={row.question}>{row.question.length > 30 ? row.question.slice(0, 30) + '...' : row.question}</span>} />
          <Column field="source" header="參考來源" style={{ width: 200 }} />
          <Column field="score" header="品質分數" body={scoreBody} sortable style={{ width: 100 }} />
          <Column field="feedback" header="回饋" body={feedbackBody} style={{ width: 70 }} />
          <Column field="user" header="使用者" style={{ width: 90 }} />
          <Column field="status" header="狀態" body={statusBody} style={{ width: 90 }} />
          <Column field="createdAt" header="時間" style={{ width: 140 }} />
          <Column header="操作" style={{ width: 80 }} body={(row: QAFeedback) => <Button icon="pi pi-search" className="p-button-sm" onClick={() => handleDetail(row)} />} />
        </DataTable>
        <div className="flex justify-content-between align-items-center">
          <p className="text-sm">總筆數：{filtered.length} 筆</p>
          <Paginator className="mt-3" first={first} rows={pageSize} totalRecords={filtered.length} onPageChange={e => setFirst(e.first)} />
        </div>
      </Card>

      {/* 詳情 Dialog */}
      <Dialog header="問答詳情" visible={detailVisible} style={{ width: 700 }} onHide={() => setDetailVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="關閉" className="p-button-outlined" onClick={() => setDetailVisible(false)} />
          {detailItem?.status === 'pending' && <Button label="標記已審核" icon="pi pi-check" className="p-button-outlined" onClick={handleMarkReviewed} />}
          {detailItem?.status === 'pending' && <Button label="修正並儲存" icon="pi pi-save" onClick={handleCorrect} />}
        </div>}>
        {detailItem && (
          <div className="flex flex-column gap-3 pt-2">
            <div><label className="block mb-1 font-semibold text-sm">使用者提問</label><div className="p-3 surface-100 border-round text-sm">{detailItem.question}</div></div>
            <div><label className="block mb-1 font-semibold text-sm">系統回答 {detailItem.status === 'pending' && '（可編輯修正）'}</label>
              {detailItem.status === 'pending' ? (
                <InputTextarea value={correctedAnswer} onChange={e => setCorrectedAnswer(e.target.value)} rows={6} className="w-full" style={{ fontSize: 13 }} />
              ) : (
                <div className="p-3 surface-100 border-round text-sm" style={{ whiteSpace: 'pre-wrap' }}>{detailItem.answer}</div>
              )}
            </div>
            <div className="grid">
              <div className="col-6"><label className="block mb-1 font-semibold text-sm">參考來源</label><span className="text-sm">{detailItem.source}</span></div>
              <div className="col-3"><label className="block mb-1 font-semibold text-sm">品質分數</label><span className="text-sm font-bold">{detailItem.score}</span></div>
              <div className="col-3"><label className="block mb-1 font-semibold text-sm">回饋</label>{feedbackBody(detailItem)}</div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default QualityMonitor
