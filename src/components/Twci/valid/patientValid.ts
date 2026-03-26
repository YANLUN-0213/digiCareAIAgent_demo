export const formValidationRules = {
  patient: {
    patID: {
      required: false,
      maxLength: { value: 20, message: "病歷號不可超過20個字元" },
    },
    name: {
      required: { value: true, message: "姓名為必填" },
      maxLength: { value: 12, message: "姓名不可超過12個字元" },
    },
    idCard: {
      required: { value: true, message: "身分證號為必填" },
      maxLength: { value: 10, message: "身分證號不可超過10個字元" },
      validate: (value: string) => {
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
    birthday: {
      required: { value: true, message: "出生日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "出生日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的出生日期";
        },
      },
    },
    gender: {
      required: { value: true, message: "病人性別為必填" },
      maxLength: { value: 7, message: "病人性別不可超過7個字元" },
    },
    zipCode: {
      required: { value: true, message: "郵遞區號為必填" },
      maxLength: { value: 3, message: "郵遞區號不可超過3個字元" },
    },
    contactAddr: {
      required: { value: true, message: "連絡住址為必填" },
      maxLength: { value: 80, message: "長度不得超過80字" },
    },
    mobile: {
      required: false,
      maxLength: { value: 10, message: "長度不得超過數字10碼" },
      pattern: {
        value: /^09\d{8}$/,
        message: "請輸入正確的手機號碼（需以09開頭，共10碼）",
      },
    },
    contactTel: {
      required: false,
      maxLength: { value: 15, message: "聯絡電話不得超過15碼" },
      pattern: {
        value: /^[0-9]{8,15}$/,
        message: "聯絡電話只能是數字，長度需為 8 到 15 碼",
      },
    },
    email: {
      required: false,
      maxLength: { value: 40, message: "長度不得超過40字" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "請輸入正確的電子郵件格式",
      },
    },
  },
};
