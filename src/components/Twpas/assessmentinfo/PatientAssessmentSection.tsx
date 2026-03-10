import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import RHFTextarea from "../utils/RHFTextarea";
import { formValidationRules } from "../valid/assessmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import PatAstResultSection from "./PatAstResultSection";
import PatAstPdfListSection from "./PatAstPdfListSection";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface Props {
  nestIndex: number;
  methods: UseFormReturn<TwpasForm>;
  patAstList: SelOptionType;
}

const PatientAssessmentSection: React.FC<Props> = ({ nestIndex, methods, patAstList }) => {
  const { register, control, unregister, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `evaluate.${nestIndex}.patientAssessment` as any });

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-user mr-2"></i>病人狀態評估(patientAssessment)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.patientAssessment.${index}.patAstDate`} label="評估日期(patAstDate)" type="date" rules={formValidationRules?.evaluate?.patAstDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.patientAssessment.${index}.patAstPerformer`} label="醫事人員身分證號(patAstPerformer)" rules={formValidationRules?.evaluate?.patAstPerformer} maxLength={10} showCharCount className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`evaluate.${nestIndex}.patientAssessment.${index}.patAst`} control={control} errors={errors} label="評估項目代碼(patAst)" filter options={patAstList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.evaluate?.patAst} className="w-full"
                onChange={() => {
                  unregister(`evaluate.${nestIndex}.patientAssessment.${index}.patAstResult` as any);
                }}
              />
            </div>
            <div className="field col-12 lg:col-6">
              <PatAstResultSection index={index} nestIndex={nestIndex} methods={methods} patAstList={patAstList} />
            </div>
          </div>
          <PatAstPdfListSection methods={methods} fieldName={`evaluate.${nestIndex}.patientAssessment.${index}.patAstPdfList`} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增病人狀態評估" onClick={() => append({ patAst: "", patAstResult: "", patAstDate: "", patAstPerformer: "", patAstPdfList: [] })} />
    </div>
  );
};

export default PatientAssessmentSection;
