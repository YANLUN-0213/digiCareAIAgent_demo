export const formValidationRules = {
  hosp:{
    hospId: {
    required: { value: true, message: "醫事機構代碼為必填" },
    maxLength: { value: 10, message: "醫事機構代碼不可超過10個字元" },
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "醫事機構代碼只能包含英數字"
    }
  },
  applType: {
    required: { value: true, message: "申報類別為必填" },
    maxLength: { value: 1, message: "申報類別限1個字元" },
    pattern: {
      value: /^[A-Za-z0-9]$/,
      message: "申報類別格式錯誤"
    }
  },
  funcType: {
    required: { value: true, message: "就醫科別為必填" },
    maxLength: { value: 14, message: "就醫科別不可超過14個字元" }
  },
  actCode: {
    required:false,
  },
  applPrsnId: {
    required: { value: true, message: "申請醫師身分證號為必填" },
    maxLength: { value: 10, message: "身分證號限10個字元" },
    validate: (value: string) => {
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  },
  applDate: {
    required: { value: true, message: "申請日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的日期";
      },
    }
  },
  immediateDate: {
    required: false,
    pattern: {
        value: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/,
        message: "日期格式錯誤（應為 YYYY-MM-DDTHH:MM:SS）"
    },
    validate: {
      isValidDate: (value: string) => {
        const v = value?.trim?.();
        if (!v) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的日期";
      }
    }
  },
  tmhbType: {
    required: { value: true, message: "申請案件類別為必填" },
    maxLength: { value: 1, message: "申請案件類別限1個字元" },
    pattern: {
      value: /^[A-Za-z0-9]$/,
      message: "申請案件類別格式錯誤"
    }
  },
  oldAcptNo: {
    required: false,
    maxLength: { value: 20, message: "原受理編號不可超過20個字元" }
  }
  }
};
