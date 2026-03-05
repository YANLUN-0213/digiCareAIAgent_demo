import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Badge } from 'primereact/badge'
import { STATS_CARDS, MOCK_LOGS, MOCK_USERS, MOCK_QA_FEEDBACKS, MOCK_DRIFT_ALERTS } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'

const AI_STATS = [
  { title: '知識庫數量', value: '4', icon: 'pi pi-database', bgColor: '#ede7f6', iconColor: '#7b1fa2' },
  { title: '今日問答數', value: '156', icon: 'pi pi-comments', bgColor: '#e3f2fd', iconColor: '#1976d2' },
  { title: '平均品質分數', value: '82 分', icon: 'pi pi-chart-bar', bgColor: '#e8f5e9', iconColor: '#388e3c' },
  { title: '待處理警示', value: String(MOCK_DRIFT_ALERTS.filter(a => a.status === 'open').length), icon: 'pi pi-exclamation-triangle', bgColor: '#fff3e0', iconColor: '#f57c00' },
]

const Dashboard = () => {
  const recentLogs = MOCK_LOGS.slice(0, 5)
  const recentQA = MOCK_QA_FEEDBACKS.slice(0, 5)

  const resultBody = (row: { result: string }) => (
    <Badge value={row.result === 'success' ? '成功' : '失敗'} severity={row.result === 'success' ? 'success' : 'danger'} />
  )

  const feedbackBody = (row: { feedback: string }) => {
    const map: Record<string, { icon: string; color: string }> = {
      positive: { icon: 'pi pi-thumbs-up-fill', color: '#388e3c' },
      negative: { icon: 'pi pi-thumbs-down-fill', color: '#d32f2f' },
      none: { icon: 'pi pi-minus', color: '#999' },
    }
    const s = map[row.feedback]
    return <i className={s.icon} style={{ color: s.color, fontSize: 14 }} />
  }

  const scoreBody = (row: { score: number }) => {
    const color = row.score >= 90 ? '#388e3c' : row.score >= 70 ? '#f57c00' : '#d32f2f'
    return <span style={{ color, fontWeight: 600 }}>{row.score}</span>
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="儀表板" />

      {/* 系統統計 */}
      <div className="grid">
        {STATS_CARDS.map((s, i) => (
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

      {/* AI 統計 */}
      <div className="grid">
        {AI_STATS.map((s, i) => (
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

      <div className="grid">
        {/* 最近 AI 問答 */}
        <div className="col-12 lg:col-6">
          <Card className="card" title="最近 AI 問答回饋">
            <DataTable value={recentQA} showGridlines size="small">
              <Column field="question" header="提問" body={(row: { question: string }) => <span className="text-sm">{row.question.length > 25 ? row.question.slice(0, 25) + '...' : row.question}</span>} />
              <Column field="score" header="分數" body={scoreBody} style={{ width: 60 }} />
              <Column field="feedback" header="回饋" body={feedbackBody} style={{ width: 60 }} />
              <Column field="createdAt" header="時間" style={{ width: 130 }} />
            </DataTable>
          </Card>
        </div>

        {/* 最近操作日誌 */}
        <div className="col-12 lg:col-6">
          <Card className="card" title="最近操作日誌">
            <DataTable value={recentLogs} showGridlines size="small">
              <Column field="user" header="使用者" />
              <Column field="action" header="操作" />
              <Column field="result" header="結果" body={resultBody} />
              <Column field="createdAt" header="時間" />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
