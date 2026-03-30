import type { IvDripRecord, IvAlert, BarcodeScanResult } from './iv-drip.types'

const now = new Date()
const fmt = (d: Date) => d.toISOString()
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000)
const minutesLater = (m: number) => new Date(now.getTime() + m * 60000)

export const MOCK_IV_DRIPS: IvDripRecord[] = [
  {
    id: 'IV-001',
    patient: { id: 'P001', name: '陳美玲', bedNumber: '3A-01', ward: '3A', wristbandBarcode: 'WB-P001' },
    medication: { orderId: 'ORD-001', medicationName: '0.9% Normal Saline', dosage: '1000ml', concentration: '0.9% NaCl', ivType: '周邊靜脈' },
    barcode: 'IV-P001-ORD001-20260330-A1B2',
    flowRate: 125,
    totalVolume: 1000,
    infusedVolume: 250,
    startTime: fmt(minutesAgo(120)),
    estimatedCompletionTime: fmt(minutesLater(360)),
    remainingMinutes: 360,
    status: 'normal',
    events: [
      { id: 'E001', timestamp: fmt(minutesAgo(120)), type: 'started', description: '開始輸液 0.9% Normal Saline 1000ml', operator: '護理師 王小芬' },
    ],
  },
  {
    id: 'IV-002',
    patient: { id: 'P002', name: '林志明', bedNumber: '3A-03', ward: '3A', wristbandBarcode: 'WB-P002' },
    medication: { orderId: 'ORD-002', medicationName: '5% Glucose', dosage: '500ml', concentration: '5% Dextrose', ivType: '周邊靜脈' },
    barcode: 'IV-P002-ORD002-20260330-C3D4',
    flowRate: 80,
    totalVolume: 500,
    infusedVolume: 350,
    startTime: fmt(minutesAgo(260)),
    estimatedCompletionTime: fmt(minutesLater(112)),
    remainingMinutes: 112,
    status: 'normal',
    events: [
      { id: 'E002', timestamp: fmt(minutesAgo(260)), type: 'started', description: '開始輸液 5% Glucose 500ml', operator: '護理師 張雅芳' },
    ],
  },
  {
    id: 'IV-003',
    patient: { id: 'P003', name: '黃國華', bedNumber: '3A-05', ward: '3A', wristbandBarcode: 'WB-P003' },
    medication: { orderId: 'ORD-003', medicationName: 'Lactated Ringer\'s', dosage: '1000ml', concentration: 'LR', ivType: '周邊靜脈' },
    barcode: 'IV-P003-ORD003-20260330-E5F6',
    flowRate: 150,
    totalVolume: 1000,
    infusedVolume: 850,
    startTime: fmt(minutesAgo(340)),
    estimatedCompletionTime: fmt(minutesLater(60)),
    remainingMinutes: 60,
    status: 'normal',
    events: [
      { id: 'E003', timestamp: fmt(minutesAgo(340)), type: 'started', description: '開始輸液 Lactated Ringer\'s 1000ml', operator: '護理師 李佳蓉' },
    ],
  },
  {
    id: 'IV-004',
    patient: { id: 'P004', name: '張淑惠', bedNumber: '3B-02', ward: '3B', wristbandBarcode: 'WB-P004' },
    medication: { orderId: 'ORD-004', medicationName: 'Ceftriaxone 2g in NS 100ml', dosage: '100ml', concentration: '2g/100ml', ivType: '周邊靜脈' },
    barcode: 'IV-P004-ORD004-20260330-G7H8',
    flowRate: 200,
    totalVolume: 100,
    infusedVolume: 88,
    startTime: fmt(minutesAgo(26)),
    estimatedCompletionTime: fmt(minutesLater(4)),
    remainingMinutes: 4,
    status: 'about_to_complete',
    events: [
      { id: 'E004', timestamp: fmt(minutesAgo(26)), type: 'started', description: '開始輸液 Ceftriaxone 2g', operator: '護理師 王小芬' },
      { id: 'E004a', timestamp: fmt(minutesAgo(5)), type: 'alarm_triggered', description: '即將完成提醒已發送', operator: '系統' },
    ],
  },
  {
    id: 'IV-005',
    patient: { id: 'P005', name: '吳俊傑', bedNumber: '3B-04', ward: '3B', wristbandBarcode: 'WB-P005' },
    medication: { orderId: 'ORD-005', medicationName: 'Metronidazole 500mg in NS', dosage: '100ml', concentration: '500mg/100ml', ivType: '周邊靜脈' },
    barcode: 'IV-P005-ORD005-20260330-I9J0',
    flowRate: 150,
    totalVolume: 100,
    infusedVolume: 90,
    startTime: fmt(minutesAgo(36)),
    estimatedCompletionTime: fmt(minutesLater(4)),
    remainingMinutes: 4,
    status: 'about_to_complete',
    events: [
      { id: 'E005', timestamp: fmt(minutesAgo(36)), type: 'started', description: '開始輸液 Metronidazole 500mg', operator: '護理師 張雅芳' },
    ],
  },
  {
    id: 'IV-006',
    patient: { id: 'P006', name: '許雅婷', bedNumber: '3B-06', ward: '3B', wristbandBarcode: 'WB-P006' },
    medication: { orderId: 'ORD-006', medicationName: 'Vancomycin 1g in D5W 250ml', dosage: '250ml', concentration: '1g/250ml', ivType: '中心靜脈' },
    barcode: 'IV-P006-ORD006-20260330-K1L2',
    flowRate: 125,
    totalVolume: 250,
    infusedVolume: 240,
    startTime: fmt(minutesAgo(115)),
    estimatedCompletionTime: fmt(minutesLater(5)),
    remainingMinutes: 5,
    status: 'about_to_complete',
    events: [
      { id: 'E006', timestamp: fmt(minutesAgo(115)), type: 'started', description: '開始輸液 Vancomycin 1g', operator: '護理師 李佳蓉' },
      { id: 'E006a', timestamp: fmt(minutesAgo(60)), type: 'rate_adjusted', description: '流速由 100ml/hr 調整為 125ml/hr', operator: '護理師 李佳蓉' },
    ],
  },
  {
    id: 'IV-007',
    patient: { id: 'P007', name: '劉建國', bedNumber: '4A-01', ward: '4A', wristbandBarcode: 'WB-P007' },
    medication: { orderId: 'ORD-007', medicationName: '0.9% Normal Saline', dosage: '500ml', concentration: '0.9% NaCl', ivType: '周邊靜脈' },
    barcode: 'IV-P007-ORD007-20260330-M3N4',
    flowRate: 100,
    totalVolume: 500,
    infusedVolume: 500,
    startTime: fmt(minutesAgo(300)),
    estimatedCompletionTime: fmt(minutesAgo(0)),
    remainingMinutes: 0,
    status: 'needs_replacement',
    events: [
      { id: 'E007', timestamp: fmt(minutesAgo(300)), type: 'started', description: '開始輸液 0.9% NS 500ml', operator: '護理師 王小芬' },
      { id: 'E007a', timestamp: fmt(minutesAgo(1)), type: 'alarm_triggered', description: '藥液已滴完，需更換', operator: '系統' },
    ],
  },
  {
    id: 'IV-008',
    patient: { id: 'P008', name: '趙怡君', bedNumber: '4A-03', ward: '4A', wristbandBarcode: 'WB-P008' },
    medication: { orderId: 'ORD-008', medicationName: 'Potassium Chloride in NS', dosage: '1000ml', concentration: '20mEq/L', ivType: '周邊靜脈' },
    barcode: 'IV-P008-ORD008-20260330-O5P6',
    flowRate: 80,
    totalVolume: 1000,
    infusedVolume: 200,
    startTime: fmt(minutesAgo(150)),
    estimatedCompletionTime: fmt(minutesLater(600)),
    remainingMinutes: 600,
    status: 'normal',
    events: [
      { id: 'E008', timestamp: fmt(minutesAgo(150)), type: 'started', description: '開始輸液 KCl in NS 1000ml', operator: '護理師 張雅芳' },
    ],
  },
  {
    id: 'IV-009',
    patient: { id: 'P009', name: '蔡明宏', bedNumber: '4A-05', ward: '4A', wristbandBarcode: 'WB-P009' },
    medication: { orderId: 'ORD-009', medicationName: 'Piperacillin/Tazobactam', dosage: '100ml', concentration: '4.5g/100ml', ivType: '周邊靜脈' },
    barcode: 'IV-P009-ORD009-20260330-Q7R8',
    flowRate: 200,
    totalVolume: 100,
    infusedVolume: 100,
    startTime: fmt(minutesAgo(30)),
    estimatedCompletionTime: fmt(minutesAgo(0)),
    remainingMinutes: 0,
    status: 'completed',
    events: [
      { id: 'E009', timestamp: fmt(minutesAgo(30)), type: 'started', description: '開始輸液 Piperacillin/Tazobactam 4.5g', operator: '護理師 李佳蓉' },
      { id: 'E009a', timestamp: fmt(minutesAgo(0)), type: 'completed', description: '輸液完成', operator: '護理師 李佳蓉' },
    ],
  },
  {
    id: 'IV-010',
    patient: { id: 'P010', name: '鄭雅文', bedNumber: '3A-07', ward: '3A', wristbandBarcode: 'WB-P010' },
    medication: { orderId: 'ORD-010', medicationName: 'Albumin 20%', dosage: '100ml', concentration: '20%', ivType: '周邊靜脈' },
    barcode: 'IV-P010-ORD010-20260330-S9T0',
    flowRate: 60,
    totalVolume: 100,
    infusedVolume: 30,
    startTime: fmt(minutesAgo(30)),
    estimatedCompletionTime: fmt(minutesLater(70)),
    remainingMinutes: 70,
    status: 'normal',
    events: [
      { id: 'E010', timestamp: fmt(minutesAgo(30)), type: 'started', description: '開始輸液 Albumin 20% 100ml', operator: '護理師 王小芬' },
    ],
  },
  {
    id: 'IV-011',
    patient: { id: 'P011', name: '周家豪', bedNumber: '3B-08', ward: '3B', wristbandBarcode: 'WB-P011' },
    medication: { orderId: 'ORD-011', medicationName: 'Total Parenteral Nutrition', dosage: '1500ml', concentration: 'TPN', ivType: '中心靜脈' },
    barcode: 'IV-P011-ORD011-20260330-U1V2',
    flowRate: 62,
    totalVolume: 1500,
    infusedVolume: 0,
    startTime: fmt(minutesAgo(0)),
    estimatedCompletionTime: fmt(minutesLater(1450)),
    remainingMinutes: 1450,
    status: 'paused',
    events: [
      { id: 'E011', timestamp: fmt(minutesAgo(10)), type: 'started', description: '開始輸液 TPN 1500ml', operator: '護理師 張雅芳' },
      { id: 'E011a', timestamp: fmt(minutesAgo(5)), type: 'paused', description: '暫停輸液，等待醫師確認醫囑', operator: '護理師 張雅芳' },
    ],
  },
  {
    id: 'IV-012',
    patient: { id: 'P012', name: '孫國華', bedNumber: '4A-07', ward: '4A', wristbandBarcode: 'WB-P012' },
    medication: { orderId: 'ORD-012', medicationName: '5% Glucose', dosage: '500ml', concentration: '5% Dextrose', ivType: '周邊靜脈' },
    barcode: 'IV-P012-ORD012-20260330-W3X4',
    flowRate: 100,
    totalVolume: 500,
    infusedVolume: 380,
    startTime: fmt(minutesAgo(228)),
    estimatedCompletionTime: fmt(minutesLater(72)),
    remainingMinutes: 72,
    status: 'normal',
    events: [
      { id: 'E012', timestamp: fmt(minutesAgo(228)), type: 'started', description: '開始輸液 5% Glucose 500ml', operator: '護理師 李佳蓉' },
    ],
  },
  {
    id: 'IV-013',
    patient: { id: 'P013', name: '楊宗翰', bedNumber: '3A-09', ward: '3A', wristbandBarcode: 'WB-P013' },
    medication: { orderId: 'ORD-013', medicationName: 'Amikacin 500mg in NS 100ml', dosage: '100ml', concentration: '500mg/100ml', ivType: '周邊靜脈' },
    barcode: 'IV-P013-ORD013-20260330-Y5Z6',
    flowRate: 100,
    totalVolume: 100,
    infusedVolume: 100,
    startTime: fmt(minutesAgo(60)),
    estimatedCompletionTime: fmt(minutesAgo(0)),
    remainingMinutes: 0,
    status: 'completed',
    events: [
      { id: 'E013', timestamp: fmt(minutesAgo(60)), type: 'started', description: '開始輸液 Amikacin 500mg', operator: '護理師 王小芬' },
      { id: 'E013a', timestamp: fmt(minutesAgo(0)), type: 'completed', description: '輸液完成', operator: '護理師 王小芬' },
    ],
    fhirResourceId: 'MedicationAdministration/ma-013',
  },
]

