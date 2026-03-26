export const formValidationRules = {
  clinicalStatus: {
    required: { value: true, message: "病情、問題或診斷的臨床狀態為必填" },
  },
  verificationStatus: {
    required: false,
  },
  severity: {
    required: false,
  },
  bodySite: {
    required: false,
  },
  recordedDate: {
    required: false,
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "日期格式錯誤（應為YYYY-MM-DD）",
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value) return true;
        const date = new Date(value);
        const isValid = !isNaN(date.getTime());
        return isValid || "請輸入有效的日期";
      },
    },
  },
};
