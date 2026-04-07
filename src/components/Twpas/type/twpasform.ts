export interface TwpasForm {
    hosp:{
        hospId: string;
        applType: string;
        funcType: string;
        applPrsnId: string;
        applDate: string;
        immediateDate?: string;
        tmhbType: string;
        oldAcptNo?: string;
        oldCaseNo?:string;
    },
    patient: {
        patId?: string;
        name: string;
        idCard: string;
        birthday: string;
        gender: string;
        weight: number;
        height: number;
        pregnant?: string;
        blood?:string;
        allergyIntolerance?:AllergyIntolerance[];
    },
    opd?:Opd[];
    diagnosis: Diagnosis;
    evaluate: Evaluate[];
    treat:Treat[],
    gene:Gene[],
    result:Result[],
    apply:Apply,
    _id?:string; // ES 文件 ID
    _patChartNo?:string; // 院方資料 key
    igType?:"pas" | "imm"; // TWPAS IG 類型：pas=癌藥事前審查、imm=免疫製劑事前審查
}

interface AllergyIntolerance {
  allergy:{
    code:string;
    description?:string;
  },
  clinicalStatus?:string;
  verificationStatus?:string;
  recordedDate?:string;
  recorder?:string;
}

interface opdDiagnosis {
  icd10cmCode: string;
}

interface Opd {
  hospId: string;
  funcDate: string;
  funcType: string;
  prsnId: string;
  diagnosis: opdDiagnosis[];
  subjective: string;
  objective: string;
  assessment: string;
  plan?: string;
}

export interface SelOptionType<T = OptionType> {
  officialUpdateTime?: string;
  updateTime?: string;
  url?: string;
  version?: string;
  select: T[];
  ai?:{
    url?:string,
    sourceList?:string[]
  }
}

export interface OptionType {
  display_tw?: string;
  display: string;
  code: string;
  description?:string;
  definition?:string;
  assessScoreType?:string;
  CLASS?:string;
  inspectResultType?:string;
  patAstResult?: any[];
}

interface MedrecPath {
  medrec?: string;
  medrecTitle?: string;
  medrecUUID?:string;
}

interface DiagData {
  icd10cmCode: string;
  diagCurrentStatus: string;
  diagnosisSequence:number;
}

export interface Diagnosis {
  diagDate: string;
  diagData:DiagData[];
  medrecPath:MedrecPath[],
  imageStudy?:ImageStudy[];
  cancerStage?: CancerStage[];
  examinationReport?: ExaminationReport[];
}

export interface ImageStudy {
  imgItem?: string;
  imgResult?: string;
  imgDate?: string;
  imgInterpreter?: string;
  imgBodySite?: string;
  modality?:string;
  dicomData?:{
    dicomUUID?:string;
    path: string;
    contentType:string;
    studyUID:string;
    seriesList:SeriesList[];
    seriesUID:string;
    sopList?:{uid:string,class:string}[];
  },
  noDicomData?:{
    path: string;
    contentType:string;
    noDicomUUID?:string;
  }
  dicomStatus?:string;
}

interface SeriesList {
  seriesUID:string;
  sopList?:{uid:string,class:string}[]
}

export interface CancerStage {
  assessItem?: string;
  assessScore?: string|number;
  assessDate?: string;
  assessPerformer?: string;
}

interface ReportResultPdfList {
  reportResultPdf?: string;
  reportResultPdfTitle?: string;
  reportResultPdfUUID?:string;
}

export interface ReportResult {
  reportResultString?: string;
  reportResultPdfList:ReportResultPdfList[];
}

export interface ExaminationReport {
  reportType: string;
  speType?: string;
  reportDate?: string;
  reportPerformer?: string;
  reportResult?: ReportResult;
}

