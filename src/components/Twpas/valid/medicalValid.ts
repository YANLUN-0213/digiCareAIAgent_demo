export const formValidationRules = {
  diagnosis: {
    // 國際疾病分類代碼 - 文字 15 必填
    icd10cmCode: {
      required: { value: true, message: "國際疾病分類代碼為必填" },
      maxLength: { value: 15, message: "國際疾病分類代碼不可超過15個字元" },
    },

    // 診斷日期 - 日期 10 必填 (sequence=1)
    diagDate: {
      required: { value: true, message: "診斷日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "診斷日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的診斷日期";
        },
      },
    },

    diagData: {
      icd10cmCode: {
        required: { value: true, message: "國際疾病分類代碼為必填" },
        maxLength: { value: 15, message: "國際疾病分類代碼不可超過15個字元" },
      },
      diagCurrentStatus: {
        required: { value: true, message: "簡要病摘為必填" },
        // maxLength: { value: 4000, message: "簡要病摘不可超過4000個字元" }
      },
    },

    // 簡要病摘 - 文字 4000 必填
    diagCurrentStatus: {
      required: { value: true, message: "簡要病摘為必填" },
      maxLength: { value: 4000, message: "簡要病摘不可超過4000個字元" },
    },

    // 病歷資料路徑 - 文字 50 非必填
    medrec: {
      required: false,
      maxLength: { value: 50, message: "病歷資料路徑不可超過50個字元" },
    },

    // 病歷資料名稱 - 文字 50 非必填
    medrecTitle: {
      required: false,
      maxLength: { value: 50, message: "病歷資料名稱不可超過50個字元" },
    },

    // 影像報告項目 - 文字 10 必填
    imgItem: {
      required: { value: true, message: "影像報告項目為必填" },
      maxLength: { value: 10, message: "影像報告項目不可超過10個字元" },
    },

    // 影像報告結果 - 文字 4000 必填
    imgResult: {
      required: { value: true, message: "影像報告結果為必填" },
      maxLength: { value: 4000, message: "影像報告結果不可超過4000個字元" },
    },

    // 影像報告日期 - 日期 10 必填
    imgDate: {
      required: { value: true, message: "影像報告日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "影像報告日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          if (!value?.trim()) return true;
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的影像報告日期";
        },
      },
    },

    // 簽發影像報告醫師身分證號 - 文字 10 非必填
    imgInterpreter: {
      required: { value: true, message: "簽發影像報告醫師身分證號為必填" },
      maxLength: { value: 10, message: "醫師身分證號不可超過10個字元" },
      validate: (value: string) => {
        const nationalId = /^[A-Z][12]\d{8}$/;
        const newResidentId = /^[A-Z][89]\d{8}$/;
        const oldResidentId = /^[A-Z]{2}\d{8}$/;
        const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
        return valid || "請輸入有效的身份證號或統一證號";
      }
    },

    // 影像檢查的身體部位 - 文字 12 非必填
    imgBodySite: {
      required: false,
      maxLength: { value: 12, message: "影像檢查的身體部位不可超過12個字元" },
    },

    // DICOM影像 - 非必填
    imgDicom: {
      required: false,
      // 可視需要加入檔案類型檢查或路徑格式檢查
    },
    // DICOM影像實例ID 必填
    DICOM_identifier: {
      required: { value: true, message: "DICOM影像實例ID為必填" },
      // 可視需要加入檔案類型檢查或路徑格式檢查
    },

    dicomData: {
      studyUID: {
        required: { value: true, message: "Study UID為必填" },
        // 可視需要加入檔案類型檢查或路徑格式檢查
      },
      seriesUID: {
        required: { value: true, message: "Series Instance UID為必填" },
        // 可視需要加入檔案類型檢查或路徑格式檢查
      },
      sopList: {
        uid: {
          required: { value: true, message: "UID為必填" },
          // 可視需要加入檔案類型檢查或路徑格式檢查
        },
        class: {
          required: { value: true, message: "class為必填" },
          // 可視需要加入檔案類型檢查或路徑格式檢查
        },
      },
    },

    // 非DICOM影像 - 非必填
    imgNonDicom: {
      required: false,
    },

    // 癌症分期量表項目 - 文字 12 必填
    assessItem: {
      required: { value: true, message: "癌症分期量表項目為必填" },
      // maxLength: { value: 12, message: "癌症分期量表項目不可超過12個字元" },
    },

    // 癌症分期分數或結果 - 文字 12 必填
    assessScore: {
      required: { value: true, message: "癌症分期分數或結果為必填" },
      // maxLength: { value: 12, message: "癌症分期分數不可超過12個字元" },
    },

    // 癌症分期評估日期 - 日期 10 非必填
    assessDate: {
      required: { value: true, message: "癌症分期量表評估日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "癌症分期評估日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          if (!value?.trim()) return true;
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的癌症分期評估日期";
        },
      },
    },

    // 簽發癌症分期報告醫師身分證號 - 文字 10 必填
    assessPerformer: {
      required: { value: true, message: "簽發癌症分期報告醫師身分證號為必填" },
      maxLength: { value: 10, message: "醫師身分證號不可超過10個字元" },
      validate: (value: string) => {
        const nationalId = /^[A-Z][12]\d{8}$/;
        const newResidentId = /^[A-Z][89]\d{8}$/;
        const oldResidentId = /^[A-Z]{2}\d{8}$/;
        const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
        return valid || "請輸入有效的身份證號或統一證號";
      }
    },

    // 報告類型 - 文字 12 必填
    reportType: {
      required: { value: true, message: "報告類型為必填" },
      maxLength: { value: 12, message: "報告類型不可超過12個字元" },
    },

    // 檢體種類 - 文字 20 非必填
    speType: {
      required: false,
      maxLength: { value: 20, message: "檢體種類不可超過20個字元" },
    },

    // 報告結果文字 - 文字 4000 非必填
    reportResultString: {
      required: { value: true, message: "檢查報告結果(文數字)為必填" },
      maxLength: { value: 4000, message: "報告結果不可超過4000個字元" },
    },

    // 檢查報告檔案路徑 - 文字 50 非必填
    reportResultPdf: {
      required: false,
      maxLength: { value: 50, message: "檢查報告檔案路徑不可超過50個字元" },
    },

    // 檢查報告名稱 - 文字 20 非必填
    reportResultPdfTitle: {
      required: false,
      maxLength: { value: 20, message: "檢查報告名稱不可超過20個字元" },
    },

    // 報告日期 - 日期 10 非必填
    reportDate: {
      required: { value: true, message: "報告日期為必填" },
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "報告日期格式錯誤（應為YYYY-MM-DD）",
      },
      validate: {
        isValidDate: (value: string) => {
          if (!value?.trim()) return true;
          const date = new Date(value);
          return !isNaN(date.getTime()) || "請輸入有效的報告日期";
        },
      },
    },

    // 檢查報告醫師身分證號 - 文字 10 必填
    reportPerformer: {
      required: { value: true, message: "檢查報告醫師身分證號為必填" },
      maxLength: { value: 10, message: "醫師身分證號不可超過10個字元" },
      validate: (value: string) => {
        const nationalId = /^[A-Z][12]\d{8}$/;
        const newResidentId = /^[A-Z][89]\d{8}$/;
        const oldResidentId = /^[A-Z]{2}\d{8}$/;
        const valid = nationalId.test(value) || newResidentId.test(value) || oldResidentId.test(value);
        return valid || "請輸入有效的身份證號或統一證號";
      }
    },
  },
};
