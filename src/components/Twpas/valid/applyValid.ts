export const formValidationRules = {
  applyReason: {
    required: { value: true, message: "給付適應症條件為必填" },
    maxLength: { value: 4000, message: "不可超過 4000 字元" },
  },
  lot: {
    required: false,
    maxLength: { value: 1, message: "不可超過 1 個字元" },
  },
  continuation: {
    required: { value: true, message: "續用註記為必填" },
    maxLength: { value: 1, message: "不可超過 1 個字元" },
  },
  orderType: {
    required: { value: true, message: "醫令類別為必填" },
    maxLength: { value: 1, message: "不可超過 1 個字元" },
  },
  cancerDrugType: {
    required: { value: true, message: "事前審查品項代碼為必填" },
    maxLength: { value: 12, message: "不可超過 12 個字元" },
  },
  applySide: {
    required: false,
    maxLength: { value: 1, message: "不可超過 1 個字元" },
  },
  applQty: {
    required: { value: true, message: "申請數量為必填" },
    max: { value: 99999999999, message: "不可超過 11 位數字" },
    valueAsNumber: true,
    min: { value: 0, message: "不可為負數"},
  },
  applQtyUnit: {
    required: { value: true, message: "申請數量單位為必填" },
    // maxLength: { value: 4, message: "不可超過 4 個字元" },
  },
  applDrugCycle: {
    max: { value: 999999999999, message: "不可超過 12 位數字" },
    required: false,
    valueAsNumber: true,
    min: { value: 0,message: "不可為負數",},
  },
  applDosage: {
    required: { value: true, message: "每次處方劑量為必填" },
    valueAsNumber: true,
    min: { value: 0,message: "不可為負數",}
  },
  applDosageUnit: {
    required: { value: true, message: "劑量單位為必填" },
    // maxLength: { value: 4, message: "不可超過 4 個字元" },
  },
  useSdate: {
    required: { value: true, message: "預定起始日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "請輸入正確日期格式 (YYYY-MM-DD)",
    },
  },
  useEdate: {
    required: { value: true, message: "預定終止日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "請輸入正確日期格式 (YYYY-MM-DD)",
    },
  },
  approveDate: {
    required: false,
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "請輸入正確日期格式 (YYYY-MM-DD)",
    },
  },
  approveNum: {
    required: false,
    valueAsNumber: true,
    min: { value: 0,message: "不可為負數",},
    max: { value: 99999999999, message: "不可超過 11 位數字" },
  },
  approveComment: {
    required: false,
    maxLength: { value: 2000, message: "不可超過 2000 字元" },
  },
  applDrugFre: {
    required: { value: true, message: "使用頻率為必填" },
    maxLength: { value: 30, message: "不可超過 30 字元" },
  },
  applDrugRoute: {
    required: { value: true, message: "給藥途徑為必填" },
    maxLength: { value: 10, message: "不可超過 10 字元" },
  },
  acceptanceStatus: {
    required: false
  },
};

export const getApplyFormValidationRules = (isRequired: boolean) => ({
  approveDate: {
    required: isRequired ? "核定日期為必填" : false,
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "請輸入正確日期格式 (YYYY-MM-DD)",
    },
  },
  approveNum: {
    required: isRequired ? "審查結果數量為必填" : false,
    valueAsNumber: true,
    min: { value: 0, message: "不可為負數" },
    max: { value: 99999999999, message: "不可超過 11 位數字" },
  },
  approveComment: {
    required: isRequired ? "核定註記為必填" : false,
    maxLength: { value: 2000, message: "不可超過 2000 字元" },
  },
  outcome: {
    required: isRequired ? "處置狀態為必填" : false
  },
  adjudicationCode: {
    required: isRequired ? "審查類型為必填" : false
  },
  requestors: {
    required: isRequired ? "審查委員身分證號為必填" : false,
    maxLength: { value: 10, message: "身分證號不可超過10個字元" },
    validate: (value: string) => {
      if(!isRequired){
        if (!value) return true; // 若為空值，通過驗證
      }
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  }
});
