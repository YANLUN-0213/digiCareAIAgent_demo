export const formValidationRules = {
  code: {
    required: false,
  },
  date: {
    required: false,
    validate: (value: string) => {
      if (!value) return true;
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) {
        return "日期格式錯誤（應為YYYY-MM-DD）";
      }
      const date = new Date(value);
      const isValidDate = !isNaN(date.getTime());
      if (!isValidDate) {
        return "請輸入有效的日期";
      }
      return true;
    },
  },
  cancerStatus: {
    required: false,
  },
  oriCancerAjcc: {
    required: false,
  },
  oriCancerAjcc1: {
    required: false,
    maxLength: {
      value: 20,
      message: "癌症最初診斷AJCC分期_補充說明欄位不可超過20個字",
    },
  },
  cancerTreatmentText: {
    required: false,
    maxLength: { value: 400, message: "補充說明不可超過400個字" },
  },
};
