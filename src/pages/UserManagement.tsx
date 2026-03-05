import { useMemo, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator } from 'primereact/paginator'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { MOCK_USERS, ROLE_FILTER_OPTIONS, DEPT_FILTER_OPTIONS, UserRecord } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const STATUS_OPTIONS = [
  { name: '全部', code: '' },
  { name: '啟用', code: 'active' },
  { name: '停用', code: 'inactive' },
]

const UserManagement = () => {
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USERS)
  const [keyword, setKeyword] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [first, setFirst] = useState(0)
  const pageSize = 10
  const { showSuccess } = useToast()

  const [editVisible, setEditVisible] = useState(false)
  const [editUser, setEditUser] = useState<UserRecord | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', department: '' })

  const filtered = useMemo(() => {
    return users.filter(u => {
      const kw = !keyword || u.name.includes(keyword) || u.email.toLowerCase().includes(keyword.toLowerCase())
      const role = !selectedRole || u.role === selectedRole
      const dept = !selectedDept || u.department === selectedDept
      const status = !selectedStatus || u.status === selectedStatus
      return kw && role && dept && status
    })
  }, [users, keyword, selectedRole, selectedDept, selectedStatus])

  const paged = useMemo(() => filtered.slice(first, first + pageSize), [filtered, first])

  const handleClear = () => { setKeyword(''); setSelectedRole(''); setSelectedDept(''); setSelectedStatus(''); setFirst(0) }

  const handleEdit = (u: UserRecord) => {
    setEditUser(u)
    setEditForm({ name: u.name, email: u.email, role: u.role, department: u.department })
    setEditVisible(true)
  }

  const handleSaveEdit = () => {
    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...editForm } : u))
      showSuccess('編輯成功', `已更新 ${editForm.name} 的資料`)
      setEditVisible(false)
    }
  }

  const handleDelete = (u: UserRecord) => {
    confirmDialog({
      message: `是否確認刪除「${u.name}」？`,
      header: '刪除確認',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認',
      rejectLabel: '取消',
      accept: () => {
        setUsers(prev => prev.filter(x => x.id !== u.id))
        showSuccess('刪除成功', `已刪除 ${u.name}`)
      },
    })
  }

  const handleAdd = () => {
    const newId = String(Math.max(...users.map(u => Number(u.id))) + 1)
    const nu: UserRecord = {
      id: newId, name: '新使用者', email: `user${newId}@hospital.org`,
      role: '一般使用者', status: 'active', department: '資訊部',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setUsers(prev => [nu, ...prev])
    showSuccess('新增成功', '已新增使用者')
  }

  const statusBody = (row: UserRecord) => (
    <Badge value={row.status === 'active' ? '啟用' : '停用'} severity={row.status === 'active' ? 'success' : 'secondary'} />
  )

  const actionBody = (row: UserRecord) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm" onClick={() => handleEdit(row)} />
      <Button icon="pi pi-trash" severity="danger" className="p-button-sm" onClick={() => handleDelete(row)} />
    </div>
  )

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="使用者管理" />

      <Card className="card">
        <div className="flex align-items-end flex-wrap gap-2">
          <div className="mr-2">
            <label className="block mb-1">部門</label>
            <Dropdown value={selectedDept} options={DEPT_FILTER_OPTIONS} optionLabel="name" optionValue="code" placeholder="篩選部門" className="w-10rem" onChange={e => setSelectedDept(e.value)} />
          </div>
          <div className="mr-2">
            <label className="block mb-1">角色</label>
            <Dropdown value={selectedRole} options={ROLE_FILTER_OPTIONS} optionLabel="name" optionValue="code" placeholder="篩選角色" className="w-10rem" onChange={e => setSelectedRole(e.value)} />
          </div>
          <div className="mr-2">
            <label className="block mb-1">狀態</label>
            <Dropdown value={selectedStatus} options={STATUS_OPTIONS} optionLabel="name" optionValue="code" placeholder="篩選狀態" className="w-10rem" onChange={e => setSelectedStatus(e.value)} />
          </div>
          <div className="mr-2">
            <label className="block mb-1">關鍵字</label>
            <InputText value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') setFirst(0) }} placeholder="搜尋姓名或 Email" className="w-15rem" />
          </div>
          <div className="flex gap-2">
            <Button label="搜尋" icon="pi pi-search" onClick={() => setFirst(0)} />
            <Button label="清除" icon="pi pi-times" className="p-button-outlined" onClick={handleClear} />
            <Button label="新增" icon="pi pi-plus" onClick={handleAdd} />
          </div>
        </div>
      </Card>

      <Card className="card">
        <DataTable value={paged} resizableColumns showGridlines emptyMessage="查無資料">
          <Column field="name" header="姓名" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="department" header="部門" />
          <Column field="role" header="角色" />
          <Column field="status" header="狀態" body={statusBody} style={{ width: '80px' }} />
          <Column field="createdAt" header="建立時間" sortable />
          <Column header="操作" body={actionBody} style={{ width: '120px' }} />
        </DataTable>
        <div className="flex justify-content-between align-items-center">
          <p className="text-sm">總筆數：{filtered.length} 筆</p>
          <Paginator className="mt-3" first={first} rows={pageSize} totalRecords={filtered.length} onPageChange={e => setFirst(e.first)} />
        </div>
      </Card>

      <Dialog header="編輯使用者" visible={editVisible} style={{ width: '500px' }} onHide={() => setEditVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" icon="pi pi-times" className="p-button-outlined" onClick={() => setEditVisible(false)} />
          <Button label="儲存" icon="pi pi-check" onClick={handleSaveEdit} />
        </div>}
      >
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">姓名</label><InputText value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">Email</label><InputText value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">角色</label><Dropdown value={editForm.role} options={ROLE_FILTER_OPTIONS.filter(r => r.code)} optionLabel="name" optionValue="code" className="w-full" onChange={e => setEditForm(p => ({ ...p, role: e.value }))} /></div>
          <div><label className="block mb-1 font-semibold text-sm">部門</label><Dropdown value={editForm.department} options={DEPT_FILTER_OPTIONS.filter(d => d.code)} optionLabel="name" optionValue="code" className="w-full" onChange={e => setEditForm(p => ({ ...p, department: e.value }))} /></div>
        </div>
      </Dialog>
    </div>
  )
}

export default UserManagement
