import { useMemo, useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { TabView, TabPanel } from 'primereact/tabview'
import { Paginator } from 'primereact/paginator'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { MOCK_AGENT_SKILLS, AgentSkill } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const visibilityOptions = [
  { name: '私有', code: 'private' },
  { name: '公開', code: 'public' },
  { name: '共享', code: 'shared' },
]

const AgentSkills = () => {
  const [skills, setSkills] = useState<AgentSkill[]>(MOCK_AGENT_SKILLS)
  const [searchText, setSearchText] = useState('')
  const [first, setFirst] = useState(0)
  const pageSize = 10
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editing, setEditing] = useState<AgentSkill | null>(null)
  const [form, setForm] = useState({ title: '', description: '', visibility: 'private' as 'private' | 'public' | 'shared', tags: '' })
  const { showSuccess } = useToast()

  const mySkills = useMemo(() => {
    return skills.filter(s => s.visibility === 'private' || s.owner === '張美玲')
      .filter(s => !searchText || s.title.includes(searchText) || s.description.includes(searchText))
  }, [skills, searchText])

  const publicSkills = useMemo(() => {
    return skills.filter(s => s.visibility === 'public')
      .filter(s => !searchText || s.title.includes(searchText) || s.description.includes(searchText))
  }, [skills, searchText])

  const sharedSkills = useMemo(() => {
    return skills.filter(s => s.visibility === 'shared')
      .filter(s => !searchText || s.title.includes(searchText) || s.description.includes(searchText))
  }, [skills, searchText])

  const publicByOwner = useMemo(() => {
    const grouped: Record<string, AgentSkill[]> = {}
    publicSkills.forEach(s => {
      if (!grouped[s.owner]) grouped[s.owner] = []
      grouped[s.owner].push(s)
    })
    return grouped
  }, [publicSkills])

  const [expandedOwners, setExpandedOwners] = useState<Record<string, boolean>>({})
  const toggleOwner = (owner: string) => setExpandedOwners(prev => ({ ...prev, [owner]: !prev[owner] }))

  const visibilityBody = (row: AgentSkill) => {
    const map: Record<string, { label: string; severity: 'success' | 'info' | 'warning' }> = {
      public: { label: '公開', severity: 'success' },
      private: { label: '私有', severity: 'info' },
      shared: { label: '共享', severity: 'warning' },
    }
    const s = map[row.visibility]
    return <Badge value={s.label} severity={s.severity} />
  }

  const handleAdd = () => {
    setEditing(null)
    setForm({ title: '', description: '', visibility: 'private', tags: '' })
    setDialogVisible(true)
  }

  const handleEdit = (skill: AgentSkill) => {
    setEditing(skill)
    setForm({ title: skill.title, description: skill.description, visibility: skill.visibility, tags: skill.tags.join(', ') })
    setDialogVisible(true)
  }

  const handleSave = () => {
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (editing) {
      setSkills(prev => prev.map(s => s.id === editing.id ? { ...s, title: form.title, description: form.description, visibility: form.visibility, tags, updatedAt: new Date().toISOString().slice(0, 10) } : s))
      showSuccess('更新成功', `已更新「${form.title}」`)
    } else {
      const newSkill: AgentSkill = {
        id: String(Date.now()), title: form.title, description: form.description, visibility: form.visibility,
        version: 'v1.0', stepsCount: 0, toolsCount: 0, owner: '我', ownerAvatar: 'M',
        updatedAt: new Date().toISOString().slice(0, 10), tags,
      }
      setSkills(prev => [...prev, newSkill])
      showSuccess('新增成功', `已新增「${form.title}」`)
    }
    setDialogVisible(false)
  }

  const handleDelete = (skill: AgentSkill) => {
    confirmDialog({
      message: `是否刪除技能「${skill.title}」？`, header: '刪除確認', icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認', rejectLabel: '取消',
      accept: () => { setSkills(prev => prev.filter(s => s.id !== skill.id)); showSuccess('已刪除', skill.title) },
    })
  }

  const actionBody = (row: AgentSkill) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm" onClick={() => handleEdit(row)} />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(row)} />
    </div>
  )

  const skillCard = (skill: AgentSkill) => (
    <div key={skill.id} className="col-12 md:col-6 lg:col-4">
      <Card className="card shadow-2">
        <div className="flex justify-content-between align-items-start mb-2">
          <div className="flex align-items-center gap-2">
            <div className="flex align-items-center justify-content-center border-circle" style={{ width: 36, height: 36, backgroundColor: '#791887', color: '#fff', fontSize: 14, fontWeight: 600 }}>
              {skill.ownerAvatar}
            </div>
            <div>
              <h4 className="m-0 text-base">{skill.title}</h4>
              <span className="text-xs text-500">{skill.owner}</span>
            </div>
          </div>
          {visibilityBody(skill)}
        </div>
        <p className="text-500 text-sm mt-1 mb-3" style={{ minHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {skill.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {skill.tags.map(tag => <Badge key={tag} value={tag} severity="secondary" className="text-xs" />)}
        </div>
        <div className="flex justify-content-between text-xs text-500">
          <span>版本 {skill.version}</span>
          <span>{skill.stepsCount} 步驟 · {skill.toolsCount} 工具</span>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="Agent 技能" />

      <Card className="card">
        <TabView>
          {/* 我的技能 */}
          <TabPanel header="我的技能" leftIcon="pi pi-user mr-2">
            <div className="flex justify-content-between align-items-center mb-3">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={searchText} onChange={e => { setSearchText(e.target.value); setFirst(0) }} placeholder="搜尋技能..." />
              </IconField>
              <Button label="新增技能" icon="pi pi-plus" onClick={handleAdd} />
            </div>
            <DataTable value={mySkills.slice(first, first + pageSize)} showGridlines emptyMessage="查無資料">
              <Column field="title" header="名稱" sortable />
              <Column field="description" header="描述" style={{ maxWidth: 250 }} body={(row: AgentSkill) => <span className="text-sm">{row.description.length > 30 ? row.description.slice(0, 30) + '...' : row.description}</span>} />
              <Column field="visibility" header="可見性" body={visibilityBody} style={{ width: 80 }} />
              <Column field="version" header="版本" style={{ width: 80 }} />
              <Column field="stepsCount" header="步驟" style={{ width: 70 }} />
              <Column field="toolsCount" header="工具" style={{ width: 70 }} />
              <Column header="操作" body={actionBody} style={{ width: 100 }} />
            </DataTable>
            <Paginator className="mt-3" first={first} rows={pageSize} totalRecords={mySkills.length} onPageChange={e => setFirst(e.first)} />
          </TabPanel>

          {/* 公開技能 */}
          <TabPanel header="公開技能" leftIcon="pi pi-globe mr-2">
            <div className="mb-3">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="搜尋公開技能..." />
              </IconField>
            </div>
            {Object.entries(publicByOwner).map(([owner, ownerSkills]) => (
              <div key={owner} className="mb-3">
                <div className="flex align-items-center gap-2 cursor-pointer mb-2 p-2 surface-100 border-round" onClick={() => toggleOwner(owner)}>
                  <i className={`pi ${expandedOwners[owner] === false ? 'pi-chevron-right' : 'pi-chevron-down'} text-sm`} />
                  <div className="flex align-items-center justify-content-center border-circle" style={{ width: 28, height: 28, backgroundColor: '#791887', color: '#fff', fontSize: 12, fontWeight: 600 }}>
                    {ownerSkills[0].ownerAvatar}
                  </div>
                  <span className="font-semibold text-sm">{owner}</span>
                  <Badge value={String(ownerSkills.length)} severity="secondary" />
                </div>
                {expandedOwners[owner] !== false && (
                  <div className="grid">
                    {ownerSkills.map(skill => skillCard(skill))}
                  </div>
                )}
              </div>
            ))}
          </TabPanel>

          {/* 共享技能 */}
          <TabPanel header="共享技能" leftIcon="pi pi-share-alt mr-2">
            <div className="mb-3">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="搜尋共享技能..." />
              </IconField>
            </div>
            <div className="grid">
              {sharedSkills.map(skill => skillCard(skill))}
            </div>
            {sharedSkills.length === 0 && <div className="text-center text-500 py-5">查無共享技能</div>}
          </TabPanel>
        </TabView>
      </Card>

      {/* 新增/編輯 Dialog */}
      <Dialog header={editing ? '編輯技能' : '新增技能'} visible={dialogVisible} style={{ width: 550 }} onHide={() => setDialogVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-outlined" onClick={() => setDialogVisible(false)} />
          <Button label="儲存" onClick={handleSave} disabled={!form.title} />
        </div>}>
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">技能名稱 *</label><InputText value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">描述</label><InputTextarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">可見性</label><Dropdown value={form.visibility} options={visibilityOptions} optionLabel="name" optionValue="code" className="w-full" onChange={e => setForm(p => ({ ...p, visibility: e.value }))} /></div>
          <div><label className="block mb-1 font-semibold text-sm">標籤（逗號分隔）</label><InputText value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="w-full" placeholder="例: 法規, RAG, 自動化" /></div>
        </div>
      </Dialog>
    </div>
  )
}

export default AgentSkills
