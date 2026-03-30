import type { WorkflowStep, VerificationResultItem, StepStatus } from '@/components/TwpasWorkflow/twpas-workflow.types'
import type { CaseRecord, CqlLibrary, VpnUploadResult } from './case-tracking.types'
import { CASE_STEP_LABELS } from './case-tracking.types'

// ===== Mock CQL Libraries =====

export const MOCK_CQL_LIBRARIES: CqlLibrary[] = [
  { id: 'CRCBevacizumabRule1', name: '大腸直腸癌 Bevacizumab 給付規則', applicableIcdCodes: ['C18', 'C19', 'C20'] },
  { id: 'LungOsimertinibRule1', name: '肺癌 Osimertinib 給付規則', applicableIcdCodes: ['C34'] },
  { id: 'BreastTrastuzumabRule1', name: '乳癌 Trastuzumab 給付規則', applicableIcdCodes: ['C50'] },
]

// ===== Mock Errors / Warnings =====

const MOCK_ERRORS: Record<string, VerificationResultItem[]> = {
  '地端FHIR驗證': [
    { resourceType: 'Patient', resourceId: 'patient-001', severity: 'error', code: 'FHIR-E001', message: 'Patient.identifier 為必填欄位，但值為空', location: 'Patient.identifier' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'FHIR-E003', message: 'Condition.code.coding.system 必須為有效的 ICD-10-CM URI', location: 'Condition.code.coding[0].system' },
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'FHIR-E005', message: 'MedicationRequest.dosageInstruction 格式不符 IG 規範', location: 'MedicationRequest.dosageInstruction[0]' },
  ],
  '地端CQL': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'CQL-R001', message: '用藥劑量超出建議範圍（Osimertinib 160mg > max 80mg）', location: 'MedicationRequest.dosageInstruction[0].doseAndRate' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'CQL-R003', message: '診斷碼與申請藥物適應症不符', location: 'Condition.code' },
  ],
  '雲端FHIR驗證': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'NHI-FHIR-E005', message: 'MedicationRequest.dosageInstruction 格式不符健保署 IG 規範', location: 'MedicationRequest.dosageInstruction[0]' },
    { resourceType: 'Organization', resourceId: 'org-001', severity: 'error', code: 'NHI-FHIR-E009', message: 'Organization.identifier 需包含醫事機構代碼', location: 'Organization.identifier' },
  ],
  '雲端CQL': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'NHI-CQL-012', message: '申請藥物不在給付品項範圍內，請確認藥品代碼', location: 'MedicationRequest.medicationCodeableConcept.coding[0]' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'NHI-CQL-W005', message: '診斷碼與申請藥物之適應症對應關係需人工確認', location: 'Condition.code' },
  ],
}

const MOCK_WARNINGS: VerificationResultItem[] = [
  { resourceType: 'Patient', resourceId: 'patient-001', severity: 'warning', code: 'FHIR-W001', message: 'Patient.telecom 建議填寫聯絡電話', location: 'Patient.telecom' },
  { resourceType: 'Composition', resourceId: 'comp-001', severity: 'warning', code: 'FHIR-W002', message: 'Composition.author 建議填寫', location: 'Composition.author' },
]

// ===== Helpers =====

function _pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

function _makeStep(label: string, status: StepStatus, ts?: string): WorkflowStep {
  if (status === 'pending' || status === 'skipped') return { label, status }
  const total = 10 + Math.floor(Math.random() * 6)
  const pool = MOCK_ERRORS[label] ?? []
  if (status === 'success') {
    const ws = _pick(MOCK_WARNINGS, Math.random() < 0.4 ? 1 : 0)
    return { label, status, timestamp: ts, totalResources: total, errorCount: 0, warningCount: ws.length, items: ws }
  }
  if (status === 'in_progress') {
    return { label, status, timestamp: ts, totalResources: total, errorCount: 0, warningCount: 0, items: [] }
  }
  // failed
  const errs = _pick(pool, 1 + Math.floor(Math.random() * Math.min(2, pool.length)))
  const ws = _pick(MOCK_WARNINGS, Math.floor(Math.random() * 2))
  return { label, status, timestamp: ts, totalResources: total, errorCount: errs.length, warningCount: ws.length, items: [...errs, ...ws] }
}

function matchCqlLibraries(diagnosisCodes: string[]): CqlLibrary[] {
  return MOCK_CQL_LIBRARIES.filter(lib =>
    lib.applicableIcdCodes.some(icd => diagnosisCodes.some(dc => dc.startsWith(icd)))
  )
}

