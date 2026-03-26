export interface TwciForm {
  hosp: Hosp;
  patient: Patient;
  doctor: Doctor;
  diagnosis: Diagnosis;
  condition: Condition;
  cancerStage: CancerStage;
  illness?: Illness;
}

interface Hosp {
  applMode: string;
  applType: string;
  applDate: string;
  medCertBookDate: string;
  hospId: string;
  acptNo: string;
  acptNum: number | null;
}

interface Patient {
  idCard: string;
  name: string;
  gender: string;
  birthday: string;
  zipCode: string;
  contactAddr: string;
  mobile?: string;
  contactTel?: string;
  email?: string;
  patID?: string;
}

interface Doctor {
  diagPrsnId?: string;
  diagPrsnName: string;
}

interface Diagnosis {
  icd10cmCode: string;
  examinationReportArray?: ExaminationReport[];
  medrec?: Medrec[];
  imageStudy?: ImageStudy[];
}

interface ExaminationReport {
  reportType?: string;
  speType?: string;
  reportResultString?: string;
  reportResultPdf?: string;
  reportResultPdfTitle?: string;
  reportResultPdfUUID?: string;
  reportDate?: string;
}

interface Condition {
  clinicalStatus: string;
  verificationStatus: string;
  severity: string;
  recordedDate: string;
  bodySiteArray?: string[];
}

interface CancerStage {
  cancerStage: string;
  assessScore?: string;
  assessDate?: string;
}

interface Illness {
  code?: string;
  date?: string;
  oriCancerAjcc?: string;
  oriCancerAjcc1?: string;
  cancerStatus?: string;
  cancerTreatmentData?: CancerTreatmentData[];
  cancerTreatment?: string[];
  cancerTreatmentPlan?: string[];
  cancerTreatmentText: string;
}

interface CancerTreatmentData {
  cancerTreatment?: string;
  cancerTreatmentPlan?: string;
}

interface Medrec {
  medrec: string;
  medrecTitle: string;
  medrecUUID: string;
}

interface ImageStudy {
  imgItem: string;
  imgResult: string;
  imgDate: string;
  imgBodySite: string;
  imgDicom?: ImgDicom[];
  imgNonDicom?: ImgNonDicom[];
  dicomStatus?: string;
}

export interface ImgDicom {
  studyUid: string;
  dicomUUID: string;
  path?: string;
  series: Series[];
}

interface Series {
  uid: string;
  modality: string;
  instance: Instance[];
}

interface Instance {
  uid: string;
  sopClass: string;
}

interface ImgNonDicom {
  imgNonDicom: string;
  imgNonDicomMimeType: string;
  noDicomUUID: string;
}

export interface SelOptionType<T = OptionType> {
  officialUpdateTime?: string;
  updateTime?: string;
  url?: string;
  version?: string;
  select: T[];
}

export interface OptionType {
  display_tw?: string;
  display: string;
  code: string;
  description?: string;
  definition?: string;
  assessScoreType?: string;
  CLASS?: string;
  inspectResultType?: string;
}

export const defaultTwciValues = {
  hosp: {
    applMode: "",
    applType: "",
    applDate: "",
    medCertBookDate: "",
    hospId: "",
    acptNo: "",
    acptNum: null,
  },
  doctor: {
    diagPrsnId: "",
    diagPrsnName: "",
  },
  diagnosis: {
    icd10cmCode: "",
    examinationReportArray: [
      {
        reportType: "",
        speType: "",
        reportResultString: "",
        reportResultPdf: "",
        reportResultPdfTitle: "",
        reportDate: "",
      },
    ],
    medrec: [],
    imageStudy: [],
  },
  cancerStage: {
    cancerStage: "",
    assessScore: "",
    assessDate: "",
  },
  illness: {
    code: "",
    date: "",
    oriCancerAjcc: "",
    oriCancerAjcc1: "",
    cancerStatus: "",
    cancerTreatment: [],
    cancerTreatmentPlan: [],
    cancerTreatmentText: "",
  },
  patient: {
    idCard: "",
    patID: "",
    name: "",
    gender: "",
    birthday: "",
    zipCode: "",
    contactAddr: "",
    mobile: "",
    contactTel: "",
    email: "",
  },
  condition: {
    clinicalStatus: "",
    verificationStatus: "",
    severity: "",
    recordedDate: "",
    bodySiteArray: [],
  },
};

