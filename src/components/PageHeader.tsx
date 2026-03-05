interface PageHeaderProps {
  funcName: string
  action?: string
}

const PageHeader = ({ funcName, action = '' }: PageHeaderProps) => {
  return (
    <div className="headline">
      <h2 className="con-tit">{funcName} {action}</h2>
      <div className="breadcrumbs">
        <ul>
          <li style={{ color: '#333' }} className="font-bold">Home</li>
          <li>{funcName} {action}</li>
        </ul>
      </div>
    </div>
  )
}

export default PageHeader
