export type IvDripStatus = 'normal' | 'about_to_complete' | 'needs_replacement' | 'completed' | 'paused'

export type AlertType = 'about_to_complete' | 'completed' | 'abnormal_flow' | 'patient_call' | 'needs_replacement'

export type ScanStep = 'idle' | 'medication_scanned' | 'wristband_scanned' | 'verified' | 'mismatch'

export type IvDripEventType = 'started' | 'rate_adjusted' | 'alarm_triggered' | 'paused' | 'resumed' | 'completed' | 'replaced' | 'issue_reported'

export interface PatientInfo {
  id: string
  name: string
  bedNumber: string
  ward: string
  wristbandBarcode: string
}

export interface IvMedication {
  orderId: string
  medicationName: string
  dosage: string
  concentration: string
  ivType: string
}

export interface IvDripEvent {
  id: string
  timestamp: string
  type: IvDripEventType
  description: string
  operator?: string
}

export interface IvDripRecord {
  id: string
  patient: PatientInfo
  medication: IvMedication
  barcode: string
  flowRate: number
  totalVolume: number
  infusedVolume: number
  startTime: string
  estimatedCompletionTime: string
  remainingMinutes: number
  status: IvDripStatus
  events: IvDripEvent[]
  fhirResourceId?: string
}

export interface IvAlert {
  id: string
  timestamp: string
  dripId: string
  patient: PatientInfo
  alertType: AlertType
  message: string
  acknowledged: boolean
}

export interface BarcodeScanResult {
  patientId: string
  patientName: string
  orderId: string
  medicationName: string
  dosage: string
  ivType: string
}

export const STATUS_LABEL: Record<IvDripStatus, string> = {
  normal: '正常滴注',
  about_to_complete: '即將完成',
  needs_replacement: '需更換',
  completed: '已完成',
  paused: '已暫停',
}

export const STATUS_SEVERITY: Record<IvDripStatus, 'info' | 'warning' | 'danger' | 'success' | 'secondary'> = {
  normal: 'info',
  about_to_complete: 'warning',
  needs_replacement: 'danger',
  completed: 'success',
  paused: 'secondary',
}

export const ALERT_TYPE_LABEL: Record<AlertType, string> = {
  about_to_complete: '即將完成',
  completed: '已完成',
  abnormal_flow: '異常流速',
  patient_call: '病人呼叫',
  needs_replacement: '需更換',
}

export const ALERT_TYPE_ICON: Record<AlertType, string> = {
  about_to_complete: 'pi pi-clock',
  completed: 'pi pi-check-circle',
  abnormal_flow: 'pi pi-exclamation-triangle',
  patient_call: 'pi pi-bell',
  needs_replacement: 'pi pi-sync',
}

export const EVENT_TYPE_LABEL: Record<IvDripEventType, string> = {
  started: '開始輸液',
  rate_adjusted: '調整流速',
  alarm_triggered: '告警觸發',
  paused: '暫停輸液',
  resumed: '繼續輸液',
  completed: '輸液完成',
  replaced: '更換點滴',
  issue_reported: '回報異常',
}

export const WARD_OPTIONS = [
  { label: '全部病房', value: 'all' },
  { label: '3A 病房', value: '3A' },
  { label: '3B 病房', value: '3B' },
  { label: '4A 病房', value: '4A' },
]

export const STATUS_FILTER_OPTIONS = [
  { label: '全部狀態', value: 'all' },
  { label: '正常滴注', value: 'normal' },
  { label: '即將完成', value: 'about_to_complete' },
  { label: '需更換', value: 'needs_replacement' },
  { label: '已完成', value: 'completed' },
  { label: '已暫停', value: 'paused' },
]
