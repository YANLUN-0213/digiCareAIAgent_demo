import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { MOCK_SHARED_TEMPLATES, type SharedTemplate } from '@/data/mockData'

const categoryOptions = [
  { label: '全部分類', value: 'all' },
  { label: '護理', value: 'nursing' },
  { label: '急診', value: 'emergency' },
  { label: '醫師', value: 'physician' },
  { label: '自訂', value: 'custom' },
]
const sortOptions = [
  { label: '最多引用', value: 'fork' },
  { label: '最新分享', value: 'date' },
]
const categoryMap: Record<string, { label: string; severity: 'info' | 'success' | 'warning' | 'danger' }> = {
  nursing: { label: '護理', severity: 'info' },
  emergency: { label: '急診', severity: 'danger' },
  physician: { label: '醫師', severity: 'success' },
  custom: { label: '自訂', severity: 'warning' },
}

const AiSharedMarket = () => {
  const { showSuccess } = useToast()
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('fork')
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState<SharedTemplate | null>(null)

  let filtered = category === 'all' ? [...MOCK_SHARED_TEMPLATES] : MOCK_SHARED_TEMPLATES.filter(t => t.category === category)
  if (search.trim()) {
    const kw = search.trim().toLowerCase()
    filtered = filtered.filter(t => t.name.toLowerCase().includes(kw) || t.description.toLowerCase().includes(kw) || t.authorName.toLowerCase().includes(kw))
  }
  filtered.sort((a, b) => sortBy === 'fork' ? b.forkCount - a.forkCount : b.sharedAt.localeCompare(a.sharedAt))

  const handleFork = (tpl: SharedTemplate) => {
    showSuccess('引用成功', `已將「${tpl.name}」加入您的個人模板`)
    setDetail(null)
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="分享市集" />

      {/* 搜尋/篩選 */}
      <Card className="card">
        <div className="flex align-items-center gap-3 flex-wrap">
          <Dropdown value={category} options={categoryOptions} onChange={e => setCategory(e.value)} className="w-10rem" />
          <Dropdown value={sortBy} options={sortOptions} onChange={e => setSortBy(e.value)} className="w-10rem" />
          <span className="p-input-icon-left flex-1" style={{ minWidth: 200 }}>
            <i className="pi pi-search" />
            <InputText value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋模板名稱、作者..." className="w-full" />
          </span>
          <span className="text-sm text-500">共 {filtered.length} 筆</span>
        </div>
      </Card>

      {/* 卡片列表 */}
      <div className="grid mt-0">
        {filtered.map(tpl => {
          const cat = categoryMap[tpl.category]
          return (
            <div key={tpl.shareCode} className="col-12 md:col-6 lg:col-4">
              <Card className="card h-full" style={{ cursor: 'pointer' }} onClick={() => setDetail(tpl)}>
                <div className="flex align-items-center justify-content-between mb-2">
                  <span className="font-bold">{tpl.name}</span>
                  {cat && <Tag value={cat.label} severity={cat.severity} style={{ fontSize: '0.7rem' }} />}
                </div>
                <div className="text-sm text-500 mb-2">
                  <i className="pi pi-user mr-1" />{tpl.authorName}（{tpl.authorDepartment} {tpl.authorTitle}）
                </div>
                <div className="text-sm mb-3" style={{ color: '#555', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tpl.description}
                </div>
                <div className="flex align-items-center justify-content-between">
                  <span className="text-sm"><i className="pi pi-replay mr-1" style={{ color: 'var(--primary_color)' }} />{tpl.forkCount} 次引用</span>
                  <Button label="查看詳情" className="p-button-text p-button-sm" icon="pi pi-arrow-right" iconPos="right" />
                </div>
              </Card>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="col-12 text-center text-500 py-5">
            <i className="pi pi-search text-5xl mb-3" style={{ display: 'block', color: '#ccc' }} />
            <p>找不到符合條件的模板</p>
          </div>
        )}
      </div>

      {/* 詳情 Dialog */}
      <Dialog header={detail?.name} visible={!!detail} onHide={() => setDetail(null)} style={{ width: '600px' }}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="返回列表" className="p-button-text" onClick={() => setDetail(null)} />
          <Button label="引用到我的" icon="pi pi-download" onClick={() => detail && handleFork(detail)} />
        </div>}
      >
        {detail && (
          <div className="flex flex-column gap-3">
            <div className="grid text-sm">
              <div className="col-6"><span className="text-500">作者：</span><strong>{detail.authorName}</strong></div>
              <div className="col-6"><span className="text-500">科別：</span>{detail.authorDepartment}</div>
              <div className="col-6"><span className="text-500">職稱：</span>{detail.authorTitle}</div>
              <div className="col-6"><span className="text-500">分享時間：</span>{detail.sharedAt}</div>
              <div className="col-6"><span className="text-500">引用次數：</span><strong>{detail.forkCount}</strong></div>
              <div className="col-6"><span className="text-500">分享碼：</span><code>{detail.shareCode}</code></div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">描述</label>
              <div className="text-sm" style={{ lineHeight: 1.6 }}>{detail.description}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">System Prompt 預覽</label>
              <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: '1rem', fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.6, maxHeight: 200, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                {detail.systemPromptPreview}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AiSharedMarket
