import type { WorkflowStep } from '@/components/TwpasWorkflow/twpas-workflow.types'

export type PipelineStepId = 'local-fhir' | 'local-cql' | 'cloud-fhir' | 'cloud-cql' | 'user-confirm' | 'vpn-upload'

export interface CqlLibrary {
  id: string
  name: string
  applicableIcdCodes: string[]
}

export interface VpnUploadResult {
  opcode: string
  uploadTime: string
  status: 'completed' | 'processing' | 'failed'
  rtnCode?: string
  txResultTxt?: string | null
}

export type CaseOverallStatus = 'validating' | 'failed' | 'waiting' | 'uploading' | 'completed'

export interface CaseRecord {
  id: string
  patientName: string
  patientId: string
  hospId: string
  igType: 'TWPAS' | 'TWCI' | 'TWNGS'
  diagnosisCodes: string[]
  drugCode?: string
  createdAt: string
  steps: WorkflowStep[]
  hasCqlMatch: boolean
  matchedCqlLibraries: CqlLibrary[]
  vpnResult?: VpnUploadResult
}

export const CASE_STEP_LABELS: string[] = [
  '地端FHIR驗證',
  '地端CQL',
  '雲端FHIR驗證',
  '雲端CQL',
  '等待確認上傳',
  '正式上傳',
]

export const CASE_STEP_IDS: PipelineStepId[] = [
  'local-fhir',
  'local-cql',
  'cloud-fhir',
  'cloud-cql',
  'user-confirm',
  'vpn-upload',
]
