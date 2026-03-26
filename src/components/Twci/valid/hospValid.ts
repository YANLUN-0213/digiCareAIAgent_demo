export const formValidationRules = {
  hosp: {
    hospId: {
      required: { value: true, message: "醫事機構代碼為必填" },
      maxLength: { value: 10, message: "醫事機構代碼不可超過10個字元" },
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "醫事機構代碼只能包含英數字",
      },
    },
    applMode: {
      required: { value: true, message: "申報方式為必填" },
      maxLength: { value: 1, message: "申報方式限1個字元" },
    },
    applType: {
      required: { value: true, message: "申報類別為必填" },
      maxLength: { value: 1, message: "申報類別限1個字元" },
    },
    applDate: {
      required: { value: true, message: "申請日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的日期";
        },
      },
    },
    medCertBookDate: {
      required: { value: true, message: "開立診斷書申請日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的日期";
        },
      },
    },
    acptNo: {
      required: { value: true, message: "受理編號為必填" },
    },
    acptNum: {
      required: { value: true, message: "受理次數為必填" },
    },
  },
};
