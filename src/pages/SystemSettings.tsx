import { useState } from 'react'
import { Card } from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const langOpts = [
  { name: '繁體中文', code: 'zh-TW' },
  { name: 'English', code: 'en-US' },
  { name: '日本語', code: 'ja-JP' },
]

const tzOpts = [
  { name: 'Asia/Taipei (UTC+8)', code: 'Asia/Taipei' },
  { name: 'Asia/Tokyo (UTC+9)', code: 'Asia/Tokyo' },
  { name: 'America/New_York (UTC-5)', code: 'America/New_York' },
]

const SystemSettings = () => {
  const { showSuccess } = useToast()

  const [siteName, setSiteName] = useState('DigiCare 管理後台')
  const [language, setLanguage] = useState('zh-TW')
  const [timezone, setTimezone] = useState('Asia/Taipei')

  const [maxLoginAttempts, setMaxLoginAttempts] = useState<number | null>(5)
  const [pwdMinLen, setPwdMinLen] = useState<number | null>(8)
  const [requireUpper, setRequireUpper] = useState(true)
  const [requireNum, setRequireNum] = useState(true)
  const [requireSpecial, setRequireSpecial] = useState(false)
  const [enable2FA, setEnable2FA] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState<number | null>(30)

  const [emailNotify, setEmailNotify] = useState(true)
  const [loginNotify, setLoginNotify] = useState(true)
  const [errorNotify, setErrorNotify] = useState(true)
  const [reportNotify, setReportNotify] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('admin@hospital.org')

  const save = (section: string) => showSuccess('儲存成功', `${section}設定已更新`)

  return (
    <div className="content-inner">
      <PageHeader funcName="系統設定" />

      <Card className="card">
        <TabView>
          <TabPanel header="一般設定" leftIcon="pi pi-cog mr-2">
            <div className="flex flex-column gap-4 p-3" style={{ maxWidth: 600 }}>
              <div><label className="block mb-1 font-semibold text-sm">網站名稱</label><InputText value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full" /></div>
              <div><label className="block mb-1 font-semibold text-sm">系統語言</label><Dropdown value={language} options={langOpts} optionLabel="name" optionValue="code" className="w-full" onChange={e => setLanguage(e.value)} /></div>
              <div><label className="block mb-1 font-semibold text-sm">時區</label><Dropdown value={timezone} options={tzOpts} optionLabel="name" optionValue="code" className="w-full" onChange={e => setTimezone(e.value)} /></div>
              <div>
                <label className="block mb-1 font-semibold text-sm">Logo 上傳</label>
                <div className="flex align-items-center gap-3">
                  <div className="flex align-items-center justify-content-center border-1 surface-border border-round" style={{ width: 80, height: 80 }}>
                    <i className="pi pi-image text-4xl text-400" />
                  </div>
                  <Button label="選擇檔案" icon="pi pi-upload" className="p-button-outlined" onClick={() => showSuccess('提示', 'Demo 模式，此功能僅供展示')} />
                </div>
              </div>
              <Divider />
              <Button label="儲存設定" icon="pi pi-save" className="w-auto align-self-start" onClick={() => save('一般')} />
            </div>
          </TabPanel>

          <TabPanel header="安全性" leftIcon="pi pi-lock mr-2">
            <div className="flex flex-column gap-4 p-3" style={{ maxWidth: 600 }}>
              <div><label className="block mb-1 font-semibold text-sm">最大登入嘗試次數</label><InputNumber value={maxLoginAttempts} onValueChange={e => setMaxLoginAttempts(e.value ?? null)} min={1} max={10} className="w-full" /></div>
              <div><label className="block mb-1 font-semibold text-sm">密碼最小長度</label><InputNumber value={pwdMinLen} onValueChange={e => setPwdMinLen(e.value ?? null)} min={6} max={32} className="w-full" /></div>
              <div><label className="block mb-1 font-semibold text-sm">Session 逾時（分鐘）</label><InputNumber value={sessionTimeout} onValueChange={e => setSessionTimeout(e.value ?? null)} min={5} max={120} className="w-full" /></div>
              <Divider align="left"><span className="text-sm font-semibold">密碼策略</span></Divider>
              <div className="flex flex-column gap-3">
                <div className="flex align-items-center justify-content-between"><label className="text-sm">需包含大寫字母</label><InputSwitch checked={requireUpper} onChange={e => setRequireUpper(e.value)} /></div>
                <div className="flex align-items-center justify-content-between"><label className="text-sm">需包含數字</label><InputSwitch checked={requireNum} onChange={e => setRequireNum(e.value)} /></div>
                <div className="flex align-items-center justify-content-between"><label className="text-sm">需包含特殊字元</label><InputSwitch checked={requireSpecial} onChange={e => setRequireSpecial(e.value)} /></div>
                <div className="flex align-items-center justify-content-between"><label className="text-sm">啟用雙重驗證 (2FA)</label><InputSwitch checked={enable2FA} onChange={e => setEnable2FA(e.value)} /></div>
              </div>
              <Divider />
              <Button label="儲存設定" icon="pi pi-save" className="w-auto align-self-start" onClick={() => save('安全性')} />
            </div>
          </TabPanel>

          <TabPanel header="通知" leftIcon="pi pi-bell mr-2">
            <div className="flex flex-column gap-4 p-3" style={{ maxWidth: 600 }}>
              <div className="flex align-items-center justify-content-between">
                <div><label className="block font-semibold text-sm">Email 通知</label><small className="text-500">啟用後系統將透過 Email 發送通知</small></div>
                <InputSwitch checked={emailNotify} onChange={e => setEmailNotify(e.value)} />
              </div>
              {emailNotify && (
                <>
                  <div><label className="block mb-1 font-semibold text-sm">通知信箱</label><InputText value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} className="w-full" /></div>
                  <Divider align="left"><span className="text-sm font-semibold">通知項目</span></Divider>
                  <div className="flex flex-column gap-3">
                    <div className="flex align-items-center justify-content-between"><label className="text-sm">登入通知</label><InputSwitch checked={loginNotify} onChange={e => setLoginNotify(e.value)} /></div>
                    <div className="flex align-items-center justify-content-between"><label className="text-sm">錯誤警示通知</label><InputSwitch checked={errorNotify} onChange={e => setErrorNotify(e.value)} /></div>
                    <div className="flex align-items-center justify-content-between"><label className="text-sm">排程報表通知</label><InputSwitch checked={reportNotify} onChange={e => setReportNotify(e.value)} /></div>
                  </div>
                </>
              )}
              <Divider />
              <Button label="儲存設定" icon="pi pi-save" className="w-auto align-self-start" onClick={() => save('通知')} />
            </div>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  )
}

export default SystemSettings
