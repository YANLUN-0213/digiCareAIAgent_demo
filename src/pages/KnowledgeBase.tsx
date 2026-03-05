import { useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ProgressBar } from 'primereact/progressbar'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { MOCK_KNOWLEDGE_BASES, MOCK_KB_DOCUMENTS, KnowledgeBase as KB, KBDocument } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const KnowledgeBase = () => {
  const [knowledgeBases, setKnowledgeBases] = useState<KB[]>(MOCK_KNOWLEDGE_BASES)
  const [selectedKB, setSelectedKB] = useState<KB | null>(null)
  const [documents, setDocuments] = useState<KBDocument[]>(MOCK_KB_DOCUMENTS)
  const [addKBVisible, setAddKBVisible] = useState(false)
  const [editKBVisible, setEditKBVisible] = useState(false)
  const [uploadVisible, setUploadVisible] = useState(false)
  const [kbForm, setKbForm] = useState({ name: '', description: '' })
  const [editingKB, setEditingKB] = useState<KB | null>(null)
  const { showSuccess } = useToast()

  const statusBody = (row: KB) => {
    const map: Record<string, { label: string; severity: 'success' | 'warning' | 'danger' }> = {
      active: { label: '運行中', severity: 'success' },
      processing: { label: '處理中', severity: 'warning' },
      error: { label: '錯誤', severity: 'danger' },
    }
    const s = map[row.status]
    return <Badge value={s.label} severity={s.severity} />
  }

  const docStatusBody = (row: KBDocument) => {
    const map: Record<string, { label: string; severity: 'success' | 'warning' | 'danger' }> = {
      completed: { label: '完成', severity: 'success' },
      processing: { label: '處理中', severity: 'warning' },
      error: { label: '錯誤', severity: 'danger' },
    }
    const s = map[row.status]
    return <Badge value={s.label} severity={s.severity} />
  }

  const handleSelectKB = (kb: KB) => setSelectedKB(kb)

  const kbActionBody = (row: KB) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" className="p-button-sm" onClick={() => handleSelectKB(row)} tooltip="檢視文件" />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => {
        confirmDialog({
          message: `是否刪除知識庫「${row.name}」？`, header: '刪除確認', icon: 'pi pi-exclamation-triangle',
          acceptLabel: '確認', rejectLabel: '取消',
          accept: () => { setKnowledgeBases(prev => prev.filter(k => k.id !== row.id)); showSuccess('已刪除', row.name) },
        })
      }} />
    </div>
  )

  const handleAddKB = () => {
    const newKB: KB = {
      id: String(Date.now()), name: kbForm.name, description: kbForm.description,
      docCount: 0, chunkCount: 0, status: 'active', updatedAt: new Date().toISOString().slice(0, 10), version: 'v1.0',
    }
    setKnowledgeBases(prev => [...prev, newKB])
    showSuccess('新增成功', `已建立知識庫「${kbForm.name}」`)
    setAddKBVisible(false)
    setKbForm({ name: '', description: '' })
  }

  const handleOpenEdit = (kb: KB) => {
    setEditingKB(kb)
    setKbForm({ name: kb.name, description: kb.description })
    setEditKBVisible(true)
  }

  const handleEditKB = () => {
    if (!editingKB) return
    setKnowledgeBases(prev => prev.map(k => k.id === editingKB.id ? { ...k, name: kbForm.name, description: kbForm.description, updatedAt: new Date().toISOString().slice(0, 10) } : k))
    if (selectedKB?.id === editingKB.id) {
      setSelectedKB(prev => prev ? { ...prev, name: kbForm.name, description: kbForm.description } : null)
    }
    showSuccess('更新成功', `已更新知識庫「${kbForm.name}」`)
    setEditKBVisible(false)
    setEditingKB(null)
    setKbForm({ name: '', description: '' })
  }

  const handleUpload = () => {
    if (!selectedKB) return
    const newDoc: KBDocument = {
      id: String(Date.now()), kbId: selectedKB.id, fileName: '新上傳文件_' + new Date().toISOString().slice(5, 10) + '.pdf',
      fileType: 'PDF', pages: 0, chunks: 0, status: 'processing', uploadedAt: new Date().toISOString().slice(0, 10), uploadedBy: 'Admin',
    }
    setDocuments(prev => [...prev, newDoc])
    showSuccess('上傳成功', '文件已加入處理佇列')
    setUploadVisible(false)
  }

  const kbDocs = selectedKB ? documents.filter(d => d.kbId === selectedKB.id) : []

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="知識庫管理" />

      {/* 知識庫統計 */}
      <div className="grid mb-3">
        {knowledgeBases.map(kb => (
          <div key={kb.id} className="col-12 md:col-6 lg:col-3">
            <Card className={`card shadow-2 cursor-pointer ${selectedKB?.id === kb.id ? 'border-primary' : ''}`}
              style={{ borderLeft: selectedKB?.id === kb.id ? '4px solid var(--primary_color)' : '4px solid transparent' }}
              onClick={() => handleSelectKB(kb)}>
              <div className="flex justify-content-between align-items-start mb-2">
                <h4 className="m-0 text-base">{kb.name}</h4>
                {statusBody(kb)}
              </div>
              <p className="text-500 text-sm mt-1 mb-3" style={{ minHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{kb.description}</p>
              <div className="flex justify-content-between text-sm">
                <span><i className="pi pi-file mr-1" />{kb.docCount} 份文件</span>
                <span><i className="pi pi-th-large mr-1" />{kb.chunkCount} 區塊</span>
              </div>
              <div className="flex justify-content-between text-xs text-500 mt-2">
                <span>版本 {kb.version}</span>
                <span>更新 {kb.updatedAt}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 操作列 */}
      <Card className="card">
        <div className="flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">{selectedKB ? `${selectedKB.name} - 文件列表` : '請選擇知識庫'}</h3>
          <div className="flex gap-2">
            <Button label="新增知識庫" icon="pi pi-plus" className="p-button-outlined" onClick={() => { setKbForm({ name: '', description: '' }); setAddKBVisible(true) }} />
            {selectedKB && <Button label="編輯知識庫" icon="pi pi-pencil" className="p-button-outlined" onClick={() => handleOpenEdit(selectedKB)} />}
            {selectedKB && <Button label="上傳文件" icon="pi pi-upload" onClick={() => setUploadVisible(true)} />}
          </div>
        </div>

        {selectedKB ? (
          <>
            <DataTable value={kbDocs} showGridlines emptyMessage="尚無文件">
              <Column field="fileName" header="檔案名稱" sortable />
              <Column field="fileType" header="類型" style={{ width: 80 }} />
              <Column field="pages" header="頁數" style={{ width: 80 }} />
              <Column field="chunks" header="區塊數" style={{ width: 90 }} body={(row: KBDocument) => row.status === 'processing' ? <ProgressBar mode="indeterminate" style={{ height: 6 }} /> : row.chunks} />
              <Column field="status" header="狀態" body={docStatusBody} style={{ width: 90 }} />
              <Column field="uploadedBy" header="上傳者" style={{ width: 100 }} />
              <Column field="uploadedAt" header="上傳時間" sortable style={{ width: 120 }} />
              <Column header="操作" style={{ width: 100 }} body={(row: KBDocument) => (
                <div className="flex gap-2">
                  <Button icon="pi pi-eye" className="p-button-sm" tooltip="檢視" />
                  <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => {
                    setDocuments(prev => prev.filter(d => d.id !== row.id))
                    showSuccess('已刪除', row.fileName)
                  }} />
                </div>
              )} />
            </DataTable>
          </>
        ) : (
          <div className="text-center text-500 py-5"><i className="pi pi-database text-4xl mb-3 block" /><p>請點選上方知識庫卡片以檢視文件</p></div>
        )}
      </Card>

      {/* 新增知識庫 Dialog */}
      <Dialog header="新增知識庫" visible={addKBVisible} style={{ width: 450 }} onHide={() => setAddKBVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-outlined" onClick={() => setAddKBVisible(false)} />
          <Button label="建立" onClick={handleAddKB} disabled={!kbForm.name} />
        </div>}>
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">知識庫名稱 *</label><InputText value={kbForm.name} onChange={e => setKbForm(p => ({ ...p, name: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">描述</label><InputTextarea value={kbForm.description} onChange={e => setKbForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full" /></div>
        </div>
      </Dialog>

      {/* 編輯知識庫 Dialog */}
      <Dialog header="編輯知識庫" visible={editKBVisible} style={{ width: 450 }} onHide={() => setEditKBVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-outlined" onClick={() => setEditKBVisible(false)} />
          <Button label="儲存" onClick={handleEditKB} disabled={!kbForm.name} />
        </div>}>
        <div className="flex flex-column gap-3 pt-3">
          <div><label className="block mb-1 font-semibold text-sm">知識庫名稱 *</label><InputText value={kbForm.name} onChange={e => setKbForm(p => ({ ...p, name: e.target.value }))} className="w-full" /></div>
          <div><label className="block mb-1 font-semibold text-sm">描述</label><InputTextarea value={kbForm.description} onChange={e => setKbForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full" /></div>
        </div>
      </Dialog>

      {/* 上傳文件 Dialog */}
      <Dialog header="上傳文件" visible={uploadVisible} style={{ width: 450 }} onHide={() => setUploadVisible(false)} draggable={false}
        footer={<div className="flex justify-content-end gap-2">
          <Button label="取消" className="p-button-outlined" onClick={() => setUploadVisible(false)} />
          <Button label="上傳" icon="pi pi-upload" onClick={handleUpload} />
        </div>}>
        <div className="flex flex-column gap-3 pt-3">
          <div className="flex flex-column align-items-center justify-content-center border-2 border-dashed surface-border border-round p-5 cursor-pointer" onClick={() => showSuccess('提示', 'Demo 模式，點擊即模擬上傳')}>
            <i className="pi pi-cloud-upload text-4xl text-400 mb-2" />
            <p className="text-sm text-500 m-0">點擊或拖曳檔案至此處上傳</p>
            <p className="text-xs text-400 mt-1">支援 PDF、Word、Excel 格式</p>
          </div>
          <small className="text-500">目標知識庫：{selectedKB?.name}</small>
        </div>
      </Dialog>
    </div>
  )
}

export default KnowledgeBase
