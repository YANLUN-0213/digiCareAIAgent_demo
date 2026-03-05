import { useMemo, useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { MOCK_LOGS } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'
import { useToast } from '@/context/ToastContext'

const resultOptions = [
  { name: '全部', code: '' },
  { name: '成功', code: 'success' },
  { name: '失敗', code: 'fail' },
]

const Logs = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedResult, setSelectedResult] = useState('')
  const [first, setFirst] = useState(0)
  const pageSize = 10
  const { showSuccess } = useToast()

  const filtered = useMemo(() => {
    return MOCK_LOGS.filter(log => {
      const kw = !keyword || log.user.includes(keyword) || log.action.includes(keyword) || log.target.includes(keyword)
      const result = !selectedResult || log.result === selectedResult
      return kw && result
    })
  }, [keyword, selectedResult])

  const paged = useMemo(() => filtered.slice(first, first + pageSize), [filtered, first])

  const handleClear = () => { setKeyword(''); setSelectedResult(''); setFirst(0) }

  const resultBody = (row: { result: string }) => (
    <Badge value={row.result === 'success' ? '成功' : '失敗'} severity={row.result === 'success' ? 'success' : 'danger'} />
  )

  return (
    <div className="content-inner">
      <PageHeader funcName="日誌稽核" />

      <Card className="card">
        <div className="flex align-items-end flex-wrap gap-2">
          <div className="mr-2">
            <label className="block mb-1">結果</label>
            <Dropdown value={selectedResult} options={resultOptions} optionLabel="name" optionValue="code" placeholder="篩選結果" className="w-10rem" onChange={e => setSelectedResult(e.value)} />
          </div>
          <div className="mr-2">
            <label className="block mb-1">關鍵字</label>
            <InputText value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') setFirst(0) }} placeholder="搜尋使用者、操作或目標" className="w-20rem" />
          </div>
          <div className="flex gap-2">
            <Button label="搜尋" icon="pi pi-search" onClick={() => setFirst(0)} />
            <Button label="清除" icon="pi pi-times" className="p-button-outlined" onClick={handleClear} />
            <Button label="匯出" icon="pi pi-download" className="p-button-outlined" onClick={() => showSuccess('提示', 'Demo 模式，匯出功能僅供展示')} />
          </div>
        </div>
      </Card>

      <Card className="card">
        <DataTable value={paged} resizableColumns showGridlines emptyMessage="查無資料">
          <Column field="createdAt" header="時間" sortable style={{ width: '180px' }} />
          <Column field="user" header="使用者" sortable />
          <Column field="action" header="操作" sortable />
          <Column field="target" header="目標" />
          <Column field="ip" header="IP 位址" />
          <Column field="result" header="結果" body={resultBody} style={{ width: '80px' }} />
        </DataTable>
        <div className="flex justify-content-between align-items-center">
          <p className="text-sm">總筆數：{filtered.length} 筆</p>
          <Paginator className="mt-3" first={first} rows={pageSize} totalRecords={filtered.length} onPageChange={e => setFirst(e.first)} />
        </div>
      </Card>
    </div>
  )
}

export default Logs
