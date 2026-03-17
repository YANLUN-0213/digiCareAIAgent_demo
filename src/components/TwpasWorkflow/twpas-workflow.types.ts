export type StepStatus = 'pending' | 'in_progress' | 'success' | 'failed'

export interface VerificationResultItem {
  resourceType: string
  resourceId: string
  severity: 'error' | 'warning' | 'information'
  code: string
  message: string
  location: string
}

export interface WorkflowStep {
  label: string
  status: StepStatus
  timestamp?: string
  totalResources?: number
  errorCount?: number
  warningCount?: number
  items?: VerificationResultItem[]
}

export const STEP_LABELS = [
  '地端FHIR驗證',
  '地端CQL驗證',
  '雲端FHIR預檢',
  '雲端CQL預檢',
  '正式申請',
]

export interface WorkflowRun {
  id: string
  timestamp: string
  steps: WorkflowStep[]
}