export interface TestReport {
  inspect?: string;
  inspectClass?:string;
  inspectResultType?:string;
  inspectResultTxt?: string | null;
  inspectResult?: string;
  inspectResultQuantity?:{ value:number|null, unit:string},
  inspectResultCodeableConcept?:string;
  inspectResultString?:string;
  inspectResultBoolean?:boolean;
  inspectResultInteger?:number;
  inspectResultCode?:string;
  consultValueLower?:{
    value?:number|null;
    unit?:string;
  }
  consultValueMax?:{
    value?:number|null;
    unit?:string;
  }
  consultValueCat?: string | null;
  consultValueDesc?: string | null;
  caseTime?: string;
  inspectItem?: InspectItem[];
  inspectPerformer?: string;
  inspectSet?:InspectSet[]
}

export interface InspectSet {
  inspect?:string;
  inspectResultType?:string;
  inspectResult?:string;
  inspectResultQuantity?:{ value:number|null, unit:string},
  inspectResultCodeableConcept?:string;
  inspectResultString?:string;
  inspectResultBoolean?:boolean;
  inspectResultInteger?:number;
  inspectResultTxt?: string | null;
  inspectResultCode?:string;
  consultValueCat?: string | null;
  consultValueDesc?: string | null;
  consultValueLower?:{
    value?:number|null;
    unit?:string;
  }
  consultValueMax?:{
    value?:number|null;
    unit?:string;
  }
}

export interface InspectItem {
  inspectPdf?: string;
  inspectPdfTitle?: string;
  inspectPdfUUID?:string;
}

export interface PatientAssessment {
  patAst?: string;
  patAstResult?: string | null;
  patAstDate: string;
  patAstPerformer?: string;
  patAstPdfList?:PatAstPdfList[];
}

interface PatAstPdfList {
  patAstPdf?:string;
  patAstPdfTitle?:string;
  patAstPdfUUID?:string;
}

export interface Evaluate {
  tests?: TestReport[];
  patientAssessment?: PatientAssessment[];
}

export interface DrugItem {
  drugFreArray:string[];
  drugRoute: string;
  dose: string;
  doseUnit: string;
  sDate: string;
  eDate: string;
}

export interface MedicationRequest {
  drugCode: string;
  drugStatus: string;
  drugType?: string;
  eReason?: string;
  drugItem: DrugItem[];
}

export interface Radiotherapy {
  rtStatus: string;
  rt?: string;
  realInspectTime: string;
  rtDose: string;
  rtUnit: string;
}

export interface Operation {
  opCode?: string;
  opDate?: string;
}

export interface CarePlan {
  carePlanDocPdf?: string;
  carePlanDocTitle?: string;
  carePlanDocPdfUUID?:string;
}

// 照光治療 (V1.2.0 新增)
export interface Phototherapy {
  ptCode: string;       // 照光治療種類
  ptSdate: string;      // 起始日期
  ptEdate: string;      // 終止日期
  ptNumber: number | null; // 總次數
  ptDocPdf?: string;
  ptDocTitle?: string;
  ptDocPdfUUID?: string;
}

export interface Treat {
  medicationRequest: MedicationRequest[];
  radiotherapy: Radiotherapy[];
  operation: Operation[];
  careplan: CarePlan[];
  phototherapy?: Phototherapy[];
}

export interface GenePdf {
  genPdf: string;
  genPdfTitle: string;
  genPdfUUID?:string;
}

interface GenTestCodeTypeList {
  genTestCode?: string;
  mutationType?: string;
}

export interface Gene {
  genTestCodeTypeList?:GenTestCodeTypeList[],
  specimenType: string;
  genMethod: string;
  genDate: string;
  genOrg: string;
  genResult: string;
  genInterpretation: string;
  genePdfList?: GenePdf[];
}

export interface Result {
  txAst: string;
  txAstResult:string;
  txAstDate:string;
}

export interface Apply {
  applyData:ApplyData[];
  approve?:Approve[]
}

export interface ApplyData {
  orderType:string;
  cancerDrugType:string;
  applyReason:string;
  applyReasonTxt?:string;
  lot?: string;
  continuation: string;
  medicationUsage:MedicationUsage[],
  applySide?:string;
}

