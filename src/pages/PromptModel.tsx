import { useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Slider } from 'primereact/slider'
import { InputSwitch } from 'primereact/inputswitch'
import { TabView, TabPanel } from 'primereact/tabview'
import { MOCK_PROMPTS, MODEL_OPTIONS, PromptTemplate } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const PromptModel = () => {
  const [prompts, setPrompts] = useState<PromptTemplate[]>(MOCK_PROMPTS)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editing, setEditing] = useState<PromptTemplate | null>(null)
  const [form, setForm] = useState({ name: '', type: 'system' as 'system' | 'user', content: '', model: 'gpt-oss-20b', temperature: 0.1, isActive: true })
  const { showSuccess } = useToast()

  const handleAdd = () => {
    setEditing(null)
    setForm({ name: '', type: 'system', content: '', model: 'gpt-oss-20b', temperature: 0.1, isActive: true })
    setDialogVisible(true)
  }

  const handleEdit = (p: PromptTemplate) => {
    setEditing(p)
    setForm({ name: p.name, type: p.type, content: p.content, model: p.model, temperature: p.temperature, isActive: p.isActive })
    setDialogVisible(true)
  }

  const handleSave = () => {
    if (editing) {
      setPrompts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form, updatedAt: new Date().toISOString().slice(0, 10) } : p))
      showSuccess('更新成功', `已更新「${form.name}」`)
    } else {
      const newP: PromptTemplate = { id: String(Date.now()), ...form, updatedAt: new Date().toISOString().slice(0, 10) }
      setPrompts(prev => [...prev, newP])
      showSuccess('新增成功', `已新增「${form.name}」`)
    }
    setDialogVisible(false)
  }

  const typeBody = (row: PromptTemplate) => <Badge value={row.type === 'system' ? 'System' : 'User'} severity={row.type === 'system' ? 'info' : 'warning'} />
  const activeBody = (row: PromptTemplate) => <Badge value={row.isActive ? '啟用' : '停用'} severity={row.isActive ? 'success' : 'secondary'} />
  const modelBody = (row: PromptTemplate) => {
    const m = MODEL_OPTIONS.find(o => o.code === row.model)
    return <span className="text-sm">{m?.name || row.model}</span>
  }

  const actionBody = (row: PromptTemplate) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm" onClick={() => handleEdit(row)} />
      <Button icon="pi pi-copy" className="p-button-sm p-button-outlined" onClick={() => {
        const clone = { ...row, id: String(Date.now()), name: row.name + ' (副本)', isActive: false }
        setPrompts(prev => [...prev, clone])
        showSuccess('已複製', clone.name)
      }} />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => {
        setPrompts(prev => prev.filter(p => p.id !== row.id))
        showSuccess('已刪除', row.name)
      }} />
    </div>
  )

  const typeOptions = [{ name: 'System Prompt', code: 'system' }, { name: 'User Prompt', code: 'user' }]

  return (
    <div className="content-inner">
      <PageHeader funcName="Prompt 與模型管理" />

      <Card className="card">
        <TabView>
          {/* Prompt 管理 */}
          <TabPanel header="Prompt 管理" leftIcon="pi pi-code mr-2">
            <div className="flex justify-content-end mb-3">
              <Button label="新增 Prompt" icon="pi pi-plus" onClick={handleAdd} />
            </div>
            <DataTable value={prompts} showGridlines emptyMessage="無資料">
              <Column field="name" header="名稱" sortable />
              <Column field="type" header="類型" body={typeBody} style={{ width: 100 }} />
              <Column field="model" header="模型" body={modelBody} style={{ width: 200 }} />
              <Column field="temperature" header="Temperature" style={{ width: 120 }} />
              <Column field="isActive" header="狀態" body={activeBody} style={{ width: 80 }} />
              <Column field="updatedAt" header="更新日期" sortable style={{ width: 120 }} />
              <Column header="操作" body={actionBody} style={{ width: 150 }} />
            </DataTable>
          </TabPanel>

          {/* 模型狀態 */}
          <TabPanel header="模型狀態" leftIcon="pi pi-server mr-2">
            <div className="grid">
              {[
                { name: 'GPT-OSS 20B', type: '地端', status: 'online', gpu: '45%', latency: '320ms', desc: '主要推論模型，適用於法規查詢' },
                { name: 'GPT-OSS 120B', type: '地端', status: 'online', gpu: '78%', latency: '890ms', desc: '高精度模型，適用於複雜推理' },
                { name: 'LLaMA-Vision 90B', type: '地端', status: 'standby', gpu: '0%', latency: '-', desc: '多模態模型，支援圖片/流程圖解析' },
                { name: 'Reranker Model', type: '地端', status: 'online', gpu: '12%', latency: '45ms', desc: '重排序模型，提升檢索精準度' },
              ].map((m, i) => (
                <div key={i} className="col-12 md:col-6">
                  <Card className="shadow-2">
                    <div className="flex justify-content-between align-items-start mb-2">
                      <div>
                        <h4 className="m-0">{m.name}</h4>
                        <p className="text-500 text-sm mt-1 mb-0">{m.desc}</p>
                      </div>
                      <Badge value={m.status === 'online' ? '運行中' : '待命'} severity={m.status === 'online' ? 'success' : 'secondary'} />
                    </div>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span><i className="pi pi-server mr-1" />{m.type}</span>
                      <span><i className="pi pi-chart-line mr-1" />GPU {m.gpu}</span>
                      <span><i className="pi pi-clock mr-1" />延遲 {m.latency}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabView>
      </Card>

      {/* 編輯 Dialog */}
      <Dialog header={editing ? '編輯 Prompt' : '新增 Prompt'} visible={dialogVisible} style={{ width: 650 }} onHide={() => setDialogVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-outlined" onClick={() => setDialogVisible(false)} />
          <Button label="儲存" onClick={handleSave} disabled={!form.name || !form.content} />
        </div>}>
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">名稱 *</label><InputText value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full" /></div>
          <div className="grid">
            <div className="col-6"><label className="block mb-1 font-semibold text-sm">類型</label><Dropdown value={form.type} options={typeOptions} optionLabel="name" optionValue="code" className="w-full" onChange={e => setForm(p => ({ ...p, type: e.value }))} /></div>
            <div className="col-6"><label className="block mb-1 font-semibold text-sm">模型</label><Dropdown value={form.model} options={MODEL_OPTIONS} optionLabel="name" optionValue="code" className="w-full" onChange={e => setForm(p => ({ ...p, model: e.value }))} /></div>
          </div>
          <div><label className="block mb-1 font-semibold text-sm">Prompt 內容 *</label><InputTextarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={8} className="w-full" style={{ fontFamily: 'monospace', fontSize: 13 }} /></div>
          <div className="grid align-items-center">
            <div className="col-8">
              <label className="block mb-1 font-semibold text-sm">Temperature: {form.temperature}</label>
              <Slider value={form.temperature * 100} onChange={e => setForm(p => ({ ...p, temperature: (e.value as number) / 100 }))} max={100} className="w-full" />
            </div>
            <div className="col-4 flex align-items-center gap-2">
              <label className="font-semibold text-sm">啟用</label>
              <InputSwitch checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.value }))} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default PromptModel
