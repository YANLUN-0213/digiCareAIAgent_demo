export const formValidationRules = {
  // 藥品代碼 - 文字 12 必填
  drugCode: {
    required: { value: true, message: "藥品代碼為必填" },
    maxLength: { value: 12, message: "藥品代碼不可超過12個字元" },
  },

  // 自費註記 - 文字 1
  drugType: {
    required: false,
    // maxLength: { value: 1, message: "自費註記不可超過1個字元" },
  },

  // 藥物使用狀態 - 文字 2000 非必填
  drugStatus: {
    required: { value: true, message: "藥物使用狀態為必填" },
    maxLength: { value: 2000, message: "藥物使用狀態不可超過2000個字元" },
  },

  // 藥品使用頻率及服用時間 - 文字 12 非必填
  drugFre: {
    required: { value: true, message: "藥品使用頻率及服用時間為必填" },
    maxLength: { value: 12, message: "藥品使用頻率及服用時間不可超過12個字元" },
  },

  // 給藥途徑/作用部位 - 文字 10 非必填
  drugRoute: {
    required: { value: true, message: "給藥途徑/作用部位為必填" },
    maxLength: { value: 10, message: "給藥途徑/作用部位不可超過10個字元" },
  },

  // 藥物每次處方劑量 - 數字 20 非必填
  dose: {
    required: { value: true, message: "劑量為必填" },
    pattern: {
      value: /^[0-9.]+$/,
      message: "劑量請輸入有效的數字",
    },
    maxLength: { value: 20, message: "藥物劑量不可超過20個字元" },
  },

  // 藥物每次處方劑量單位 - 文字 無長度限制 非必填
  doseUnit: {
    required: { value: true, message: "劑量單位為必填" },
  },

  // 藥物處方起始日期 - 日期 10 非必填
  sDate: {
    required: { value: true, message: "起始日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "起始日期格式錯誤（應為YYYY-MM-DD）",
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的起始日期";
      },
    },
  },

  // 藥物處方終止日期 - 日期 10 非必填
  eDate: {
    required: { value: true, message: "終止日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "終止日期格式錯誤（應為YYYY-MM-DD）",
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的終止日期";
      },
    },
  },

  // 藥物處方終止原因 - 文字 2000 非必填
  eReason: {
    required: false,
    // maxLength: { value: 2000, message: "終止原因不可超過2000個字元" },
  },

  // 放射/照光治療狀態 - 文字 20 非必填
  rtStatus: {
    required: { value: true, message: "放射/照光治療狀態為必填" },
    maxLength: { value: 20, message: "放射/照光治療狀態不可超過20個字元" },
  },

  // 放射/照光治療項目 - 文字 20 非必填
  rt: {
    required: false,
    maxLength: { value: 20, message: "放射/照光治療項目不可超過20個字元" },
  },

  // 放射/照光治療日期 - 日期 10 非必填
  realInspectTime: {
    required: { value: true, message: "治療日期為必填" },
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "治療日期格式錯誤（應為YYYY-MM-DD）",
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的放射/照光治療日期";
      },
    },
  },

  // 放射/照光治療總劑量 - 數字 12 非必填
  rtDose: {
    required: { value: true, message: "放射/照光治療總劑量為必填" },
    pattern: {
      value: /^[0-9.]+$/,
      message: "劑量請輸入有效的數字",
    },
    maxLength: { value: 12, message: "總劑量不可超過12個字元" },
  },

  // 放射/照光治療總劑量單位 - 文字 12 非必填
  rtUnit: {
    required: { value: true, message: "放射/照光治療總劑量單位為必填" },
    maxLength: { value: 12, message: "總劑量單位不可超過12個字元" },
  },

  // 手術項目 - 文字 20 非必填
  opCode: {
    required: false,
    maxLength: { value: 20, message: "手術項目不可超過20個字元" },
  },

  // 手術日期 - 日期 10 非必填
  opDate: {
    required: false,
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: "手術日期格式錯誤（應為YYYY-MM-DD）",
    },
    validate: {
      isValidDate: (value: string) => {
        if (!value?.trim()) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) || "請輸入有效的手術日期";
      },
    },
  },

  // 治療計畫文件路徑 - 文字 50 非必填
  carePlanDocPdf: {
    required: false,
    maxLength: { value: 50, message: "治療計畫文件路徑不可超過50個字元" },
  },

  // 治療計畫文件名稱 - 文字 50 非必填
  carePlanDocTitle: {
    required: false,
    maxLength: { value: 50, message: "治療計畫文件名稱不可超過50個字元" },
  },
};
