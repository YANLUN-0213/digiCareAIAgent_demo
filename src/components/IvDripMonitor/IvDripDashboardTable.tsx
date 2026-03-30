import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import CountdownTimer from './CountdownTimer'
import type { IvDripRecord } from './iv-drip.types'
import { STATUS_LABEL, STATUS_SEVERITY } from './iv-drip.types'

interface Props {
  drips: IvDripRecord[]
  onSelect: (drip: IvDripRecord) => void
}

const IvDripDashboardTable = ({ drips, onSelect }: Props) => {
  const statusBody = (row: IvDripRecord) => (
    <Tag value={STATUS_LABEL[row.status]} severity={STATUS_SEVERITY[row.status]} />
  )

  const countdownBody = (row: IvDripRecord) => (
    <CountdownTimer remainingMinutes={row.remainingMinutes} status={row.status} />
  )

  const patientBody = (row: IvDripRecord) => (
    <div>
      <div style={{ fontWeight: 600 }}>{row.patient.name}</div>
      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{row.patient.bedNumber}</div>
    </div>
  )

  const medicationBody = (row: IvDripRecord) => (
    <div>
      <div>{row.medication.medicationName}</div>
      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{row.medication.dosage} · {row.medication.ivType}</div>
    </div>
  )

  const flowRateBody = (row: IvDripRecord) => (
    <span>{row.flowRate} ml/hr</span>
  )

  const startTimeBody = (row: IvDripRecord) => {
    const d = new Date(row.startTime)
    return <span>{d.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}</span>
  }

  const estBody = (row: IvDripRecord) => {
    if (row.status === 'completed') return <span style={{ color: '#9ca3af' }}>--</span>
    const d = new Date(row.estimatedCompletionTime)
    return <span>{d.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}</span>
  }

  const progressBody = (row: IvDripRecord) => {
    const pct = Math.min(100, Math.round((row.infusedVolume / row.totalVolume) * 100))
    const color = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e'
    return (
      <div className="iv-progress" style={{ width: '100px' }}>
        <div className="iv-progress-fill" style={{ width: `${pct}%`, background: color }} />
        <div className="iv-progress-label">{pct}%</div>
      </div>
    )
  }

  return (
    <DataTable
      value={drips}
      paginator
      rows={10}
      stripedRows
      rowHover
      onRowClick={(e) => onSelect(e.data as IvDripRecord)}
      style={{ cursor: 'pointer' }}
      emptyMessage="無點滴資料"
      sortField="remainingMinutes"
      sortOrder={1}
    >
      <Column header="床號/病人" body={patientBody} style={{ width: '130px' }} />
      <Column header="點滴藥品" body={medicationBody} style={{ minWidth: '200px' }} />
      <Column header="滴速" body={flowRateBody} style={{ width: '100px' }} />
      <Column header="進度" body={progressBody} style={{ width: '120px' }} />
      <Column header="開始時間" body={startTimeBody} style={{ width: '100px' }} />
      <Column header="預計完成" body={estBody} style={{ width: '100px' }} />
      <Column header="剩餘時間" body={countdownBody} style={{ width: '120px' }} />
      <Column header="狀態" body={statusBody} style={{ width: '100px' }} />
    </DataTable>
  )
}

export default IvDripDashboardTable
