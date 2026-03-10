import React, { useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/assessmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";

interface Props {
  index: number;
  nestIndex: number;
  methods: UseFormReturn<TwpasForm>;
  patAstList: SelOptionType;
}

const PatAstResultSection: React.FC<Props> = ({ index, nestIndex, methods, patAstList }) => {
  const { register, control, formState: { errors } } = methods;

  const selectedPatAst = useWatch({ control, name: `evaluate.${nestIndex}.patientAssessment.${index}.patAst` as any });

  const patAstResultListOptions = useMemo(() => {
    if (!selectedPatAst) return [];
    const found = patAstList?.select?.find((item: any) => item.code === selectedPatAst);
    return found?.patAstResult || [];
  }, [selectedPatAst, patAstList]);

  if (patAstResultListOptions.length > 0) {
    return (
      <RHFDropdown name={`evaluate.${nestIndex}.patientAssessment.${index}.patAstResult`} control={control} errors={errors} label="評估結果(patAstResult)" options={patAstResultListOptions} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.evaluate?.patAstResult} className="w-full" />
    );
  }

  return (
    <RHFTextarea register={register} errors={errors} name={`evaluate.${nestIndex}.patientAssessment.${index}.patAstResult`} label="評估結果(patAstResult)" rules={formValidationRules?.evaluate?.patAstResult} maxLength={1000} showCharCount className="w-full" rows={2} control={control} />
  );
};

export default PatAstResultSection;