export interface MedicationUsage {
  applQty:number;
  applQtyUnit:string;
  applDrugCycle:number | null;
  applDosage:number;
  applDosageUnit:string;
  useSdate:string;
  useEdate:string;
  applDrugFre:string[];
  applDrugRoute:string[];
}

export interface Approve {
    approveDate?: string;
    approveNum?: string;
    approveComment?: string;
    outcome?:string;
    adjudicationCode?:string;
    requestors?:string[]
}

export const exampleTwpasValues = {
  hosp: {
    hospId: "1555455555",
    applType: "2",
    funcType: "394589003",
    applPrsnId: "E224111111",
    applDate: "2025-08-06",
    immediateDate: "2025-08-27T10:12:41",
    tmhbType: "3",
    oldAcptNo: "123456789001",
  },
  patient: {
    name: "ivylin",
    idCard: "E222222222",
    patId: "10232255",
    birthday: "2019-01-29",
    gender: "female",
    weight: 70,
    height: 185,
    pregnant: "false",
    blood: "",
    allergyIntolerance: [],
  },
  diagnosis: {
    diagDate: "2024-01-01",
    diagData:[
      {
        icd10cmCode: "I50.812",
        diagCurrentStatus: "Adenocarcinoma, descending colon, cT3N2M1a, cStage IVA, KRAS G12V, with multiple liver metastases, status post FOLFIRI",
        diagnosisSequence: 1,
      }
    ],
    medrecPath:[
      {
        medrec: "file://Medicalrecord01.pdf",
        medrecTitle: "Medicalrecord01",
      }
    ],
    imageStudy: [
      {
        imgItem: "BP2W0ZZ",
        imgResult: "CT of Chest with contrast enhancement shows: COMPARISON: 2023-12-13. FINDINGS: placement of a right port-A catheter.",
        imgDate: "2024-01-01",
        imgInterpreter: "A123456789",
        imgBodySite: "",
        modality: "",
      }
    ],
    cancerStage: [
      {
        assessItem: "399390009",
        assessScore: "T1",
        assessDate: "2024-01-01",
        assessPerformer: "A123456789"
      }
    ],
    examinationReport: [
      {
        reportType: "66117-3",
        speType: "Prostate",
        reportResult: {
          reportResultString: "Prostate labeled as lesion 1 magnetic resonance-ultrasound fusion biopsy adenocarcinoma Gleason score 3+3=6",
          reportResultPdfList:[
            {
              reportResultPdf: "file://PathologyReport01.pdf",
              reportResultPdfTitle: "PathologyReport01"
            }
          ]
        },
        reportDate: "2024-01-01",
        reportPerformer: "A123456789"
      }
    ]
  },
  gene: [
    {
      genTestCodeTypeList:[
        {
          genTestCode: "21637-4",
          mutationType: "LA6692-3",
        }
      ],
      specimenType: "LP7057-5",
      genMethod: "PCR",
      genDate: "2024-01-01",
      genOrg: "2023LDTB0002",
      genResult: "摘要呈現基因報告的結果",
      genInterpretation: "POS",
      genePdfList:[
        {
          genPdf: "file://GenReport01.pdf",
          genPdfTitle: "GenReport01"
        }
      ]
    }
  ],
  treat: [{
    medicationRequest: [
      {
        drugCode: "A006271100",
        drugStatus: "stopped",
        drugType: "Y",
        eReason: "死亡",
        drugItem:[
          {
            drugFreArray: ["BID"],
            drugRoute: "IV",
            dose: "2",
            doseUnit: "MG",
            sDate: "2024-01-01",
            eDate: "2024-01-01"
          }
        ]
      }
    ],
    radiotherapy: [
      {
        rtStatus: "preparation",
        rt: "D712B9Z",
        realInspectTime: "2024-01-01",
        rtDose: "50",
        rtUnit: "Gy"
      }
    ],
    operation:[
      {
        opCode: "37029B",
        opDate: "2024-01-01"
      }
    ],
    careplan:[
      {
        carePlanDocPdf: "file://CarePlanReport01.pdf",
        carePlanDocTitle: "CarePlanReport01"
      }
    ]
  }],
  evaluate: [{
    tests: [
      {
        inspect: "48423-8",
        inspectResultTxt: null,
        inspectResultCode: "",
        inspectResult: "4.5 ; 40.9",
        caseTime: "2024-01-01",
        inspectItem:[
          {
            inspectPdf: "file://TestReport01.pdf",
            inspectPdfTitle: "TestReport01"
          }
        ],
        inspectPerformer: "A123456789"
      }
    ],
    patientAssessment: [
      {
        patAst: "88020-3",
        patAstResult: "NaN",
        patAstDate: "2024-01-01",
        patAstPerformer: "A123456789"
      }
    ]
  }],
  result: [{
    txAst: "ICLL",
    txAstResult: "CR",
    txAstDate: "2024-01-01"
  }],
  apply: {
    applyData:[
      {
        orderType: "1",
        cancerDrugType: "KC01123243",
        applyReason: "C50P1",
        continuation: "1",
        lot: "1",
        medicationUsage:[
          {
            applySide: "R",
            applQty: 1,
            applQtyUnit: "vial",
            applDrugCycle: 5,
            applDosage: 2,
            applDosageUnit: "vial",
            useSdate: "2024-01-01",
            useEdate: "2024-01-01",
            applDrugFre: ["QD","AC1H"],
            applDrugRoute: ["IV"]
          }
        ]
      }
    ],
    approve:[
      {
        approveDate: "2024-01-01",
        approveNum: "5",
        approveComment: "1",
        outcome: "complete",
        adjudicationCode: "eligible",
        requestors: ["A123456789"]
      }
    ],
  },
  opd: [],
};

