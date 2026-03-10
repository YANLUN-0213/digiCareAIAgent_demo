import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import { formValidationRules } from "../valid/medicalValid";
import { TwpasForm } from "../type/twpasform";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { Badge } from "primereact/badge";

interface Props {
  index: number;
  methods: UseFormReturn<TwpasForm>;
}

const ExaminationReportItem: React.FC<Props> = ({ index, methods }) => {
  const { register, control, formState: { errors } } = methods;

  return (
    <div className="mt-2">
      <h5 className="font-semibold">報告結果(reportResult)</h5>
      <div className="field col-12">
        <RHFTextarea register={register} errors={errors} name={`diagnosis.examinationReport.${index}.reportResult.reportResultString`} label="檢查報告結果(reportResultString)" rules={formValidationRules?.diagnosis?.reportResultString} maxLength={4000} showCharCount className="w-full" rows={3} control={control} />
      </div>
      <DynamicFieldArray name={`diagnosis.examinationReport.${index}.reportResult.reportResultPdfList`} methods={methods} addtitle="新增報告檔案" labelName="檢查報告檔案(reportResultPdfList)" labelClassName="font-bold" delBtnAlign="align-item-start"
        defaultValue={{ reportResultPdf: "", reportResultPdfTitle: "" }}
        isRequired={false}
        children={(fieldName, pdfIndex) => (
          <div className="formgrid grid p-2">
            <Badge value={`第 ${pdfIndex + 1} 筆`} severity="info" />
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`${fieldName}.reportResultPdf`} label="檢查報告檔案路徑(reportResultPdf)" rules={formValidationRules?.diagnosis?.reportResultPdf} maxLength={50} showCharCount className="w-full" placeholder="(Demo 模式)" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`${fieldName}.reportResultPdfTitle`} label="檢查報告名稱(reportResultPdfTitle)" rules={formValidationRules?.diagnosis?.reportResultPdfTitle} maxLength={20} showCharCount className="w-full" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ExaminationReportItem;
