import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'
import { MOCK_AI_TEMPLATES, type AiTemplate } from '@/data/mockData'

const categoryOptions = [
  { label: '護理', value: 'nursing' },
  { label: '急診', value: 'emergency' },
  { label: '醫師', value: 'physician' },
  { label: '自訂', value: 'custom' },
]
const scopeOptions = [
  { label: '全部', value: 'all' },
  { label: '全院', value: 'hospital' },
  { label: '科別', value: 'department' },
  { label: '個人', value: 'personal' },
]

const categoryTag = (cat: string) => {
  const map: Record<string, { label: string; severity: 'info' | 'success' | 'warning' | 'danger' }> = {
    nursing: { label: '護理', severity: 'info' },
    emergency: { label: '急診', severity: 'danger' },
    physician: { label: '醫師', severity: 'success' },
    custom: { label: '自訂', severity: 'warning' },
  }
  const m = map[cat]
  return m ? <Tag value={m.label} severity={m.severity} /> : <Tag value={cat} />
}

const scopeTag = (scope: string) => {
  const map: Record<string, string> = { hospital: '全院', department: '科別', personal: '個人' }
  return <Tag value={map[scope] ?? scope} severity="info" className="p-tag-rounded" style={{ fontSize: '0.7rem' }} />
}

const AiTemplates = () => {
  const { showSuccess, showInfo } = useToast()
  const [templates, setTemplates] = useState<AiTemplate[]>(MOCK_AI_TEMPLATES)
  const [scopeFilter, setScopeFilter] = useState('all')

  // 新增/編輯
  const [editVisible, setEditVisible] = useState(false)
  const [editForm, setEditForm] = useState({ id: '', name: '', category: 'nursing', description: '', systemPrompt: '' })
  const [isEditing, setIsEditing] = useState(false)

  // 分享
  const [shareVisible, setShareVisible] = useState(false)
  const [shareTarget, setShareTarget] = useState<AiTemplate | null>(null)
  const [shareForm, setShareForm] = useState({ authorName: '', authorDepartment: '', authorTitle: '' })
  const [shareSuccess, setShareSuccess] = useState(false)

  const filtered = scopeFilter === 'all' ? templates : templates.filter(t => t.scope === scopeFilter)

  const openAdd = () => {
    setIsEditing(false)
    setEditForm({ id: '', name: '', category: 'nursing', description: '', systemPrompt: '' })
    setEditVisible(true)
  }

  const openEdit = (tpl: AiTemplate) => {
    setIsEditing(true)
    setEditForm({ id: tpl.id, name: tpl.name, category: tpl.category, description: tpl.description, systemPrompt: tpl.systemPrompt })
    setEditVisible(true)
  }

  const handleSave = () => {
    if (!editForm.name.trim() || !editForm.systemPrompt.trim()) { showInfo('請填寫必要欄位', '模板名稱與 System Prompt 為必填'); return }
    if (isEditing) {
      setTemplates(prev => prev.map(t => t.id === editForm.id ? { ...t, name: editForm.name, category: editForm.category as AiTemplate['category'], description: editForm.description, systemPrompt: editForm.systemPrompt } : t))
      showSuccess('已更新', '模板已更新成功')
    } else {
      const newTpl: AiTemplate = {
        id: `tpl_${Date.now()}`, name: editForm.name, scope: 'personal', category: editForm.category as AiTemplate['category'],
        description: editForm.description, systemPrompt: editForm.systemPrompt, isActive: true, isShared: false, forkCount: 0,
        attachments: [], createdAt: new Date().toISOString().slice(0, 10), createdBy: 'current_user',
      }
      setTemplates(prev => [...prev, newTpl])
      showSuccess('已新增', '模板已建立成功')
    }
    setEditVisible(false)
  }

  const handleDelete = (tpl: AiTemplate) => {
    confirmDialog({
      message: `確定要刪除模板「${tpl.name}」嗎？`,
      header: '刪除確認',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確定刪除', rejectLabel: '取消',
      accept: () => {
        setTemplates(prev => prev.filter(t => t.id !== tpl.id))
        showSuccess('已刪除', `模板「${tpl.name}」已刪除`)
      },
    })
  }

  const openShare = (tpl: AiTemplate) => {
    setShareTarget(tpl)
    setShareForm({ authorName: '', authorDepartment: '', authorTitle: '' })
    setShareSuccess(false)
    setShareVisible(true)
  }

  const handleShare = () => {
    if (!shareTarget || !shareForm.authorName.trim()) { showInfo('請填寫作者名稱', ''); return }
    const code = `SHARE${Date.now().toString(36).toUpperCase()}`
    setTemplates(prev => prev.map(t => t.id === shareTarget.id
      ? { ...t, isShared: true, shareCode: code, authorName: shareForm.authorName, authorDepartment: shareForm.authorDepartment, authorTitle: shareForm.authorTitle }
      : t
    ))
    setShareSuccess(true)
  }

  const handleUnshare = (tpl: AiTemplate) => {
    confirmDialog({
      message: `確定要取消分享「${tpl.name}」嗎？其他使用者將無法再引用此模板。`,
      header: '取消分享確認',
      acceptLabel: '確定', rejectLabel: '取消',
      accept: () => {
        setTemplates(prev => prev.map(t => t.id === tpl.id ? { ...t, isShared: false, shareCode: undefined } : t))
        showSuccess('已取消分享', `模板「${tpl.name}」已取消分享`)
      },
    })
  }

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="模板管理" />

      <Card className="card">
        <div className="flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div className="flex align-items-center gap-2">
            <Dropdown value={scopeFilter} options={scopeOptions} onChange={e => setScopeFilter(e.value)} className="w-10rem" />
            <span className="text-sm text-500">共 {filtered.length} 筆</span>
          </div>
          <Button label="新增模板" icon="pi pi-plus" className="p-button-sm" onClick={openAdd} />
        </div>

        <DataTable value={filtered} size="small" stripedRows emptyMessage="無模板資料">
          <Column header="名稱" field="name" style={{ minWidth: '180px' }} />
          <Column header="分類" body={(row: AiTemplate) => categoryTag(row.category)} style={{ width: '80px' }} />
          <Column header="範圍" body={(row: AiTemplate) => scopeTag(row.scope)} style={{ width: '80px' }} />
          <Column header="描述" field="description" style={{ minWidth: '200px' }} className="text-sm" />
          <Column header="分享" body={(row: AiTemplate) => row.isShared
            ? <span className="text-sm"><i className="pi pi-check-circle text-green-500 mr-1" />已分享 · {row.forkCount} 引用</span>
            : <span className="text-sm text-500">—</span>
          } style={{ width: '130px' }} />
          <Column header="操作" body={(row: AiTemplate) => (
            <div className="flex gap-1">
              <Button icon="pi pi-pencil" className="p-button-sm p-button-text" tooltip="編輯" onClick={() => openEdit(row)} />
              {row.isShared
                ? <Button icon="pi pi-times-circle" className="p-button-sm p-button-text p-button-warning" tooltip="取消分享" onClick={() => handleUnshare(row)} />
                : <Button icon="pi pi-share-alt" className="p-button-sm p-button-text" tooltip="分享" onClick={() => openShare(row)} />
              }
              <Button icon="pi pi-trash" className="p-button-sm p-button-text p-button-danger" tooltip="刪除" onClick={() => handleDelete(row)} />
            </div>
          )} style={{ width: '130px' }} />
        </DataTable>
      </Card>

      {/* 新增/編輯 Dialog */}
      <Dialog header={isEditing ? '編輯模板' : '新增模板'} visible={editVisible} onHide={() => setEditVisible(false)} style={{ width: '650px' }}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-text" onClick={() => setEditVisible(false)} />
          <Button label="儲存" icon="pi pi-save" onClick={handleSave} />
        </div>}
      >
        <div className="flex flex-column gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">模板名稱 *</label>
            <InputText value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">分類</label>
            <Dropdown value={editForm.category} options={categoryOptions} onChange={e => setEditForm(p => ({ ...p, category: e.value }))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">描述</label>
            <InputTextarea value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">System Prompt *</label>
            <InputTextarea value={editForm.systemPrompt} onChange={e => setEditForm(p => ({ ...p, systemPrompt: e.target.value }))} rows={10} className="w-full" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
            <div className="text-xs text-500 mt-1"><i className="pi pi-info-circle mr-1" />可用變數：{'{{patient_data}}'}, {'{{additional_info}}'}</div>
          </div>
        </div>
      </Dialog>

      {/* 分享 Dialog */}
      <Dialog header="分享模板" visible={shareVisible} onHide={() => setShareVisible(false)} style={{ width: '450px' }}
        footer={!shareSuccess ? <div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-text" onClick={() => setShareVisible(false)} />
          <Button label="確認分享" icon="pi pi-share-alt" onClick={handleShare} />
        </div> : <Button label="關閉" onClick={() => setShareVisible(false)} />}
      >
        {!shareSuccess ? (
          <div className="flex flex-column gap-3">
            <p className="mt-0">您即將分享：<strong>{shareTarget?.name}</strong></p>
            <div>
              <label className="block text-sm font-semibold mb-1">顯示名稱 *</label>
              <InputText value={shareForm.authorName} onChange={e => setShareForm(p => ({ ...p, authorName: e.target.value }))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">所屬科別</label>
              <InputText value={shareForm.authorDepartment} onChange={e => setShareForm(p => ({ ...p, authorDepartment: e.target.value }))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">職稱</label>
              <InputText value={shareForm.authorTitle} onChange={e => setShareForm(p => ({ ...p, authorTitle: e.target.value }))} className="w-full" />
            </div>
            <div className="text-sm text-orange-500"><i className="pi pi-exclamation-triangle mr-1" />分享後其他使用者可以引用此模板</div>
          </div>
        ) : (
          <div className="text-center py-3">
            <i className="pi pi-check-circle text-green-500 text-5xl mb-3" style={{ display: 'block' }} />
            <div className="font-bold text-lg mb-2">分享成功！</div>
            <div className="text-sm text-500 mb-3">您可以將分享碼提供給同事</div>
            <div className="p-2 surface-100 border-round text-center font-bold" style={{ fontSize: '1.1rem', letterSpacing: 2 }}>
              {templates.find(t => t.id === shareTarget?.id)?.shareCode}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AiTemplates
