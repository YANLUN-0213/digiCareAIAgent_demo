import { useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { AGENT_PROVIDER_OPTIONS, MODEL_OPTIONS } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const AgentSettings = () => {
  const { showSuccess } = useToast()
  const [displayName, setDisplayName] = useState('法規查詢助手')
  const [provider, setProvider] = useState('local')
  const [model, setModel] = useState('gpt-oss-20b')
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      showSuccess('儲存成功', 'Agent 設定已更新')
    }, 800)
  }

  return (
    <div className="content-inner">
      <PageHeader funcName="Agent 設定" />

      <div className="grid">
        {/* 左欄 - 個人資訊 */}
        <div className="col-12 lg:col-4">
          <Card className="card shadow-2">
            <div className="flex flex-column align-items-center gap-3 py-3">
              <div className="flex align-items-center justify-content-center border-circle" style={{ width: 80, height: 80, backgroundColor: '#791887', color: '#fff', fontSize: 32, fontWeight: 600 }}>
                A
              </div>
              <div className="text-center">
                <h3 className="m-0 mb-1">Admin Agent</h3>
                <p className="text-500 text-sm m-0">admin@hospital.org</p>
              </div>
              <Badge value="啟用中" severity="success" />
              <div className="text-sm text-500 mt-2">
                <i className="pi pi-calendar mr-1" />加入日期：2026-01-01
              </div>
            </div>
          </Card>
        </div>

        {/* 右欄 - 設定表單 */}
        <div className="col-12 lg:col-8">
          <Card className="card shadow-2" title="Agent 設定">
            <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
              <div>
                <label className="block mb-1 font-semibold text-sm">顯示名稱</label>
                <InputText value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full" />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm">AI 供應商</label>
                <Dropdown value={provider} options={AGENT_PROVIDER_OPTIONS} optionLabel="name" optionValue="code" className="w-full" onChange={e => setProvider(e.value)} />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm">模型</label>
                <Dropdown value={model} options={MODEL_OPTIONS} optionLabel="name" optionValue="code" className="w-full" onChange={e => setModel(e.value)} />
              </div>
              <Button label="儲存設定" icon="pi pi-save" className="w-auto align-self-start mt-2" onClick={handleSave} loading={saving} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AgentSettings