export const defaultTwpasValues = {
  hosp: {
    hospId: "",
    applType: "",
    funcType: "",
    applPrsnId: "",
    applDate: "",
    immediateDate: "",
    tmhbType: "",
    oldAcptNo: "",
  },
  patient: {
    name: "",
    idCard: "",
    patId: "",
    birthday: "",
    gender: "",
    weight: 0,
    height: 0,
    pregnant: "",
    blood: "",
    allergyIntolerance: []
  },
  result: [],
  apply: {
    applyData:[
      {
        orderType: "",
        cancerDrugType: "",
        applyReason: "",
        continuation: "",
        lot: "",
        medicationUsage:[
          {
            applySide: "",
            applQty: 0,
            applQtyUnit: "",
            applDrugCycle: null,
            applDosage: 0,
            applDosageUnit: "",
            useSdate: "",
            useEdate: "",
            applDrugFre: [],
            applDrugRoute: [],
          }
        ]
      }
    ],
    approve: [],
  },
  diagnosis: {
    diagDate: "",
    diagData:[
      {
        icd10cmCode: "",
        diagCurrentStatus: "",
        diagnosisSequence: 1,
      }
    ],
    medrecPath: [],
    imageStudy: [],
    cancerStage: [],
    examinationReport: [],
  },
  evaluate: [],
  treat: [],
  gene: [],
  opd: [],
};

