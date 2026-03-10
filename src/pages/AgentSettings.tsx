import { useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { InputSwitch } from 'primereact/inputswitch'
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { MultiSelect } from 'primereact/multiselect'
import { SelectButton } from 'primereact/selectbutton'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import {
  AGENT_PROVIDER_OPTIONS,
  MODEL_OPTIONS,
  MOCK_AGENT_SKILLS,
  LOG_LEVEL_OPTIONS,
  SCHEDULE_INTERVAL_OPTIONS,
  TIMEZONE_OPTIONS,
  WEBHOOK_EVENT_OPTIONS,
} from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const SCHEDULE_MODE_OPTIONS = [
  { label: '間隔', value: 'interval' },
  { label: 'Cron', value: 'cron' },
]

interface AgentSettingsState {
  // 總開關
  enabled: boolean
  // Panel 1: 基本設定
  displayName: string
  provider: string
  model: string
  // Panel 2: 執行參數
  temperature: number
  maxTokens: number
  timeout: number
  topP: number
  // Panel 3: 日誌與監控
  logLevel: string
  logRetentionDays: number
  executionRetentionCount: number
  // Panel 4: 功能開關
  autoRetry: boolean
  maxRetryCount: number
  webhookEnabled: boolean
  webhookUrl: string
  webhookEvents: string[]
  scheduleEnabled: boolean
  // Panel 5: 排程設定
  scheduleMode: string
  scheduleInterval: string
  cronExpression: string
  timezone: string
}

const DEFAULT_SETTINGS: AgentSettingsState = {
  enabled: true,
  displayName: '法規查詢助手',
  provider: 'local',
  model: 'gpt-oss-20b',
  temperature: 0.7,
  maxTokens: 4096,
  timeout: 120,
  topP: 0.9,
  logLevel: 'info',
  logRetentionDays: 30,
  executionRetentionCount: 1000,
  autoRetry: true,
  maxRetryCount: 3,
  webhookEnabled: false,
  webhookUrl: '',
  webhookEvents: ['success', 'failed', 'timeout'],
  scheduleEnabled: false,
  scheduleMode: 'interval',
  scheduleInterval: '1h',
  cronExpression: '0 0 * * *',
  timezone: 'Asia/Taipei',
}

const AgentSettings = () => {
  const { showSuccess } = useToast()
  const [settings, setSettings] = useState<AgentSettingsState>({ ...DEFAULT_SETTINGS })
  const [saving, setSaving] = useState(false)

  // 技能啟停狀態
  const [skillStates, setSkillStates] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    MOCK_AGENT_SKILLS.forEach(s => { init[s.id] = true })
    return init
  })

  const update = <K extends keyof AgentSettingsState>(key: K, value: AgentSettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const disabled = !settings.enabled

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      showSuccess('儲存成功', 'Agent 設定已更新')
    }, 800)
  }

  const handleReset = () => {
    confirmDialog({
      message: '確定要將所有設定重設為預設值嗎？',
      header: '重設確認',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認',
      rejectLabel: '取消',
      accept: () => {
        setSettings({ ...DEFAULT_SETTINGS })
        const init: Record<string, boolean> = {}
        MOCK_AGENT_SKILLS.forEach(s => { init[s.id] = true })
        setSkillStates(init)
        showSuccess('重設完成', '所有設定已恢復為預設值')
      },
    })
  }

  const visibilityBadge = (visibility: string) => {
    const map: Record<string, 'success' | 'info' | 'warning'> = {
      public: 'success', private: 'info', shared: 'warning',
    }
    const labelMap: Record<string, string> = {
      public: '公開', private: '私有', shared: '共享',
    }
    return <Badge value={labelMap[visibility] || visibility} severity={map[visibility] || 'info'} />
  }

  return (
    <div className="content-inner">
      <ConfirmDialog />
      <PageHeader funcName="Agent 設定" />

      <div className="grid">
        {/* 左欄 - Agent Profile */}
        <div className="col-12 lg:col-4">
          <Card className="card shadow-2">
            <div className="flex flex-column align-items-center gap-3 py-3">
              <div
                className="flex align-items-center justify-content-center border-circle"
                style={{ width: 80, height: 80, backgroundColor: '#791887', color: '#fff', fontSize: 32, fontWeight: 600 }}
              >
                A
              </div>
              <div className="text-center">
                <h3 className="m-0 mb-1">Admin Agent</h3>
                <p className="text-500 text-sm m-0">admin@hospital.org</p>
              </div>
              <Badge
                value={settings.enabled ? '啟用中' : '已停用'}
                severity={settings.enabled ? 'success' : 'danger'}
              />
              <div className="flex align-items-center gap-2 mt-1">
                <label className="text-sm font-semibold">{settings.enabled ? '啟用' : '停用'}</label>
                <InputSwitch checked={settings.enabled} onChange={e => update('enabled', e.value)} />
              </div>
              <div className="text-sm text-500 mt-2">
                <i className="pi pi-calendar mr-1" />加入日期：2026-01-01
              </div>
            </div>
          </Card>
        </div>

        {/* 右欄 - 設定區塊 */}
        <div className="col-12 lg:col-8">
          <Card className="card shadow-2" title="Agent 設定">
            <Accordion multiple activeIndex={[0]}>
              {/* Panel 1: 基本設定 */}
              <AccordionTab header="基本設定">
                <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">顯示名稱</label>
                    <InputText
                      value={settings.displayName}
                      onChange={e => update('displayName', e.target.value)}
                      className="w-full"
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">AI 供應商</label>
                    <Dropdown
                      value={settings.provider}
                      options={AGENT_PROVIDER_OPTIONS}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full"
                      onChange={e => update('provider', e.value)}
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">模型</label>
                    <Dropdown
                      value={settings.model}
                      options={MODEL_OPTIONS}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full"
                      onChange={e => update('model', e.value)}
                      disabled={disabled}
                    />
                  </div>
                </div>

                {/* 技能啟停狀態 */}
                <div className="mt-4">
                  <h4 className="mb-2">技能啟停狀態</h4>
                  <DataTable value={MOCK_AGENT_SKILLS} size="small" scrollable scrollHeight="300px">
                    <Column field="title" header="技能名稱" />
                    <Column
                      field="visibility"
                      header="可見性"
                      body={(row) => visibilityBadge(row.visibility)}
                      style={{ width: '100px' }}
                    />
                    <Column
                      header="狀態"
                      body={(row) => (
                        <InputSwitch
                          checked={skillStates[row.id] ?? true}
                          onChange={e => setSkillStates(prev => ({ ...prev, [row.id]: e.value }))}
                          disabled={disabled}
                        />
                      )}
                      style={{ width: '80px' }}
                    />
                  </DataTable>
                </div>
              </AccordionTab>

              {/* Panel 2: 執行參數 */}
              <AccordionTab header="執行參數">
                <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">Temperature</label>
                    <div className="flex align-items-center gap-3">
                      <Slider
                        value={settings.temperature}
                        onChange={e => update('temperature', e.value as number)}
                        min={0} max={2} step={0.1}
                        className="flex-1"
                        disabled={disabled}
                      />
                      <InputNumber
                        value={settings.temperature}
                        onValueChange={e => update('temperature', e.value ?? 0.7)}
                        min={0} max={2} step={0.1}
                        minFractionDigits={1} maxFractionDigits={1}
                        style={{ width: '80px' }}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">Max Tokens</label>
                    <InputNumber
                      value={settings.maxTokens}
                      onValueChange={e => update('maxTokens', e.value ?? 4096)}
                      min={256} max={32768}
                      className="w-full"
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">Timeout（秒）</label>
                    <InputNumber
                      value={settings.timeout}
                      onValueChange={e => update('timeout', e.value ?? 120)}
                      min={10} max={600}
                      className="w-full"
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">Top P</label>
                    <div className="flex align-items-center gap-3">
                      <Slider
                        value={settings.topP}
                        onChange={e => update('topP', e.value as number)}
                        min={0} max={1} step={0.05}
                        className="flex-1"
                        disabled={disabled}
                      />
                      <InputNumber
                        value={settings.topP}
                        onValueChange={e => update('topP', e.value ?? 0.9)}
                        min={0} max={1} step={0.05}
                        minFractionDigits={2} maxFractionDigits={2}
                        style={{ width: '80px' }}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </div>
              </AccordionTab>

              {/* Panel 3: 日誌與監控 */}
              <AccordionTab header="日誌與監控">
                <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">日誌等級</label>
                    <Dropdown
                      value={settings.logLevel}
                      options={LOG_LEVEL_OPTIONS}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full"
                      onChange={e => update('logLevel', e.value)}
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">日誌保留天數</label>
                    <InputNumber
                      value={settings.logRetentionDays}
                      onValueChange={e => update('logRetentionDays', e.value ?? 30)}
                      min={1} max={365}
                      className="w-full"
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">執行紀錄保留筆數</label>
                    <InputNumber
                      value={settings.executionRetentionCount}
                      onValueChange={e => update('executionRetentionCount', e.value ?? 1000)}
                      min={100} max={100000}
                      className="w-full"
                      disabled={disabled}
                    />
                  </div>
                </div>
              </AccordionTab>

              {/* Panel 4: 功能開關 */}
              <AccordionTab header="功能開關">
                <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
                  <div className="flex align-items-center justify-content-between">
                    <label className="text-sm font-semibold">自動重試</label>
                    <InputSwitch
                      checked={settings.autoRetry}
                      onChange={e => update('autoRetry', e.value)}
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">最大重試次數</label>
                    <InputNumber
                      value={settings.maxRetryCount}
                      onValueChange={e => update('maxRetryCount', e.value ?? 3)}
                      min={1} max={10}
                      className="w-full"
                      disabled={disabled || !settings.autoRetry}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-between">
                    <label className="text-sm font-semibold">Webhook 通知</label>
                    <InputSwitch
                      checked={settings.webhookEnabled}
                      onChange={e => update('webhookEnabled', e.value)}
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">Webhook URL</label>
                    <InputText
                      value={settings.webhookUrl}
                      onChange={e => update('webhookUrl', e.target.value)}
                      className="w-full"
                      placeholder="https://example.com/webhook"
                      disabled={disabled || !settings.webhookEnabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">觸發事件</label>
                    <MultiSelect
                      value={settings.webhookEvents}
                      options={WEBHOOK_EVENT_OPTIONS}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full"
                      onChange={e => update('webhookEvents', e.value)}
                      disabled={disabled || !settings.webhookEnabled}
                      placeholder="選擇觸發事件"
                    />
                  </div>
                  <div className="flex align-items-center justify-content-between">
                    <label className="text-sm font-semibold">排程執行</label>
                    <InputSwitch
                      checked={settings.scheduleEnabled}
                      onChange={e => update('scheduleEnabled', e.value)}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </AccordionTab>

              {/* Panel 5: 排程設定 */}
              <AccordionTab header="排程設定">
                <div className="flex flex-column gap-4" style={{ maxWidth: 500 }}>
                  <div>
                    <label className="block mb-1 font-semibold text-sm">排程模式</label>
                    <SelectButton
                      value={settings.scheduleMode}
                      options={SCHEDULE_MODE_OPTIONS}
                      onChange={e => { if (e.value) update('scheduleMode', e.value) }}
                      disabled={disabled || !settings.scheduleEnabled}
                    />
                  </div>
                  {settings.scheduleMode === 'interval' ? (
                    <div>
                      <label className="block mb-1 font-semibold text-sm">執行間隔</label>
                      <Dropdown
                        value={settings.scheduleInterval}
                        options={SCHEDULE_INTERVAL_OPTIONS}
                        optionLabel="name"
                        optionValue="code"
                        className="w-full"
                        onChange={e => update('scheduleInterval', e.value)}
                        disabled={disabled || !settings.scheduleEnabled}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block mb-1 font-semibold text-sm">Cron 表達式</label>
                      <InputText
                        value={settings.cronExpression}
                        onChange={e => update('cronExpression', e.target.value)}
                        className="w-full"
                        placeholder="0 0 * * *"
                        disabled={disabled || !settings.scheduleEnabled}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block mb-1 font-semibold text-sm">時區</label>
                    <Dropdown
                      value={settings.timezone}
                      options={TIMEZONE_OPTIONS}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full"
                      onChange={e => update('timezone', e.value)}
                      disabled={disabled || !settings.scheduleEnabled}
                    />
                  </div>
                </div>
              </AccordionTab>
            </Accordion>

            {/* 底部操作列 */}
            <div className="flex justify-content-end gap-2 mt-4">
              <Button
                label="重設為預設值"
                icon="pi pi-refresh"
                outlined
                onClick={handleReset}
                disabled={disabled}
              />
              <Button
                label="儲存全部設定"
                icon="pi pi-save"
                onClick={handleSave}
                loading={saving}
                disabled={disabled}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AgentSettings
