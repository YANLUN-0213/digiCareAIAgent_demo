export const formValidationRules = {
  patient:{
  patId: {
    required: false,
    maxLength: { value: 20, message: "病歷號不可超過20個字元" }
  },
  name: {
    required: { value: true, message: "姓名為必填" },
    maxLength: { value: 40, message: "姓名不可超過40個字元" }
  },
  idCard: {
    required: { value: true, message: "身分證號為必填" },
    maxLength: { value: 10, message: "身分證號不可超過10個字元" },
    validate: (value: string) => {
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  },
  birthday: {
    required: { value: true, message: "出生日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "出生日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的出生日期";
      }
    }
  },
  gender: {
    required: { value: true, message: "病人性別為必填" },
    maxLength: { value: 7, message: "病人性別不可超過7個字元" }
  },
  weight: {
    required: { value: true, message: "病人體重為必填" },
    pattern: {
      value: /^\d{1,3}(\.\d{1,2})?$/,
      message: "病人體重格式錯誤（整數最多3位，小數最多2位）"
    }
  },
  height: {
    required: { value: true, message: "病人身高為必填" },
    pattern: {
      value: /^\d{1,3}(\.\d{1,2})?$/,
      message: "病人身高格式錯誤（整數最多3位，小數最多2位）"
    }
  },
  pregnant: {
    required: false,
    maxLength: { value: 5, message: "此欄位不可超過5個字元" }
  },
  required: {
    required: { value: true, message: "必填" },
  },
  recorder: {
    required:false,
    maxLength: { value: 10, message: "紀錄者身分證號不可超過10個字元" },
    validate: (value: string) => {
      if (!value) return true;
      const nationalId = /^[A-Z][12]\d{8}$/;
      const newResidentId = /^[A-Z][89]\d{8}$/;
      const oldResidentId = /^[A-Z]{2}\d{8}$/;
      const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
      return valid || "請輸入有效的身份證號或統一證號";
    }
  },
  recordedDate: {
    required: false,
    validate: (value: string) => {
      if (!value) return true;
      const pattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!pattern.test(value)) return "日期格式錯誤（應為YYYY-MM-DD）";
      const date = new Date(value);
      const isValid = !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
      return isValid || "請輸入有效的日期";
    }
  },
  }
};