export const MOCK_ALERTS: IvAlert[] = [
  { id: 'A001', timestamp: fmt(minutesAgo(5)), dripId: 'IV-004', patient: MOCK_IV_DRIPS[3].patient, alertType: 'about_to_complete', message: '3B-02 張淑惠 Ceftriaxone 即將完成 (剩餘約 4 分鐘)', acknowledged: false },
  { id: 'A002', timestamp: fmt(minutesAgo(3)), dripId: 'IV-006', patient: MOCK_IV_DRIPS[5].patient, alertType: 'about_to_complete', message: '3B-06 許雅婷 Vancomycin 即將完成 (剩餘約 5 分鐘)', acknowledged: false },
  { id: 'A003', timestamp: fmt(minutesAgo(1)), dripId: 'IV-007', patient: MOCK_IV_DRIPS[6].patient, alertType: 'needs_replacement', message: '4A-01 劉建國 0.9% NS 藥液已滴完，需更換', acknowledged: false },
  { id: 'A004', timestamp: fmt(minutesAgo(30)), dripId: 'IV-009', patient: MOCK_IV_DRIPS[8].patient, alertType: 'completed', message: '4A-05 蔡明宏 Piperacillin/Tazobactam 輸液完成', acknowledged: true },
  { id: 'A005', timestamp: fmt(minutesAgo(60)), dripId: 'IV-013', patient: MOCK_IV_DRIPS[12].patient, alertType: 'completed', message: '3A-09 楊宗翰 Amikacin 輸液完成', acknowledged: true },
  { id: 'A006', timestamp: fmt(minutesAgo(120)), dripId: 'IV-003', patient: MOCK_IV_DRIPS[2].patient, alertType: 'abnormal_flow', message: '3A-05 黃國華 Lactated Ringer\'s 流速異常偵測 (模擬)', acknowledged: true },
  { id: 'A007', timestamp: fmt(minutesAgo(90)), dripId: 'IV-006', patient: MOCK_IV_DRIPS[5].patient, alertType: 'patient_call', message: '3B-06 許雅婷 病人呼叫護理站', acknowledged: true },
  { id: 'A008', timestamp: fmt(minutesAgo(10)), dripId: 'IV-005', patient: MOCK_IV_DRIPS[4].patient, alertType: 'about_to_complete', message: '3B-04 吳俊傑 Metronidazole 即將完成', acknowledged: false },
]

