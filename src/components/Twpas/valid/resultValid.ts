// 表單驗證規則 - 新增欄位
export const formValidationRules = {
  // 治療後疾病狀態評估項目 - 文字 12 非必填
  txAst: {
    required: { value: true, message: "治療後疾病狀態評估項目為必填" },
    maxLength: { value: 12, message: "治療後疾病狀態評估項目不可超過12個字元" },
    pattern: {
      value: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 英數或中文
      message: "治療後疾病狀態評估項目格式錯誤（僅限中英數字）"
    }
  },

  // 治療後疾病狀態評估結果 - 文字 100 非必填
  txAstResult: {
    required: { value: true, message: "治療後疾病狀態評估結果為必填" },
    maxLength: { value: 100, message: "治療後疾病狀態評估結果不可超過100個字元" }
  },

  // 治療後疾病狀態評估日期 - 日期 10 非必填
  txAstDate: {
    required: { value: true, message: "評估結果為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "日期格式錯誤（應為YYYY-MM-DD）"
    },
    validate: {
      isValidDate: (value: string) => {
        const v = value?.trim?.();
        if (!v) return true; // 非必填，可空值

        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的日期";
      }
    }
  }
};
