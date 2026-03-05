import { Card } from 'primereact/card'
import PageHeader from '@/components/PageHeader'

interface PlaceholderPageProps {
  funcName: string
}

const PlaceholderPage = ({ funcName }: PlaceholderPageProps) => {
  return (
    <div className="content-inner">
      <PageHeader funcName={funcName} />
      <Card className="card">
        <div className="flex flex-column align-items-center justify-content-center py-6">
          <i className="pi pi-wrench text-5xl mb-3" style={{ color: '#999' }} />
          <h3 className="m-0 mb-2" style={{ color: '#666' }}>功能開發中</h3>
          <p className="text-500 m-0">此功能尚在開發階段，敬請期待</p>
        </div>
      </Card>
    </div>
  )
}

export default PlaceholderPage