function buildSteps(
  statuses: StepStatus[],
  hasCqlMatch: boolean,
  ts: string,
): WorkflowStep[] {
  return CASE_STEP_LABELS.map((label, i) => {
    // CQL steps (index 1, 3) — skip if no match
    if ((i === 1 || i === 3) && !hasCqlMatch) {
      return _makeStep(label, 'skipped')
    }
    const status = statuses[i]
    return _makeStep(label, status, status !== 'pending' && status !== 'skipped' ? ts : undefined)
  })
}

// ===== Mock Cases =====

export const MOCK_CASES: CaseRecord[] = (() => {
  const ts = '2026-03-25 14:30:00'

  const cases: CaseRecord[] = [
    // Case 1: 全部通過，等待使用者確認 (step 5 = pending as "waiting")
    {
      id: 'case-001',
      patientName: '王大明',
      patientId: 'A123456789',
      hospId: '0401180014',
      igType: 'TWPAS',
      diagnosisCodes: ['C34.1'],
      drugCode: 'KC00552209',
      createdAt: '2026-03-25 09:15:00',
      hasCqlMatch: true,
      matchedCqlLibraries: matchCqlLibraries(['C34.1']),
      steps: buildSteps(['success', 'success', 'success', 'success', 'in_progress', 'pending'], true, ts),
    },
    // Case 2: 地端 FHIR 失敗
    {
      id: 'case-002',
      patientName: '李美玲',
      patientId: 'B234567890',
      hospId: '0401180014',
      igType: 'TWPAS',
      diagnosisCodes: ['C18.0'],
      drugCode: 'KC00789123',
      createdAt: '2026-03-25 10:30:00',
      hasCqlMatch: true,
      matchedCqlLibraries: matchCqlLibraries(['C18.0']),
      steps: buildSteps(['failed', 'pending', 'pending', 'pending', 'pending', 'pending'], true, ts),
    },
    // Case 3: 雲端 CQL 失敗
    {
      id: 'case-003',
      patientName: '張志豪',
      patientId: 'C345678901',
      hospId: '0401180014',
      igType: 'TWCI',
      diagnosisCodes: ['C50.9'],
      createdAt: '2026-03-25 11:00:00',
      hasCqlMatch: true,
      matchedCqlLibraries: matchCqlLibraries(['C50.9']),
      steps: buildSteps(['success', 'success', 'success', 'failed', 'pending', 'pending'], true, ts),
    },
    // Case 4: 已完成 VPN 上傳
    {
      id: 'case-004',
      patientName: '陳淑芬',
      patientId: 'D456789012',
      hospId: '0401180014',
      igType: 'TWPAS',
      diagnosisCodes: ['C34.9'],
      drugCode: 'KC00552209',
      createdAt: '2026-03-24 16:00:00',
      hasCqlMatch: true,
      matchedCqlLibraries: matchCqlLibraries(['C34.9']),
      steps: buildSteps(['success', 'success', 'success', 'success', 'success', 'success'], true, ts),
      vpnResult: {
        opcode: 'TW_TWPAS_2026032500001',
        uploadTime: '2026-03-25 15:00:00',
        status: 'completed',
        rtnCode: '0000',
        txResultTxt: null,
      },
    },
    // Case 5: CQL 跳過（疾病碼無對應），雲端 FHIR 已通過
    {
      id: 'case-005',
      patientName: '黃建宏',
      patientId: 'E567890123',
      hospId: '0401180014',
      igType: 'TWCI',
      diagnosisCodes: ['G35'],
      createdAt: '2026-03-25 13:00:00',
      hasCqlMatch: false,
      matchedCqlLibraries: [],
      steps: buildSteps(['success', 'skipped', 'success', 'skipped', 'in_progress', 'pending'], false, ts),
    },
    // Case 6: 驗證進行中 (step 2 in_progress)
    {
      id: 'case-006',
      patientName: '林雅惠',
      patientId: 'F678901234',
      hospId: '0401180014',
      igType: 'TWPAS',
      diagnosisCodes: ['C18.2'],
      drugCode: 'KC00789456',
      createdAt: '2026-03-25 14:20:00',
      hasCqlMatch: true,
      matchedCqlLibraries: matchCqlLibraries(['C18.2']),
      steps: buildSteps(['success', 'in_progress', 'pending', 'pending', 'pending', 'pending'], true, ts),
    },
  ]

  return cases
})()

// ===== Mock Pipeline Runner =====

export function simulateVpnUpload(): Promise<VpnUploadResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        opcode: `TW_TWPAS_${Date.now()}`,
        uploadTime: new Date().toLocaleString('sv-SE').replace('T', ' '),
        status: 'completed',
        rtnCode: '0000',
        txResultTxt: null,
      })
    }, 500)
  })
}
