
export const formValidationRules = {
  genTestCode: {
    required: false,
    maxLength: { value: 12, message: "基因檢測代碼不可超過12個字元" },
  },
  mutationType: {
    required: false,
    maxLength: { value: 20, message: "基因突變類型不可超過20個字元" },
  },
  specimenType: {
    required: { value: true, message: "檢體類型為必填" },
    maxLength: { value: 20, message: "檢體類型不可超過20個字元" },
  },
  genMethod: {
    required: { value: true, message: "檢測方法為必填" },
    maxLength: { value: 20, message: "檢測方法不可超過20個字元" },
  },
  genDate: {
    required: { value: true, message: "檢測日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "請輸入正確日期格式 (YYYY-MM-DD)",
    },
  },
  genOrg: {
    required: { value: true, message: "檢測機構為必填" },
    maxLength: { value: 15, message: "檢測機構不可超過15個字元" },
  },
  genResult: {
    required: { value: true, message: "分析結果為必填" },
    maxLength: { value: 4000, message: "分析結果不可超過4000個字元" },
  },
  genInterpretation: {
    required: false,
    maxLength: { value: 500, message: "臨床判讀結果不可超過500個字元" },
  },
  genPdf: {
    required: false,
    maxLength: { value: 50, message: "報告路徑不可超過50個字元" },
  },
  genPdfTitle: {
    required: false,
    maxLength: { value: 50, message: "報告名稱不可超過50個字元" },
  },
};
