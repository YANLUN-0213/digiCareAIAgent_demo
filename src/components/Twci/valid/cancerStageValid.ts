export const formValidationRules = {
  assessScore: {
    maxLength: { value: 12, message: "癌症分期分數或結果不可超過12個字" },
  },
  cancerStage: {
    required: { value: true, message: "癌症期別為必填" },
  },
  assessDate: {
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
};
