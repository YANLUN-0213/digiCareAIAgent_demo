export const formValidationRules = {
  diagnosis: {
    reportType: {
      required: false,
      maxLength: { value: 12, message: "報告類型不可超過12個字元" },
    },
    speType: {
      required: false,
      maxLength: { value: 20, message: "檢體種類不可超過20個字元" },
    },
    reportResultString: {
      required: false,
      maxLength: { value: 4000, message: "報告結果不可超過4000個字元" },
    },
    reportDate: {
      required: false,
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
    reportResultPdf: {
      required: false,
      maxLength: { value: 50, message: "檢查報告檔案路徑不可超過50個字元" },
    },
    reportResultPdfTitle: {
      required: false,
      maxLength: { value: 50, message: "檢查報告名稱不可超過50個字元" },
    },
    medrec: {
      required: false,
      maxLength: { value: 50, message: "病歷資料路徑不可超過50個字元" },
    },
    medrecTitle: {
      required: false,
      maxLength: { value: 50, message: "病歷資料名稱不可超過50個字元" },
    },
    icd10cmCode: {
      required: { value: true, message: "主診斷代碼為必填" },
      maxLength: { value: 10, message: "主診斷代碼不可超過10個字元" },
    },
    imgBodySite: {
      required: { value: true, message: "影像檢查的身體部位為必填" },
      maxLength: { value: 12, message: "影像檢查的身體部位不可超過12個字元" },
    },
    imgResult: {
      required: { value: true, message: "影像報告結果為必填" },
      maxLength: { value: 4000, message: "影像報告結果不可超過4000個字元" },
    },
    imgItem: {
      required: { value: true, message: "影像報告項目為必填" },
      maxLength: { value: 10, message: "影像報告項目不可超過10個字元" },
    },
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
    imgDicom: {
      studyUid: {
        required: { value: true, message: "Study UID為必填" },
      },
      series: {
        uid: {
          required: { value: true, message: "Series Instance UID為必填" },
        },
        modality: {
          required: { value: true, message: "成像儀器代碼為必填" },
        },
        instance: {
          uid: {
            required: { value: true, message: "DICOM影像 UID為必填" },
          },
          class: {
            required: { value: true, message: "DICOM class 類型為必填" },
          },
        },
      },
    },
    imgNonDicom: {
      required: false,
    },
    imgNonDicomMimeType: {
      required: false,
    },
  },
};
