import React from "react";
import { UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import { formValidationRules } from "../valid/medicalValid";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

interface Props {
  methods: UseFormReturn<TwpasForm>;
}

// IG 1.2.1 supportingInfo-c90-c91-c92: 該疾病類別需檢附檢驗、影像、基因或檢查至少一項
const C90_C91_C92_REGEX = /^C9[0-2](\.|$)/i;

const DiagDataRow: React.FC<{ methods: UseFormReturn<TwpasForm>; index: number }> = ({ methods, index }) => {
  const { register, control, formState: { errors } } = methods;
  const icdValue = useWatch({ control, name: `diagnosis.diagData.${index}.icd10cmCode` as const }) as string | undefined;
  const matchC90_C91_C92 = !!icdValue && C90_C91_C92_REGEX.test(icdValue.trim());

  return (
    <div className="formgrid grid">
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`diagnosis.diagData.${index}.icd10cmCode`} label="國際疾病分類代碼(icd10cmCode)" rules={formValidationRules?.diagnosis?.diagData?.icd10cmCode} maxLength={15} showCharCount className="w-full" />
        {matchC90_C91_C92 && (
          <Message
            severity="warn"
            className="w-full mt-2"
            content={
              <span className="text-sm">
                <i className="pi pi-exclamation-triangle mr-2" />
                <b>IG 1.2.1 supportingInfo-c90-c91-c92：</b>
                本診斷 (C90/C91/C92) 需檢附 <b>檢驗、影像、基因或檢查</b> 至少一項資訊。
              </span>
            }
          />
        )}
      </div>
      <div className="field col-12">
        <RHFTextarea register={register} errors={errors} name={`diagnosis.diagData.${index}.diagCurrentStatus`} label="簡要病摘(diagCurrentStatus)" rules={formValidationRules?.diagnosis?.diagData?.diagCurrentStatus} maxLength={4000} showCharCount className="w-full" rows={3} control={control} />
      </div>
    </div>
  );
};

const DiagDataSection: React.FC<Props> = ({ methods }) => {
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "diagnosis.diagData" });

  return (
    <div className="mb-0">
      <h4 className="text-lg font-semibold mb-1 text-surface-700">
        <i className="pi pi-list mr-2"></i>診斷資料(diagData)
      </h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆 ${index === 0 ? '(主診斷)' : '(共病)'}`} severity={index === 0 ? "success" : "info"} />
            {index > 0 && (
              <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
            )}
          </div>
          <DiagDataRow methods={methods} index={index} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增診斷資訊" onClick={() => append({ icd10cmCode: "", diagCurrentStatus: "", diagnosisSequence: 2 })} />
    </div>
  );
};

export default DiagDataSection;
