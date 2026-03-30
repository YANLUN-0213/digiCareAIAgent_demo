import PageHeader from '@/components/PageHeader'
import CaseTrackingPage from '@/components/CaseTracking/CaseTrackingPage'

const CaseTracking = () => {
  return (
    <div className="content-inner">
      <PageHeader funcName="案件追蹤" />
      <CaseTrackingPage />
    </div>
  )
}

export default CaseTracking
