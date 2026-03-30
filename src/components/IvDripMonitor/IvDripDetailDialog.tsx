import { useState, useCallback } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Divider } from 'primereact/divider'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { confirmDialog } from 'primereact/confirmdialog'
import CountdownTimer from './CountdownTimer'
import type { IvDripRecord, IvDripEventType } from './iv-drip.types'
import { STATUS_LABEL, STATUS_SEVERITY, EVENT_TYPE_LABEL } from './iv-drip.types'

interface Props {
  visible: boolean
  onHide: () => void
  drip: IvDripRecord | null
  onAction: (dripId: string, action: IvDripEventType, payload?: Record<string, unknown>) => void
  onOpenFhir: () => void
}

const IvDripDetailDialog = ({ visible, onHide, drip, onAction, onOpenFhir }: Props) => {
  const [showRateEdit, setShowRateEdit] = useState(false)
  const [newRate, setNewRate] = useState<number | null>(null)
  const [showIssueInput, setShowIssueInput] = useState(false)
  const [issueNote, setIssueNote] = useState('')

  const handleClose = useCallback(() => {
    setShowRateEdit(false)
    setShowIssueInput(false)
    setIssueNote('')
    onHide()
  }, [onHide])

  if (!drip) return null

  const pct = Math.min(100, Math.round((drip.infusedVolume / drip.totalVolume) * 100))
  const progressColor = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e'

  const handleAdjustRate = () => {
    if (newRate && newRate > 0) {
      onAction(drip.id, 'rate_adjusted', { newRate })
      setShowRateEdit(false)
      setNewRate(null)
    }
  }

  const handlePauseResume = () => {
    if (drip.status === 'paused') {
      onAction(drip.id, 'resumed')
    } else {
      onAction(drip.id, 'paused')
    }
  }

  const handleComplete = () => {
    confirmDialog({
      message: `確定要將 ${drip.patient.name} 的 ${drip.medication.medicationName} 標記為完成嗎？`,
      header: '確認完成',
      icon: 'pi pi-check-circle',
      acceptLabel: '確定',
      rejectLabel: '取消',
      accept: () => onAction(drip.id, 'completed'),
    })
  }

  const handleReportIssue = () => {
    if (issueNote.trim()) {
      onAction(drip.id, 'issue_reported', { note: issueNote.trim() })
      setShowIssueInput(false)
      setIssueNote('')
    }
  }

  const sortedEvents = [...drip.events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <Dialog
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>點滴詳情</span>
          <Tag value={STATUS_LABEL[drip.status]} severity={STATUS_SEVERITY[drip.status]} />
        </div>
      }
      visible={visible}
      onHide={handleClose}
      style={{ width: '640px' }}
      modal
      maximizable
    >
      <div className="iv-detail">
        {/* Patient & Medication info */}
        <div className="iv-info-grid">
          <div className="iv-info-item">
            <div className="iv-info-label">病人姓名</div>
            <div className="iv-info-value">{drip.patient.name}</div>
          </div>
          <div className="iv-info-item">
            <div className="iv-info-label">床號 / 病房</div>
            <div className="iv-info-value">{drip.patient.bedNumber} · {drip.patient.ward} 病房</div>
          </div>
          <div className="iv-info-item">
            <div className="iv-info-label">藥品名稱</div>
            <div className="iv-info-value">{drip.medication.medicationName}</div>
          </div>
          <div className="iv-info-item">
            <div className="iv-info-label">劑量 / 濃度</div>
            <div className="iv-info-value">{drip.medication.dosage} · {drip.medication.concentration}</div>
          </div>
          <div className="iv-info-item">
            <div className="iv-info-label">輸液類型</div>
            <div className="iv-info-value">{drip.medication.ivType}</div>
          </div>
          <div className="iv-info-item">
            <div className="iv-info-label">滴速</div>
            <div className="iv-info-value">{drip.flowRate} ml/hr</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>輸液進度</span>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {Math.round(drip.infusedVolume)}ml / {drip.totalVolume}ml
            </span>
          </div>
          <div className="iv-progress">
            <div className="iv-progress-fill" style={{ width: `${pct}%`, background: progressColor }} />
            <div className="iv-progress-label">{pct}%</div>
          </div>
        </div>

        {/* Countdown */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>剩餘時間：</span>
            <CountdownTimer remainingMinutes={drip.remainingMinutes} status={drip.status} />
          </div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            預計完成：{drip.status === 'completed' ? '--' : new Date(drip.estimatedCompletionTime).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Actions */}
        {drip.status !== 'completed' && (
          <>
            <div className="iv-detail-actions">
              <Button
                label="調整流速"
                icon="pi pi-sliders-h"
                severity="info"
                size="small"
                outlined
                onClick={() => { setShowRateEdit(!showRateEdit); setShowIssueInput(false) }}
              />
              <Button
                label={drip.status === 'paused' ? '繼續輸液' : '暫停輸液'}
                icon={drip.status === 'paused' ? 'pi pi-play' : 'pi pi-pause'}
                severity="warning"
                size="small"
                outlined
                onClick={handlePauseResume}
              />
              <Button
                label="完成"
                icon="pi pi-check"
                severity="success"
                size="small"
                outlined
                onClick={handleComplete}
              />
              <Button
                label="回報異常"
                icon="pi pi-exclamation-triangle"
                severity="danger"
                size="small"
                outlined
                onClick={() => { setShowIssueInput(!showIssueInput); setShowRateEdit(false) }}
              />
              <Button
                label="FHIR 匯出"
                icon="pi pi-download"
                severity="secondary"
                size="small"
                outlined
                onClick={onOpenFhir}
              />
            </div>

            {/* Inline rate edit */}
            {showRateEdit && (
              <div className="iv-rate-edit">
                <span style={{ fontSize: '0.85rem' }}>新滴速：</span>
                <InputNumber
                  value={newRate}
                  onValueChange={(e) => setNewRate(e.value ?? null)}
                  suffix=" ml/hr"
                  min={1}
                  max={999}
                  style={{ width: '140px' }}
                  inputStyle={{ textAlign: 'center' }}
                />
                <Button label="確認" size="small" onClick={handleAdjustRate} disabled={!newRate || newRate <= 0} />
                <Button label="取消" size="small" severity="secondary" text onClick={() => setShowRateEdit(false)} />
              </div>
            )}

            {/* Inline issue report */}
            {showIssueInput && (
              <div style={{ marginTop: '0.5rem' }}>
                <InputTextarea
                  value={issueNote}
                  onChange={(e) => setIssueNote(e.target.value)}
                  rows={2}
                  placeholder="請描述異常情況..."
                  style={{ width: '100%' }}
                  autoFocus
                />
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <Button label="送出" size="small" severity="danger" onClick={handleReportIssue} disabled={!issueNote.trim()} />
                  <Button label="取消" size="small" severity="secondary" text onClick={() => setShowIssueInput(false)} />
                </div>
              </div>
            )}
          </>
        )}

        <Divider />

        {/* Event timeline */}
        <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>事件記錄</div>
        <div className="iv-timeline">
          {sortedEvents.map((evt) => (
            <div className="iv-timeline-item" key={evt.id}>
              <div className={`iv-timeline-dot iv-dot-${evt.type}`} />
              <div className="iv-timeline-time">
                {new Date(evt.timestamp).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="iv-timeline-desc">
                <strong>{EVENT_TYPE_LABEL[evt.type]}</strong> — {evt.description}
              </div>
              {evt.operator && <div className="iv-timeline-operator">{evt.operator}</div>}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  )
}

export default IvDripDetailDialog
