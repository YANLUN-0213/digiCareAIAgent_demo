import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules as opdValid } from "../valid/opdValid";
import { TwpasForm } from "../type/twpasform";

interface Props {
  fieldName: string;
  methods: UseFormReturn<TwpasForm>;
}

const OpdDiagnosisSection: React.FC<Props> = ({ fieldName, methods }) => {
  const { register, formState: { errors } } = methods;

  return (
    <div className="field col-12">
      <RHFInputText register={register} errors={errors} name={`${fieldName}.icd10cmCode`} label="國際疾病分類代碼(ICD-10-CM)(icd10cmCode)" rules={opdValid?.required} className="w-full" />
    </div>
  );
};

export default OpdDiagnosisSection;
