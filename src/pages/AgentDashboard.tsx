import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { ProgressBar } from 'primereact/progressbar'
import { AGENT_STATS, MOCK_AGENT_SKILLS } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'

const skillUsage = [
  { name: '法規查詢 Agent', usage: 85 },
  { name: 'FHIR 驗證 Agent', usage: 72 },
  { name: '文件摘要 Agent', usage: 65 },
  { name: '仿單比對 Agent', usage: 48 },
  { name: '問答評分 Agent', usage: 40 },
  { name: '報表生成 Agent', usage: 32 },
]

const AgentDashboard = () => {
  const recentSkills = MOCK_AGENT_SKILLS.slice(0, 8)

  const visibilityBadge = (v: string) => {
    const map: Record<string, { label: string; severity: 'success' | 'info' | 'warning' }> = {
      public: { label: '公開', severity: 'success' },
      private: { label: '私有', severity: 'info' },
      shared: { label: '共享', severity: 'warning' },
    }
    const s = map[v]
    return <Badge value={s.label} severity={s.severity} />
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="Agent 儀錶板" />

      {/* 統計卡片 */}
      <div className="grid">
        {AGENT_STATS.map((s, i) => (
          <div key={i} className="col-12 md:col-6 lg:col-3" style={i === 4 ? { flex: '0 0 20%', maxWidth: '20%' } : undefined}>
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

      {/* 近期 Agent 技能 */}
      <h3 className="mb-3">近期 Agent 技能</h3>
      <div className="grid">
        {recentSkills.map(skill => (
          <div key={skill.id} className="col-12 md:col-6 lg:col-3">
            <Card className="card shadow-2">
              <div className="flex justify-content-between align-items-start mb-2">
                <h4 className="m-0 text-base">{skill.title}</h4>
                {visibilityBadge(skill.visibility)}
              </div>
              <p className="text-500 text-sm mt-1 mb-3" style={{ minHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {skill.description}
              </p>
              <div className="flex justify-content-between text-sm">
                <span><i className="pi pi-list mr-1" />{skill.stepsCount} 步驟</span>
                <span><i className="pi pi-wrench mr-1" />{skill.toolsCount} 工具</span>
              </div>
              <div className="flex justify-content-between text-xs text-500 mt-2">
                <span>版本 {skill.version}</span>
                <span>更新 {skill.updatedAt}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 技能使用率分析 */}
      <Card className="card mt-3" title="技能使用率分析">
        <div className="flex flex-column gap-3">
          {skillUsage.map((s, i) => (
            <div key={i}>
              <div className="flex justify-content-between mb-1">
                <span className="text-sm font-semibold">{s.name}</span>
                <span className="text-sm text-500">{s.usage}%</span>
              </div>
              <ProgressBar value={s.usage} showValue={false} style={{ height: 8 }} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default AgentDashboard
