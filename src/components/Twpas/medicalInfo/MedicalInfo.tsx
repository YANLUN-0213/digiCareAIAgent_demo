import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/medicalValid";
import ImageStudySection from "./ImageStudySection";
import CancerStageSection from "./CancerStageSection";
import ExaminationReportSection from "./ExaminationReportSection";
import { TwpasForm } from "../type/twpasform";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import DiagDataSection from "./DiagDataSection";

interface MedicalInfoProps {
  methods: UseFormReturn<TwpasForm>;
  onAiHelper?: (fieldKey: string) => void;
}

const MedicalInfo: React.FC<MedicalInfoProps> = ({ methods, onAiHelper }) => {
  const { register, formState: { errors } } = methods;

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>診斷資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-6">
            <RHFInputText register={register} errors={errors} name="diagnosis.diagDate" label="診斷日期(diagDate)" type="date" rules={formValidationRules?.diagnosis?.diagDate} className="w-full" tooltipText="YYYY-MM-DD" />
          </div>
        </div>
      </div>

      <DiagDataSection methods={methods} />

      <hr />
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-file mr-2"></i>病歷資料
        </h4>
        <DynamicFieldArray name="diagnosis.medrecPath" methods={methods} addtitle="新增病歷資料" labelName="病歷資料路徑(medrecPath)(多筆)" labelClassName="font-bold" delBtnAlign="align-item-start"
          defaultValue={{ medrec: "", medrecTitle: "" }}
          isRequired={false}
          children={(fieldName, index) => (
            <div className="formgrid grid p-2">
              <Badge value={`第 ${index + 1} 筆`} severity="info" />
              <div className="field col-12 lg:col-6">
                <RHFInputText register={register} errors={errors} name={`${fieldName}.medrec`} label="病歷資料路徑(medrec)" rules={formValidationRules?.diagnosis?.medrec} maxLength={50} showCharCount className="w-full" placeholder="(Demo 模式) 輸入路徑" />
              </div>
              <div className="field col-12 lg:col-6">
                <RHFInputText register={register} errors={errors} name={`${fieldName}.medrecTitle`} label="病歷資料名稱(medrecTitle)" rules={formValidationRules?.diagnosis?.medrecTitle} maxLength={50} showCharCount className="w-full" />
              </div>
            </div>
          )}
        />
      </div>

      <hr />
      <ImageStudySection methods={methods} onAiHelper={onAiHelper} />
      <hr />
      <CancerStageSection methods={methods} />
      <hr />
      <ExaminationReportSection methods={methods} onAiHelper={onAiHelper} />
    </>
  );
};

export default MedicalInfo;