export const DEMO_BARCODE = 'IV-P001-ORD001-20260330-A1B2'
export const DEMO_WRISTBAND = 'WB-P001'

export function decodeBarcodeDemo(barcode: string): BarcodeScanResult | null {
  const match = MOCK_IV_DRIPS.find(d => d.barcode === barcode)
  if (!match) return null
  return {
    patientId: match.patient.id,
    patientName: match.patient.name,
    orderId: match.medication.orderId,
    medicationName: match.medication.medicationName,
    dosage: match.medication.dosage,
    ivType: match.medication.ivType,
  }
}

export function findPatientByWristband(wristband: string): string | null {
  const match = MOCK_IV_DRIPS.find(d => d.patient.wristbandBarcode === wristband)
  return match ? match.patient.id : null
}

export function buildFhirMedicationAdministration(drip: IvDripRecord) {
  return {
    resourceType: 'MedicationAdministration',
    id: drip.fhirResourceId || `ma-${drip.id.toLowerCase()}`,
    meta: {
      profile: ['https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/MedicationAdministration-twcore'],
    },
    status: drip.status === 'completed' ? 'completed' : 'in-progress',
    medicationCodeableConcept: {
      coding: [{
        system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
        code: drip.medication.orderId,
        display: drip.medication.medicationName,
      }],
      text: `${drip.medication.medicationName} ${drip.medication.dosage}`,
    },
    subject: {
      reference: `Patient/${drip.patient.id}`,
      display: drip.patient.name,
    },
    effectivePeriod: {
      start: drip.startTime,
      ...(drip.status === 'completed' ? { end: drip.estimatedCompletionTime } : {}),
    },
    dosage: {
      text: `${drip.medication.concentration} at ${drip.flowRate} ml/hr`,
      rateQuantity: {
        value: drip.flowRate,
        unit: 'ml/hr',
        system: 'http://unitsofmeasure.org',
        code: 'mL/h',
      },
      dose: {
        value: drip.totalVolume,
        unit: 'ml',
        system: 'http://unitsofmeasure.org',
        code: 'mL',
      },
    },
    performer: [{
      actor: {
        reference: 'Practitioner/nurse-001',
        display: drip.events[0]?.operator || '護理師',
      },
    }],
    note: drip.events.map(e => ({
      time: e.timestamp,
      text: e.description,
    })),
  }
}
