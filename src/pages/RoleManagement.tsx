import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Badge } from 'primereact/badge'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { MOCK_ROLES, PERMISSION_OPTIONS, RoleRecord } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const RoleManagement = () => {
  const [roles, setRoles] = useState<RoleRecord[]>(MOCK_ROLES)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editingRole, setEditingRole] = useState<RoleRecord | null>(null)
  const [form, setForm] = useState({ name: '', description: '', permissions: [] as string[] })
  const { showSuccess } = useToast()

  const handleAdd = () => {
    setEditingRole(null)
    setForm({ name: '', description: '', permissions: [] })
    setDialogVisible(true)
  }

  const handleEdit = (r: RoleRecord) => {
    setEditingRole(r)
    setForm({ name: r.name, description: r.description, permissions: [...r.permissions] })
    setDialogVisible(true)
  }

  const handleSave = () => {
    if (editingRole) {
      setRoles(prev => prev.map(r => r.id === editingRole.id ? { ...r, name: form.name, description: form.description, permissions: form.permissions } : r))
      showSuccess('編輯成功', `已更新角色「${form.name}」`)
    } else {
      const newRole: RoleRecord = { id: String(Date.now()), name: form.name, description: form.description, permissions: form.permissions, userCount: 0 }
      setRoles(prev => [...prev, newRole])
      showSuccess('新增成功', `已新增角色「${form.name}」`)
    }
    setDialogVisible(false)
  }

  const handleDelete = (r: RoleRecord) => {
    confirmDialog({
      message: `是否確認刪除角色「${r.name}」？`, header: '刪除確認', icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認', rejectLabel: '取消',
      accept: () => { setRoles(prev => prev.filter(x => x.id !== r.id)); showSuccess('刪除成功', `已刪除角色「${r.name}」`) },
    })
  }

  const togglePerm = (key: string) => {
    setForm(p => ({ ...p, permissions: p.permissions.includes(key) ? p.permissions.filter(k => k !== key) : [...p.permissions, key] }))
  }

  const onInlineToggle = (roleId: string, key: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id !== roleId) return r
      const perms = r.permissions.includes(key) ? r.permissions.filter(p => p !== key) : [...r.permissions, key]
      return { ...r, permissions: perms }
    }))
  }

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="角色管理" />

      <Card className="card">
        <div className="flex justify-content-end mb-3">
          <Button label="新增角色" icon="pi pi-plus" onClick={handleAdd} />
        </div>

        <div className="grid">
          {roles.map(role => (
            <div key={role.id} className="col-12 md:col-6 lg:col-4">
              <Card className="shadow-2 h-full">
                <div className="mb-3">
                  <h3 className="mt-0 mb-1">{role.name}</h3>
                  <p className="text-500 text-sm mt-0 mb-2">{role.description}</p>
                  <Badge value={`${role.userCount} 位使用者`} severity="info" />
                </div>

                <div className="mb-3">
                  <label className="block font-semibold text-sm mb-2">權限設定</label>
                  <div className="flex flex-column gap-2">
                    {PERMISSION_OPTIONS.map(p => (
                      <div key={p.key} className="flex align-items-center gap-2">
                        <Checkbox inputId={`${role.id}-${p.key}`} checked={role.permissions.includes(p.key)} onChange={() => onInlineToggle(role.id, p.key)} />
                        <label htmlFor={`${role.id}-${p.key}`} className="text-sm cursor-pointer">{p.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button label="編輯" icon="pi pi-pencil" className="p-button-outlined p-button-sm" onClick={() => handleEdit(role)} />
                  <Button label="刪除" icon="pi pi-trash" className="p-button-outlined p-button-danger p-button-sm" onClick={() => handleDelete(role)} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>

      <Dialog header={editingRole ? '編輯角色' : '新增角色'} visible={dialogVisible} style={{ width: '450px' }} onHide={() => setDialogVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" icon="pi pi-times" className="p-button-outlined" onClick={() => setDialogVisible(false)} />
          <Button label="儲存" icon="pi pi-check" onClick={handleSave} disabled={!form.name} />
        </div>}
      >
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">角色名稱 *</label><InputText value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">描述</label><InputTextarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full" /></div>
          <div>
            <label className="block mb-2 font-semibold text-sm">權限</label>
            <div className="flex flex-column gap-2">
              {PERMISSION_OPTIONS.map(p => (
                <div key={p.key} className="flex align-items-center gap-2">
                  <Checkbox inputId={`dlg-${p.key}`} checked={form.permissions.includes(p.key)} onChange={() => togglePerm(p.key)} />
                  <label htmlFor={`dlg-${p.key}`} className="text-sm cursor-pointer">{p.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default RoleManagement
