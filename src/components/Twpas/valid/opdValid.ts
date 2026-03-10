export const formValidationRules = {
  funcDate: {
    required: { value: true, message: "門診日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的門診日期";
      },
    }
  },
  prsnId: {
    required: { value: true, message: "門診醫師身分證號為必填" },
    maxLength: { value: 10, message: "身分證號不可超過10個字元" },
    validate: (value: string) => {
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  },
  required: {
    required: { value: true, message: "必填" },
  },
};