// ===== 免疫製劑事前審查 (TWPAS-IMM) 範例資料 =====
// igType="imm" 時：隱藏 gene 頁籤，改以 opd 門診病例佐證；治療以照光治療(phototherapy)為主要輔助
export const exampleTwpasImmValues = {
  hosp: {
    hospId: "1555455555",
    applType: "2",
    funcType: "408459003", // 免疫風濕科
    applPrsnId: "D112233445",
    applDate: "2026-03-20",
    immediateDate: "",
    tmhbType: "3",
    oldAcptNo: "IMM2026030001",
  },
  patient: {
    name: "張美玉",
    idCard: "F223344556",
    patId: "20260301",
    birthday: "1982-06-15",
    gender: "female",
    weight: 58,
    height: 162,
    pregnant: "false",
    blood: "112144000",
    allergyIntolerance: [
      {
        allergy: { code: "91936005", description: "對 Penicillin 過敏" },
        clinicalStatus: "active",
        verificationStatus: "confirmed",
        recordedDate: "2024-05-10",
        recorder: "D112233445",
      },
    ],
  },
  opd: [
    {
      hospId: "1555455555",
      funcDate: "2026-03-10",
      funcType: "408459003",
      prsnId: "D112233445",
      diagnosis: [{ icd10cmCode: "L40.50" }],
      subjective: "多處關節腫痛、晨僵超過 1 小時，合併銀屑病皮膚病灶。",
      objective: "雙手 PIP/MCP 關節腫脹、壓痛；指甲點狀凹陷；CRP 上升。",
      assessment: "Psoriatic arthritis，activity moderate-to-high。",
      plan: "評估申請生物製劑 (TNF-α inhibitor)。",
    },
  ],
  diagnosis: {
    diagDate: "2026-03-15",
    diagData: [
      {
        icd10cmCode: "L40.50",
        diagCurrentStatus: "Psoriatic arthritis with multiple joint involvement, DAS28CRP 5.3, failed MTX 20mg/wk for 3 months.",
        diagnosisSequence: 1,
      },
    ],
    medrecPath: [
      { medrec: "file://ImmMedicalRecord01.pdf", medrecTitle: "ImmMedicalRecord01" },
    ],
    imageStudy: [],
    cancerStage: [],
    examinationReport: [],
  },
  evaluate: [
    {
      tests: [
        {
          inspect: "1988-5", // CRP
          inspectResultTxt: "High",
          inspectResultCode: "",
          inspectResult: "28.6",
          caseTime: "2026-03-12",
          inspectItem: [
            { inspectPdf: "file://CRPReport.pdf", inspectPdfTitle: "CRPReport" },
          ],
          inspectPerformer: "D112233445",
        },
        {
          inspect: "30341-2", // ESR
          inspectResultTxt: "High",
          inspectResult: "52",
          caseTime: "2026-03-12",
          inspectItem: [],
          inspectPerformer: "D112233445",
        },
      ],
      patientAssessment: [
        {
          patAst: "DAS28CRP",
          patAstResult: "5.3",
          patAstDate: "2026-03-12",
          patAstPerformer: "D112233445",
        },
      ],
    },
  ],
  treat: [
    {
      medicationRequest: [
        {
          drugCode: "BC27821100", // MTX 範例代碼
          drugStatus: "stopped",
          drugType: "N",
          eReason: "療效不足",
          drugItem: [
            {
              drugFreArray: ["QW"],
              drugRoute: "PO",
              dose: "20",
              doseUnit: "MG",
              sDate: "2025-12-01",
              eDate: "2026-03-01",
            },
          ],
        },
      ],
      radiotherapy: [],
      operation: [],
      careplan: [
        {
          carePlanDocPdf: "file://ImmCarePlan.pdf",
          carePlanDocTitle: "ImmCarePlan",
        },
      ],
      phototherapy: [
        {
          ptCode: "NBUVB",
          ptSdate: "2026-01-10",
          ptEdate: "2026-03-10",
          ptNumber: 12,
          ptDocPdf: "file://PhototherapyReport.pdf",
          ptDocTitle: "PhototherapyReport",
        },
      ],
    },
  ],
  gene: [],
  result: [
    {
      txAst: "DAS28CRP",
      txAstResult: "PR",
      txAstDate: "2026-03-15",
    },
  ],
  apply: {
    applyData: [
      {
        orderType: "2",
        cancerDrugType: "IMM001",
        applyReason: "L40P1",
        continuation: "1",
        lot: "1",
        medicationUsage: [
          {
            applySide: "",
            applQty: 2,
            applQtyUnit: "syringe",
            applDrugCycle: 6,
            applDosage: 40,
            applDosageUnit: "MG",
            useSdate: "2026-03-25",
            useEdate: "2026-09-25",
            applDrugFre: ["Q2W"],
            applDrugRoute: ["SC"],
          },
        ],
      },
    ],
    approve: [],
  },
  igType: "imm" as const,
};

export const defaultTwpasImmValues = {
  ...defaultTwpasValues,
  igType: "imm" as const,
};
