import { SelOptionType } from '../components/Twci/type/twciform';

const mockMappings: Record<string, SelOptionType<any>> = {
  'questionnaireResponse.hosp.applMode': {
    select: [
      { code: "1", display: "民眾自辦" },
      { code: "2", display: "院所代辦" },
    ],
  },
  'questionnaireResponse.hosp.applType': {
    select: [
      { code: "1", display: "送核" },
      { code: "2", display: "送核補件" },
      { code: "3", display: "申復" },
      { code: "4", display: "爭議審議" },
    ],
  },
  'patient.zipCode': {
    select: [
      { code: "100", display: "中正區" },
      { code: "103", display: "大同區" },
      { code: "104", display: "中山區" },
      { code: "105", display: "松山區" },
      { code: "106", display: "大安區" },
      { code: "108", display: "萬華區" },
      { code: "110", display: "信義區" },
      { code: "111", display: "士林區" },
      { code: "112", display: "北投區" },
      { code: "114", display: "內湖區" },
      { code: "115", display: "南港區" },
      { code: "116", display: "文山區" },
      { code: "200", display: "仁愛區" },
      { code: "220", display: "板橋區" },
      { code: "235", display: "中和區" },
      { code: "241", display: "三重區" },
      { code: "300", display: "東區(新竹)" },
      { code: "330", display: "桃園區" },
      { code: "400", display: "中區(台中)" },
      { code: "500", display: "彰化市" },
      { code: "600", display: "嘉義市東區" },
      { code: "700", display: "中西區(台南)" },
      { code: "800", display: "新興區(高雄)" },
      { code: "900", display: "屏東市" },
    ],
  },
  'patient.gender': {
    select: [
      { code: "male", display: "男性" },
      { code: "female", display: "女性" },
      { code: "other", display: "其他" },
      { code: "unknown", display: "未知" },
    ],
  },
  'condition.clinicalStatus': {
    select: [
      { code: "active", display: "Active" },
      { code: "recurrence", display: "Recurrence" },
      { code: "relapse", display: "Relapse" },
      { code: "inactive", display: "Inactive" },
      { code: "remission", display: "Remission" },
      { code: "resolved", display: "Resolved" },
    ],
  },
  'condition.verificationStatus': {
    select: [
      { code: "unconfirmed", display: "Unconfirmed" },
      { code: "provisional", display: "Provisional" },
      { code: "differential", display: "Differential" },
      { code: "confirmed", display: "Confirmed" },
      { code: "refuted", display: "Refuted" },
      { code: "entered-in-error", display: "Entered in Error" },
    ],
  },
  'condition.severity': {
    select: [
      { code: "24484000", display: "Severe" },
      { code: "6736007", display: "Moderate" },
      { code: "255604002", display: "Mild" },
    ],
  },
  'questionnaireResponse.cancerStage.cancerStage': {
    select: [
      { code: "0", display: "Stage 0 (原位癌)" },
      { code: "1", display: "Stage I (第一期)" },
      { code: "2", display: "Stage II (第二期)" },
      { code: "3", display: "Stage III (第三期)" },
      { code: "4", display: "Stage IV (第四期)" },
      { code: "4A", display: "Stage IVA" },
      { code: "4B", display: "Stage IVB" },
      { code: "4C", display: "Stage IVC" },
    ],
  },
  'questionnaireResponse.diagnosis.icd10cmCode': {
    select: [
      { code: "C00.0", display: "外唇惡性腫瘤" },
      { code: "C15.9", display: "食道惡性腫瘤" },
      { code: "C16.9", display: "胃惡性腫瘤" },
      { code: "C18.9", display: "結腸惡性腫瘤" },
      { code: "C20", display: "直腸惡性腫瘤" },
      { code: "C22.0", display: "肝細胞癌" },
      { code: "C25.9", display: "胰臟惡性腫瘤" },
      { code: "C34.90", display: "支氣管和肺惡性腫瘤" },
      { code: "C43.9", display: "皮膚惡性黑色素瘤" },
      { code: "C49.4", display: "腹部結締組織惡性腫瘤" },
      { code: "C49.6", display: "軀幹結締組織惡性腫瘤" },
      { code: "C50.919", display: "女性乳房惡性腫瘤" },
      { code: "C53.9", display: "子宮頸惡性腫瘤" },
      { code: "C56.9", display: "卵巢惡性腫瘤" },
      { code: "C61", display: "前列腺惡性腫瘤" },
      { code: "C64.9", display: "腎臟惡性腫瘤" },
      { code: "C67.9", display: "膀胱惡性腫瘤" },
      { code: "C71.9", display: "腦惡性腫瘤" },
      { code: "C73", display: "甲狀腺惡性腫瘤" },
      { code: "C82.90", display: "濾泡性淋巴瘤" },
      { code: "C83.30", display: "瀰漫性大B細胞淋巴瘤" },
      { code: "C91.00", display: "急性淋巴性白血病" },
      { code: "C92.00", display: "急性骨髓性白血病" },
    ],
  },
  'questionnaireResponse.illness.oriCancerAjcc': {
    select: [
      { code: "0", display: "Stage 0" },
      { code: "1", display: "Stage I" },
      { code: "1A", display: "Stage IA" },
      { code: "1B", display: "Stage IB" },
      { code: "2", display: "Stage II" },
      { code: "2A", display: "Stage IIA" },
      { code: "2B", display: "Stage IIB" },
      { code: "3", display: "Stage III" },
      { code: "3A", display: "Stage IIIA" },
      { code: "3B", display: "Stage IIIB" },
      { code: "3C", display: "Stage IIIC" },
      { code: "4", display: "Stage IV" },
      { code: "4A", display: "Stage IVA" },
      { code: "4B", display: "Stage IVB" },
      { code: "9", display: "其他系統分期" },
    ],
  },
  'questionnaireResponse.illness.cancerStatus': {
    select: [
      { code: "1", display: "初次診斷" },
      { code: "2", display: "穩定追蹤中" },
      { code: "3", display: "治療中" },
      { code: "4", display: "緩解中" },
      { code: "5", display: "復發" },
      { code: "6", display: "惡化" },
      { code: "7", display: "末期" },
    ],
  },
  'questionnaireResponse.illness.cancerTreatment': {
    select: [
      { code: "1", display: "需定期返診追蹤檢查" },
      { code: "2", display: "癌症從未disease-free須持續治療" },
      { code: "3", display: "癌症根治性治療後的輔助性治療(包括乳癌荷爾蒙治療)" },
      { code: "4", display: "癌症復發治療" },
      { code: "5", display: "癌症後遺症及併發症治療" },
    ],
  },
  'questionnaireResponse.illness.cancerTreatmentPlan': {
    select: [
      { code: "1", display: "手術治療" },
      { code: "2", display: "放射線治療" },
      { code: "3", display: "化學治療" },
      { code: "4", display: "標靶治療" },
      { code: "5", display: "荷爾蒙治療" },
      { code: "6", display: "緩和治療" },
      { code: "7", display: "其他" },
    ],
  },
};

export function getMockTwciCodeMapping(key: string): SelOptionType {
  return mockMappings[key] ?? { select: [] };
}
