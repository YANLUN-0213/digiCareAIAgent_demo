import PageHeader from '@/components/PageHeader'
import IvDripMonitorPage from '@/components/IvDripMonitor/IvDripMonitorPage'

const IvDripMonitor = () => {
  return (
    <div className="content-inner">
      <PageHeader funcName="點滴條碼智慧提醒" />
      <IvDripMonitorPage />
    </div>
  )
}

export default IvDripMonitor
