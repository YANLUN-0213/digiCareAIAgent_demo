import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ProgressBar } from 'primereact/progressbar'
import PageHeader from '@/components/PageHeader'
import { MOCK_AI_HELPER_STATS } from '@/data/mockData'

const stats = MOCK_AI_HELPER_STATS

const statCards = [
  { label: '總生成次數', value: stats.totalGenerations.toLocaleString(), icon: 'pi pi-bolt', color: '#6366f1' },
  { label: '使用者數', value: stats.uniqueUsers.toString(), icon: 'pi pi-users', color: '#22c55e' },
  { label: '平均耗時', value: stats.avgDuration, icon: 'pi pi-clock', color: '#f59e0b' },
  { label: 'Token 用量', value: stats.totalTokens, icon: 'pi pi-microchip-ai', color: '#ec4899' },
]

const maxCount = stats.templateRanking[0]?.count ?? 1

const renderStars = (score: number) => (
  <div className="flex align-items-center gap-1">
    {[1, 2, 3, 4, 5].map(v => (
      <i key={v}
        className={v <= Math.round(score) ? 'pi pi-star-fill' : 'pi pi-star'}
        style={{ color: v <= Math.round(score) ? '#f59e0b' : '#d1d5db', fontSize: '1rem' }}
      />
    ))}
    <span className="ml-2 font-bold">{score.toFixed(1)}</span>
  </div>
)

const AiStatistics = () => {
  const overallAvg = ((stats.feedbackAvg.ui + stats.feedbackAvg.content + stats.feedbackAvg.efficiency) / 3).toFixed(2)

  return (
    <div className="content-inner">
      <PageHeader funcName="統計報表" />

      {/* 統計卡片 */}
      <div className="grid">
        {statCards.map((s, i) => (
          <div key={i} className="col-12 md:col-6 lg:col-3">
            <Card className="card">
              <div className="flex align-items-center gap-3">
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={s.icon} style={{ fontSize: '1.4rem', color: s.color }} />
                </div>
                <div>
                  <div className="text-sm text-500">{s.label}</div>
                  <div className="font-bold text-xl">{s.value}</div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid">
        {/* 模板使用排行 */}
        <div className="col-12 lg:col-7">
          <Card className="card" title="模板使用排行">
            <DataTable value={stats.templateRanking} size="small" stripedRows>
              <Column header="#" body={(_: unknown, opts: { rowIndex: number }) => (
                <span className="font-bold" style={{ color: opts.rowIndex < 3 ? 'var(--primary_color)' : '#666' }}>
                  {opts.rowIndex + 1}
                </span>
              )} style={{ width: '40px' }} />
              <Column header="模板名稱" field="name" />
              <Column header="使用次數" body={(row: { name: string; count: number }) => (
                <div className="flex align-items-center gap-2">
                  <ProgressBar value={Math.round((row.count / maxCount) * 100)} showValue={false} style={{ height: 8, width: 100 }} />
                  <span className="font-semibold text-sm">{row.count}</span>
                </div>
              )} style={{ width: '200px' }} />
              <Column header="佔比" body={(row: { count: number }) => (
                <span className="text-sm">{((row.count / stats.totalGenerations) * 100).toFixed(1)}%</span>
              )} style={{ width: '80px' }} />
            </DataTable>
          </Card>
        </div>

        {/* 回饋評分 */}
        <div className="col-12 lg:col-5">
          <Card className="card" title="回饋評分">
            <div className="flex flex-column gap-4">
              <div className="flex justify-content-between align-items-center">
                <span className="text-sm font-semibold">UI 直觀易用</span>
                {renderStars(stats.feedbackAvg.ui)}
              </div>
              <div className="flex justify-content-between align-items-center">
                <span className="text-sm font-semibold">內容符合病情</span>
                {renderStars(stats.feedbackAvg.content)}
              </div>
              <div className="flex justify-content-between align-items-center">
                <span className="text-sm font-semibold">提升工作效率</span>
                {renderStars(stats.feedbackAvg.efficiency)}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }} className="flex justify-content-between align-items-center">
                <span className="font-bold">整體平均</span>
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-star-fill" style={{ color: '#f59e0b', fontSize: '1.2rem' }} />
                  <span className="font-bold text-xl">{overallAvg}</span>
                  <span className="text-500 text-sm">/ 5.0</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 快速摘要 */}
          <Card className="card mt-3" title="本月摘要">
            <div className="flex flex-column gap-2 text-sm">
              <div className="flex justify-content-between">
                <span className="text-500">最熱門模板</span>
                <span className="font-semibold">{stats.templateRanking[0]?.name}</span>
              </div>
              <div className="flex justify-content-between">
                <span className="text-500">日均生成量</span>
                <span className="font-semibold">{Math.round(stats.totalGenerations / 30)} 次/天</span>
              </div>
              <div className="flex justify-content-between">
                <span className="text-500">最高評分項目</span>
                <span className="font-semibold">內容符合病情（{stats.feedbackAvg.content}）</span>
              </div>
              <div className="flex justify-content-between">
                <span className="text-500">總回饋數</span>
                <span className="font-semibold">892 筆</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AiStatistics
