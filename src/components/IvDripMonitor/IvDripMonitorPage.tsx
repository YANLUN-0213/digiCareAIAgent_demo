import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'
import IvDripDashboardTable from './IvDripDashboardTable'
import BarcodeScanDialog from './BarcodeScanDialog'
import IvDripDetailDialog from './IvDripDetailDialog'
import AlertPanel from './AlertPanel'
import FhirExportDialog from './FhirExportDialog'
import { MOCK_IV_DRIPS, MOCK_ALERTS } from './iv-drip.mock'
import type { IvDripRecord, IvAlert, IvDripStatus, IvDripEventType } from './iv-drip.types'
import { WARD_OPTIONS, STATUS_FILTER_OPTIONS } from './iv-drip.types'
import './iv-drip.scss'

const IvDripMonitorPage = () => {
  const [drips, setDrips] = useState<IvDripRecord[]>(() => JSON.parse(JSON.stringify(MOCK_IV_DRIPS)))
  const [alerts, setAlerts] = useState<IvAlert[]>(() => JSON.parse(JSON.stringify(MOCK_ALERTS)))
  const [selectedDrip, setSelectedDrip] = useState<IvDripRecord | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showScan, setShowScan] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showFhir, setShowFhir] = useState(false)
  const [filterWard, setFilterWard] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterText, setFilterText] = useState('')
  const alertedRef = useRef<Set<string>>(new Set(MOCK_ALERTS.map(a => `${a.dripId}-${a.alertType}`)))

  // Single interval for countdown updates
  useEffect(() => {
    const timer = setInterval(() => {
      setDrips(prev => prev.map(d => {
        if (d.status === 'completed' || d.status === 'paused') return d

        const elapsedMs = Date.now() - new Date(d.startTime).getTime()
        const elapsedMinutes = elapsedMs / 60000
        const totalMinutes = (d.totalVolume / d.flowRate) * 60
        const remaining = Math.max(0, totalMinutes - elapsedMinutes)
        const infused = Math.min(d.totalVolume, d.flowRate * (elapsedMinutes / 60))

        let newStatus: IvDripStatus = 'normal'
        if (remaining <= 0) newStatus = 'needs_replacement'
        else if (remaining <= 15) newStatus = 'about_to_complete'

        // Auto-generate alerts on threshold crossing
        if (newStatus !== d.status) {
          const alertKey = `${d.id}-${newStatus}`
          if (!alertedRef.current.has(alertKey) && (newStatus === 'about_to_complete' || newStatus === 'needs_replacement')) {
            alertedRef.current.add(alertKey)
            const newAlert: IvAlert = {
              id: `A-${Date.now()}-${d.id}`,
              timestamp: new Date().toISOString(),
              dripId: d.id,
              patient: d.patient,
              alertType: newStatus,
              message: `${d.patient.bedNumber} ${d.patient.name} ${d.medication.medicationName} ${newStatus === 'about_to_complete' ? '即將完成' : '需更換'}`,
              acknowledged: false,
            }
            setAlerts(prev => [newAlert, ...prev])
          }
        }

        const est = new Date(new Date(d.startTime).getTime() + totalMinutes * 60000).toISOString()

        return {
          ...d,
          remainingMinutes: remaining,
          infusedVolume: infused,
          status: newStatus,
          estimatedCompletionTime: est,
        }
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Keep selectedDrip in sync
  useEffect(() => {
    if (selectedDrip) {
      const updated = drips.find(d => d.id === selectedDrip.id)
      if (updated) setSelectedDrip(updated)
    }
  }, [drips, selectedDrip?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectDrip = useCallback((drip: IvDripRecord) => {
    setSelectedDrip(drip)
    setShowDetail(true)
  }, [])

  const handleAcknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a))
  }, [])

  const handleAction = useCallback((dripId: string, action: IvDripEventType, payload?: Record<string, unknown>) => {
    const now = new Date().toISOString()
    setDrips(prev => prev.map(d => {
      if (d.id !== dripId) return d
      const newEvent = {
        id: `E-${Date.now()}`,
        timestamp: now,
        type: action,
        description: '',
        operator: '護理師 Demo',
      }

      switch (action) {
        case 'rate_adjusted': {
          const newRate = (payload?.newRate as number) || d.flowRate
          newEvent.description = `流速由 ${d.flowRate}ml/hr 調整為 ${newRate}ml/hr`
          const remainingVol = d.totalVolume - d.infusedVolume
          const remainingMin = (remainingVol / newRate) * 60
          return {
            ...d,
            flowRate: newRate,
            remainingMinutes: remainingMin,
            estimatedCompletionTime: new Date(Date.now() + remainingMin * 60000).toISOString(),
            events: [...d.events, newEvent],
          }
        }
        case 'paused':
          newEvent.description = '暫停輸液'
          return { ...d, status: 'paused' as IvDripStatus, events: [...d.events, newEvent] }
        case 'resumed':
          newEvent.description = '繼續輸液'
          return { ...d, status: 'normal' as IvDripStatus, events: [...d.events, newEvent] }
        case 'completed':
          newEvent.description = '輸液完成'
          return { ...d, status: 'completed' as IvDripStatus, remainingMinutes: 0, infusedVolume: d.totalVolume, events: [...d.events, newEvent] }
        case 'issue_reported':
          newEvent.description = `異常回報：${(payload?.note as string) || '未說明'}`
          return { ...d, events: [...d.events, newEvent] }
        default:
          return d
      }
    }))
  }, [])

  const handleStartInfusion = useCallback((_barcode: string) => {
    // For demo, just show a toast-like feedback — the drip already exists in mock data
    // In a real app, this would create a new IV drip record
  }, [])

  const filteredDrips = useMemo(() => {
    return drips.filter(d => {
      if (filterWard !== 'all' && d.patient.ward !== filterWard) return false
      if (filterStatus !== 'all' && d.status !== filterStatus) return false
      if (filterText) {
        const text = filterText.toLowerCase()
        const match = d.patient.name.toLowerCase().includes(text)
          || d.patient.bedNumber.toLowerCase().includes(text)
          || d.medication.medicationName.toLowerCase().includes(text)
        if (!match) return false
      }
      return true
    })
  }, [drips, filterWard, filterStatus, filterText])

  // Stats
  const activeCount = drips.filter(d => d.status === 'normal' || d.status === 'about_to_complete').length
  const warningCount = drips.filter(d => d.status === 'about_to_complete').length
  const dangerCount = drips.filter(d => d.status === 'needs_replacement').length
  const completedCount = drips.filter(d => d.status === 'completed').length
  const unreadAlertCount = alerts.filter(a => !a.acknowledged).length

  return (
    <div className="iv-page">
      <ConfirmDialog />

      {/* Summary stats */}
      <div className="iv-stats-row">
        <div className="iv-stat-card iv-stat-active">
          <div className="iv-stat-number" style={{ color: '#3b82f6' }}>{activeCount}</div>
          <div className="iv-stat-label">滴注中</div>
        </div>
        <div className="iv-stat-card iv-stat-warning">
          <div className="iv-stat-number" style={{ color: '#f59e0b' }}>{warningCount}</div>
          <div className="iv-stat-label">即將完成</div>
        </div>
        <div className="iv-stat-card iv-stat-danger">
          <div className="iv-stat-number" style={{ color: '#ef4444' }}>{dangerCount}</div>
          <div className="iv-stat-label">需更換</div>
        </div>
        <div className="iv-stat-card iv-stat-success">
          <div className="iv-stat-number" style={{ color: '#22c55e' }}>{completedCount}</div>
          <div className="iv-stat-label">已完成</div>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="mb-3">
        <div className="iv-toolbar">
          <div className="iv-filters">
            <Dropdown
              value={filterWard}
              options={WARD_OPTIONS}
              onChange={(e) => setFilterWard(e.value)}
              placeholder="病房"
              style={{ width: '150px' }}
            />
            <Dropdown
              value={filterStatus}
              options={STATUS_FILTER_OPTIONS}
              onChange={(e) => setFilterStatus(e.value)}
              placeholder="狀態"
              style={{ width: '150px' }}
            />
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="搜尋病人/床號/藥品..."
                style={{ width: '240px' }}
              />
            </IconField>
          </div>
          <div className="iv-actions">
            <Button
              label="掃描開始輸液"
              icon="pi pi-qrcode"
              onClick={() => setShowScan(true)}
            />
            <div className="iv-alert-badge">
              <Button
                icon="pi pi-bell"
                severity="secondary"
                outlined
                onClick={() => setShowAlerts(true)}
              />
              {unreadAlertCount > 0 && (
                <span className="iv-badge-count">{unreadAlertCount}</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main table */}
      <Card>
        <IvDripDashboardTable drips={filteredDrips} onSelect={handleSelectDrip} />
      </Card>

      {/* Dialogs & Panels */}
      <BarcodeScanDialog
        visible={showScan}
        onHide={() => setShowScan(false)}
        onStartInfusion={handleStartInfusion}
      />

      <IvDripDetailDialog
        visible={showDetail}
        onHide={() => setShowDetail(false)}
        drip={selectedDrip}
        onAction={handleAction}
        onOpenFhir={() => setShowFhir(true)}
      />

      <AlertPanel
        visible={showAlerts}
        onHide={() => setShowAlerts(false)}
        alerts={alerts}
        onAcknowledge={handleAcknowledgeAlert}
      />

      <FhirExportDialog
        visible={showFhir}
        onHide={() => setShowFhir(false)}
        drip={selectedDrip}
      />
    </div>
  )
}

export default IvDripMonitorPage