export const exampleTwciValues = {
  hosp: {
    applMode: "2",
    applType: "1",
    applDate: "2025-10-22",
    medCertBookDate: "2025-10-22",
    hospId: "0131060029",
    acptNo: "11218899999",
    acptNum: 1,
  },
  doctor: {
    diagPrsnId: "A234649456",
    diagPrsnName: "王小明",
  },
  diagnosis: {
    icd10cmCode: "C49.6",
    examinationReportArray: [
      {
        reportType: "47526-9",
        speType: "Prostate ; Stomach",
        reportResultString:
          "Prostate labeled as lesion 1, Stomach labeled as lesion 2. Microscopic examination reveals adenocarcinoma.",
        reportResultPdf: "file://PathologyReport01.pdf",
        reportResultPdfTitle: "PathologyReport01",
        reportDate: "2024-01-01",
      },
    ],
    medrec: [
      { medrec: "file://Medicalrecord01.pdf", medrecTitle: "Medicalrecord01", medrecUUID: "" },
      { medrec: "file://Medicalrecord02.pdf", medrecTitle: "Medicalrecord02", medrecUUID: "" },
    ],
    imageStudy: [
      {
        imgItem: "B34JZZ3",
        imgResult:
          "CT of Chest with contrast showing multiple nodules in bilateral lungs, largest measuring 2.3cm in right upper lobe",
        imgDate: "2024-01-15",
        imgBodySite: "774007",
        imgDicom: [
          {
            studyUid: "1.2.840.113619.2.55.3.2831170641.123.1234567890.1",
            dicomUUID: "",
            series: [
              {
                uid: "1.2.840.113619.2.55.3.2831170641.123.1234567890.1.1",
                modality: "CT",
                instance: [
                  {
                    uid: "1.2.840.113619.2.55.3.2831170641.123.1234567890.1.1.1",
                    sopClass: "1.2.840.10008.5.1.4.1.1.2",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        imgItem: "BW28ZZZ",
        imgResult:
          "Abdominal ultrasound shows heterogeneous mass in right lobe of liver measuring 4.2 x 3.8 cm",
        imgDate: "2024-03-10",
        imgBodySite: "774007",
        imgNonDicom: [
          {
            imgNonDicom: "file://UltrasoundAbdomen_20240310.jpg",
            imgNonDicomMimeType: "image/jpeg",
            noDicomUUID: "",
          },
        ],
      },
    ],
  },
  cancerStage: {
    cancerStage: "1",
    assessScore: "T1",
    assessDate: "2024-01-01",
  },
  illness: {
    code: "C49.4",
    date: "2023-06-15",
    oriCancerAjcc: "9",
    oriCancerAjcc1: "腫瘤已侵犯區域淋巴結,無遠端轉移",
    cancerStatus: "4",
    cancerTreatment: ["1", "5", "3"],
    cancerTreatmentPlan: ["1", "2"],
    cancerTreatmentText:
      "病人於2023年6月確診為軟組織惡性腫瘤(C49.6),經完整手術切除後接受輔助性放射治療及化學治療。目前處於緩解期,定期追蹤中。後續計畫持續門診追蹤,並評估免疫治療之可行性。病人整體狀況良好,無明顯不適症狀,預後尚可。",
  },
  patient: {
    idCard: "A123456789",
    patID: "A123456789",
    name: "王大明",
    gender: "male",
    birthday: "2001-01-01",
    zipCode: "106",
    contactAddr: "台北市大安區信義路三段140號",
    mobile: "0912345678",
    contactTel: "0227065866",
    email: "a123456@nhi.gov.tw",
  },
  condition: {
    clinicalStatus: "remission",
    verificationStatus: "confirmed",
    severity: "24484000",
    recordedDate: "2024-01-10",
    bodySiteArray: ["206007"],
  },
};
