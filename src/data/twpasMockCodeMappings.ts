import { SelOptionType, OptionType } from '../components/Twpas/type/twpasform';

const mockMappings: Record<string, SelOptionType<any>> = {
  funcType: {
    select: [
      { code: "394589003", display: "Nephrology", display_tw: "腎臟科" },
      { code: "394591006", display: "Neurology", display_tw: "神經科" },
      { code: "394579002", display: "Cardiology", display_tw: "心臟科" },
      { code: "394582007", display: "Dermatology", display_tw: "皮膚科" },
      { code: "419192003", display: "Internal medicine", display_tw: "內科" },
      { code: "394592004", display: "Clinical oncology", display_tw: "臨床腫瘤科" },
      { code: "394802001", display: "General medicine", display_tw: "一般醫學科" },
      { code: "408443003", display: "General medical practice", display_tw: "一般醫學實務" },
      { code: "394609007", display: "General surgery", display_tw: "一般外科" },
      { code: "394585009", display: "Obstetrics and gynecology", display_tw: "婦產科" },
    ]
  },
  blood: {
    select: [
      { code: "112144000", display: "Blood group A", display_tw: "A型" },
      { code: "112149005", display: "Blood group B", display_tw: "B型" },
      { code: "165743006", display: "Blood group AB", display_tw: "AB型" },
      { code: "58460004", display: "Blood group O", display_tw: "O型" },
    ]
  },
  allergy: {
    select: [
      { code: "91936005", display: "Allergy to penicillin", display_tw: "青黴素過敏" },
      { code: "294505008", display: "Allergy to sulfonamide", display_tw: "磺胺類過敏" },
      { code: "418634005", display: "Allergic reaction caused by substance", display_tw: "物質過敏反應" },
      { code: "232347008", display: "Allergy to aspirin", display_tw: "阿斯匹靈過敏" },
      { code: "300913006", display: "Allergy to shellfish", display_tw: "貝類過敏" },
    ]
  },
  clinicalStatus: {
    select: [
      { code: "active", display: "Active" },
      { code: "inactive", display: "Inactive" },
      { code: "resolved", display: "Resolved" },
    ]
  },
  verificationStatus: {
    select: [
      { code: "unconfirmed", display: "Unconfirmed" },
      { code: "confirmed", display: "Confirmed" },
      { code: "refuted", display: "Refuted" },
      { code: "entered-in-error", display: "Entered in Error" },
    ]
  },
  diagnosisSequence: {
    select: [
      { code: "1", display: "主診斷" },
      { code: "2", display: "共病" },
    ]
  },
  imgItem: {
    select: [
      { code: "BP2W0ZZ", display: "Plain Radiography of Chest", display_tw: "胸部X光" },
      { code: "BW25YZZ", display: "Computerized Tomography of Chest", display_tw: "胸部電腦斷層" },
      { code: "BW28YZZ", display: "MRI of Chest", display_tw: "胸部磁振造影" },
      { code: "B524ZZZ", display: "Ultrasonography of Heart", display_tw: "心臟超音波" },
      { code: "BF14ZZZ", display: "Ultrasonography of Liver", display_tw: "肝臟超音波" },
    ]
  },
  imgBodySite: {
    select: [
      { code: "51185008", display: "Thorax", display_tw: "胸部" },
      { code: "818981001", display: "Abdomen", display_tw: "腹部" },
      { code: "12738006", display: "Brain", display_tw: "腦部" },
      { code: "302551006", display: "Entire thorax", display_tw: "全胸腔" },
    ]
  },
  modality: {
    select: [
      { code: "CT", display: "Computed Tomography" },
      { code: "MR", display: "Magnetic Resonance" },
      { code: "US", display: "Ultrasound" },
      { code: "CR", display: "Computed Radiography" },
      { code: "PT", display: "Positron emission tomography" },
    ]
  },
  sopClass: {
    select: [
      { code: "1.2.840.10008.5.1.4.1.1.2", display: "CT Image Storage" },
      { code: "1.2.840.10008.5.1.4.1.1.4", display: "MR Image Storage" },
      { code: "1.2.840.10008.5.1.4.1.1.6.1", display: "US Image Storage" },
    ]
  },
  "noDicomData.contentType": {
    select: [
      { code: "application/pdf", display: "PDF" },
      { code: "image/jpeg", display: "JPEG" },
      { code: "image/png", display: "PNG" },
    ]
  },
  assessItem: {
    select: [
      { code: "399390009", display: "TNM tumor staging", display_tw: "TNM腫瘤分期", assessScoreType: "string" },
      { code: "385361009", display: "ECOG performance status", display_tw: "ECOG體能狀態", assessScoreType: "select" },
      { code: "273249006", display: "Assessment finding", display_tw: "評估發現", assessScoreType: "number" },
    ]
  },
  assessScore: {
    select: [
      { code: "0", display: "0 - Fully active" },
      { code: "1", display: "1 - Restricted" },
      { code: "2", display: "2 - Ambulatory" },
      { code: "3", display: "3 - Limited self-care" },
      { code: "4", display: "4 - Completely disabled" },
      { code: "5", display: "5 - Dead" },
    ]
  },
  reportType: {
    select: [
      { code: "66117-3", display: "Pathology report", display_tw: "病理報告" },
      { code: "11502-2", display: "Laboratory report", display_tw: "實驗室報告" },
      { code: "18842-5", display: "Discharge summary", display_tw: "出院摘要" },
      { code: "47045-0", display: "Study report", display_tw: "研究報告" },
    ]
  },
  inspect: {
    select: [
      { code: "48423-8", display: "WBC & Differential", display_tw: "白血球分類計數", CLASS: "CHEM", inspectResultType: "valueQuantity" },
      { code: "26464-8", display: "WBC count", display_tw: "白血球計數", CLASS: "CHEM", inspectResultType: "valueQuantity" },
      { code: "718-7", display: "Hemoglobin", display_tw: "血紅素", CLASS: "CHEM", inspectResultType: "valueQuantity" },
      { code: "24323-8", display: "Comprehensive metabolic panel", display_tw: "綜合代謝檢驗套組", CLASS: "PANEL" },
      { code: "58410-2", display: "CBC panel", display_tw: "全血球計數套組", CLASS: "PANEL" },
    ]
  },
  inspectResultCode: {
    select: [
      { code: "H", display: "High" },
      { code: "L", display: "Low" },
      { code: "N", display: "Normal" },
      { code: "A", display: "Abnormal" },
    ]
  },
  consultValueCat: {
    select: [
      { code: "normal", display: "Normal Range" },
      { code: "critical", display: "Critical Range" },
      { code: "absolute", display: "Absolute Range" },
    ]
  },
  patAst: {
    select: [
      { code: "88020-3", display: "Functional Assessment", display_tw: "功能評估", patAstResult: [] },
      { code: "72166-2", display: "Tobacco smoking status", display_tw: "吸菸狀態", patAstResult: [
        { code: "449868002", display: "Current every day smoker" },
        { code: "428041000124106", display: "Current some day smoker" },
        { code: "8392000", display: "Non-smoker" },
      ]},
      { code: "89555-7", display: "Pain severity", display_tw: "疼痛嚴重度", patAstResult: [
        { code: "0", display: "No pain (0)" },
        { code: "1-3", display: "Mild (1-3)" },
        { code: "4-6", display: "Moderate (4-6)" },
        { code: "7-10", display: "Severe (7-10)" },
      ]},
    ]
  },
  drugType: {
    select: [
      { code: "Y", display: "自費" },
      { code: "N", display: "健保" },
    ]
  },
  eReason: {
    select: [
      { code: "死亡", display: "死亡" },
      { code: "副作用", display: "副作用" },
      { code: "疾病進展", display: "疾病進展" },
      { code: "治療完成", display: "治療完成" },
      { code: "病人要求", display: "病人要求" },
    ]
  },
  drugStatus: {
    select: [
      { code: "active", display: "Active" },
      { code: "completed", display: "Completed" },
      { code: "stopped", display: "Stopped" },
      { code: "on-hold", display: "On Hold" },
    ]
  },
  doseUnit: {
    select: [
      { code: "MG", display: "MG" },
      { code: "ML", display: "ML" },
      { code: "MCG", display: "MCG" },
      { code: "G", display: "G" },
      { code: "IU", display: "IU" },
    ]
  },
  drugFre: {
    select: [
      { code: "QD", display: "QD - 每日一次" },
      { code: "BID", display: "BID - 每日兩次" },
      { code: "TID", display: "TID - 每日三次" },
      { code: "QID", display: "QID - 每日四次" },
      { code: "Q8H", display: "Q8H - 每8小時" },
      { code: "Q12H", display: "Q12H - 每12小時" },
      { code: "AC1H", display: "AC1H - 飯前一小時" },
      { code: "PC", display: "PC - 飯後" },
      { code: "HS", display: "HS - 睡前" },
      { code: "PRN", display: "PRN - 需要時" },
    ]
  },
  drugRoute: {
    select: [
      { code: "PO", display: "PO - 口服" },
      { code: "IV", display: "IV - 靜脈注射" },
      { code: "IM", display: "IM - 肌肉注射" },
      { code: "SC", display: "SC - 皮下注射" },
      { code: "SL", display: "SL - 舌下" },
      { code: "TOP", display: "TOP - 外用" },
    ]
  },
  rtStatus: {
    select: [
      { code: "preparation", display: "Preparation" },
      { code: "in-progress", display: "In Progress" },
      { code: "completed", display: "Completed" },
      { code: "not-done", display: "Not Done" },
    ]
  },
  rt: {
    select: [
      { code: "D712B9Z", display: "Radiation Therapy, Chest Wall", display_tw: "胸壁放射治療" },
      { code: "D0010ZZ", display: "Beam Radiation of Brain", display_tw: "腦部放射治療" },
      { code: "D7010ZZ", display: "Beam Radiation of Lymphatics", display_tw: "淋巴放射治療" },
    ]
  },
  rtUnit: {
    select: [
      { code: "Gy", display: "Gy - Gray" },
      { code: "cGy", display: "cGy - Centigray" },
      { code: "mGy", display: "mGy - Milligray" },
    ]
  },
  genTestCode: {
    select: [
      { code: "21637-4", display: "EGFR gene" },
      { code: "21638-2", display: "ALK gene" },
      { code: "21639-0", display: "ROS1 gene" },
      { code: "21640-8", display: "BRAF gene" },
      { code: "21641-6", display: "KRAS gene" },
    ]
  },
  mutationType: {
    select: [
      { code: "LA6692-3", display: "Deletion" },
      { code: "LA6686-5", display: "Insertion" },
      { code: "LA6689-9", display: "Substitution" },
      { code: "LA6690-7", display: "Duplication" },
    ]
  },
  specimenType: {
    select: [
      { code: "LP7057-5", display: "Tissue" },
      { code: "LP7567-4", display: "Blood" },
      { code: "LP7068-2", display: "Plasma" },
      { code: "LP7160-7", display: "Serum" },
    ]
  },
  genMethod: {
    select: [
      { code: "PCR", display: "PCR" },
      { code: "NGS", display: "NGS" },
      { code: "FISH", display: "FISH" },
      { code: "IHC", display: "IHC" },
      { code: "Sanger", display: "Sanger Sequencing" },
    ]
  },
  genInterpretation: {
    select: [
      { code: "POS", display: "Positive" },
      { code: "NEG", display: "Negative" },
      { code: "IND", display: "Indeterminate" },
    ]
  },
  txAst: {
    select: [
      { code: "ICLL", display: "iwCLL criteria" },
      { code: "RECIST", display: "RECIST 1.1" },
      { code: "iRECIST", display: "iRECIST" },
      { code: "mRECIST", display: "mRECIST" },
    ]
  },
  applyReason: {
    select: [
      { code: "C50P1", display: "乳癌 Paclitaxel 適應症", cancerDrugType: [
        { code: "KC01123243", display: "KC01123243 - Paclitaxel 注射劑" },
        { code: "KC00987654", display: "KC00987654 - Docetaxel 注射劑" },
      ]},
      { code: "C34P2", display: "肺癌 Gefitinib 適應症", cancerDrugType: [
        { code: "KC02234567", display: "KC02234567 - Gefitinib 250mg" },
        { code: "KC02345678", display: "KC02345678 - Erlotinib 150mg" },
      ]},
      { code: "other", display: "其他" },
    ]
  },
  outcome: {
    select: [
      { code: "complete", display: "Complete" },
      { code: "partial", display: "Partial" },
      { code: "queued", display: "Queued" },
      { code: "error", display: "Error" },
    ]
  },
  adjudicationCode: {
    select: [
      { code: "eligible", display: "Eligible" },
      { code: "benefit", display: "Benefit" },
      { code: "deductible", display: "Deductible" },
      { code: "copay", display: "Copay" },
    ]
  },
  approveComment: {
    select: [
      { code: "1", display: "1 - 核准" },
      { code: "2", display: "2 - 部分核准" },
      { code: "3", display: "3 - 不核准" },
      { code: "4", display: "4 - 補件" },
    ]
  },
  applDrugFre: {
    select: [
      { code: "QD", display: "QD - 每日一次" },
      { code: "BID", display: "BID - 每日兩次" },
      { code: "TID", display: "TID - 每日三次" },
      { code: "QID", display: "QID - 每日四次" },
      { code: "Q8H", display: "Q8H - 每8小時" },
      { code: "AC1H", display: "AC1H - 飯前一小時" },
      { code: "PRN", display: "PRN - 需要時" },
    ]
  },
  applDrugRoute: {
    select: [
      { code: "PO", display: "PO - 口服" },
      { code: "IV", display: "IV - 靜脈注射" },
      { code: "IM", display: "IM - 肌肉注射" },
      { code: "SC", display: "SC - 皮下注射" },
    ]
  },
  applDosageUnit: {
    select: [
      { code: "MG", display: "MG" },
      { code: "ML", display: "ML" },
      { code: "MCG", display: "MCG" },
      { code: "vial", display: "vial" },
      { code: "tab", display: "tab" },
      { code: "cap", display: "cap" },
    ]
  },
  orderType: {
    select: [
      { code: "1", display: "藥品" },
      { code: "2", display: "診療" },
      { code: "3", display: "特材" },
    ]
  },
  cancerDrugType: {
    select: [
      { code: "KC01123243", display: "KC01123243 - Paclitaxel" },
      { code: "KC00987654", display: "KC00987654 - Docetaxel" },
      { code: "KC02234567", display: "KC02234567 - Gefitinib" },
    ]
  },
};

export function getMockCodeMapping(code: string): SelOptionType<any> {
  return mockMappings[code] ?? { select: [] };
}
