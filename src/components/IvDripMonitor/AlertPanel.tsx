import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import type { IvAlert } from './iv-drip.types'
import { ALERT_TYPE_LABEL, ALERT_TYPE_ICON } from './iv-drip.types'
import classNames from 'classnames'

interface Props {
  visible: boolean
  onHide: () => void
  alerts: IvAlert[]
  onAcknowledge: (alertId: string) => void
}

const AlertPanel = ({ visible, onHide, alerts, onAcknowledge }: Props) => {
  const sortedAlerts = [...alerts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const iconColor: Record<string, string> = {
    about_to_complete: '#f59e0b',
    completed: '#22c55e',
    abnormal_flow: '#ef4444',
    patient_call: '#3b82f6',
    needs_replacement: '#ef4444',
  }

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      style={{ width: '380px' }}
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="pi pi-bell" />
          <span>告警通知</span>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            ({alerts.filter(a => !a.acknowledged).length} 則未讀)
          </span>
        </div>
      }
    >
      <div className="iv-alert-panel">
        {sortedAlerts.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>
            目前無告警通知
          </div>
        )}
        {sortedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={classNames('iv-alert-item', { 'iv-alert-unread': !alert.acknowledged })}
          >
            <div className="iv-alert-header">
              <div className="iv-alert-type" style={{ color: iconColor[alert.alertType] || '#374151' }}>
                <i className={ALERT_TYPE_ICON[alert.alertType]} />
                <span>{ALERT_TYPE_LABEL[alert.alertType]}</span>
              </div>
              <span className="iv-alert-time">
                {new Date(alert.timestamp).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="iv-alert-message">{alert.message}</div>
            {!alert.acknowledged && (
              <Button
                label="確認"
                icon="pi pi-check"
                size="small"
                severity="secondary"
                outlined
                onClick={() => onAcknowledge(alert.id)}
              />
            )}
          </div>
        ))}
      </div>
    </Sidebar>
  )
}

export default AlertPanel
