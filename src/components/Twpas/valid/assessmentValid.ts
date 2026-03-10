export const formValidationRules = {
  evaluate:{
      // 檢驗(查)名稱或套組代碼 - 文字 12 非必填
  inspect: {
    required: { value: true, message: "檢驗(查)名稱或套組代碼為必填" },
    maxLength: { value: 12, message: "檢驗(查)名稱或套組代碼不可超過12個字元" }
  },

  // 檢驗(查)結果代碼 - 文字 12 非必填
  inspectResultCode: {
    required: false,
  },

  // 檢驗(查)結果判讀 - 文字 15 非必填
  inspectResultTxt: {
    required: false,
    maxLength: { value: 15, message: "檢驗(查)結果判讀不可超過15個字元" }
  },

  // 檢驗(查)結果 - 文字 2000 非必填
  inspectResult: {
    required: false,
    maxLength: { value: 2000, message: "檢驗(查)結果不可超過2000個字元" }
  },

  // 檢驗(查)結果 如果是 inspectSet 裡面的要必填
  inspectResultSet: {
    required: {value:true, message:"檢驗套組中的檢驗(查)結果為必填"},
    maxLength: { value: 2000, message: "檢驗(查)結果不可超過2000個字元" }
  },

  // 檢驗(查)結果之參考範圍下限 - 文字 1000 非必填
  consultValueLower: {
    valueAsNumber: true,
    required: false,
    maxLength: { value: 1000, message: "參考範圍下限不可超過1000個字元" }
  },

  // 檢驗(查)結果之參考範圍上限 - 文字 1000 非必填
  consultValueMax: {
    valueAsNumber: true,
    required: false,
    maxLength: { value: 1000, message: "參考範圍上限不可超過1000個字元" }
  },

  // 檢驗(查)結果之參考範圍類型 - 文字 1000 非必填
  consultValueCat: {
    required: false,
    maxLength: { value: 1000, message: "參考範圍類型不可超過1000個字元" }
  },

  // 檢驗(查)結果之參考範圍說明 - 文字 1000 非必填
  consultValueDesc: {
    required: false,
    maxLength: { value: 1000, message: "參考範圍說明不可超過1000個字元" }
  },

  // 套組中的的檢驗 - 文字 12 非必填
  inspectSet: {
    required: false,
    maxLength: { value: 12, message: "套組中的的檢驗不可超過12個字元" }
  },

  // 檢驗(查)報告日期 - 日期 10 非必填
  caseTime: {
    required: { value: true, message: "檢驗(查)報告日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "檢驗(查)報告日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的檢驗(查)報告日期";
      }
    }
  },

  // 檢驗(查)附件（檔案路徑） - 文字 50 非必填
  inspectPdf: {
    required: false,
    maxLength: { value: 50, message: "附件路徑不可超過50個字元" }
  },

  // 檢驗(查)附件名稱 - 文字 50 非必填
  inspectPdfTitle: {
    required: false,
    maxLength: { value: 50, message: "附件名稱不可超過50個字元" }
  },

  // 簽發報告醫事人員身分證號 - 文字 10 非必填
  inspectPerformer: {
    required: { value: true, message: "簽發檢驗(查)報告醫事人員身分證號為必填" },
    maxLength: { value: 10, message: "醫事人員身分證號不可超過10個字元" },
    validate: (value: string) => {
        const nationalId = /^[A-Z][12]\d{8}$/;
        const newResidentId = /^[A-Z][89]\d{8}$/;
        const oldResidentId = /^[A-Z]{2}\d{8}$/;
        const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
        return valid || "請輸入有效的身份證號或統一證號";
      }
  },

  // 病人狀態評估項目代碼 - 文字 12 非必填
  patAst: {
    required: { value: true, message: "病人狀態評估項目代碼為必填" },
    maxLength: { value: 12, message: "病人狀態評估項目代碼不可超過12個字元" }
  },

  // 病人狀態評估結果 - 文字 1000 非必填
  patAstResult: {
    required: { value: true, message: "	病人狀態評估結果為必填" },
    maxLength: { value: 1000, message: "病人狀態評估結果不可超過1000個字元" }
  },

  // 病人狀態評估日期 - 日期 10 非必填
  patAstDate: {
    required: { value: true, message: "病人狀態評估日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "病人狀態評估日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        // if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的病人狀態評估日期";
      }
    }
  },

  // 評估項目醫事人員身分證號 - 文字 10 非必填
  patAstPerformer: {
    required: { value: true, message: "評估項目醫事人員身分證號為必填" },
    maxLength: { value: 10, message: "醫事人員身分證號不可超過10個字元" },
    validate: (value: string) => {
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  }
  }

};
