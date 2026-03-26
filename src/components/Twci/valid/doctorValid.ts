export const formValidationRules = {
  doctor: {
    diagPrsnName: {
      required: { value: true, message: "診斷醫師姓名為必填" },
      maxLength: { value: 12, message: "診斷醫師姓名不可超過12個字" },
    },
    diagPrsnId: {
      required: false,
      maxLength: { value: 10, message: "身分證號不可超過10個字元" },
      validate: (value: string) => {
        if (!value) return true;
        const nationalId = /^[A-Z][12]\d{8}$/;
        const newResidentId = /^[A-Z][89]\d{8}$/;
        const oldResidentId = /^[A-Z]{2}\d{8}$/;
        const valid =
          nationalId.test(value) ||
          newResidentId.test(value) ||
          oldResidentId.test(value);
        return valid || "請輸入有效的身份證號或統一證號";
      },
    },
  },
};
