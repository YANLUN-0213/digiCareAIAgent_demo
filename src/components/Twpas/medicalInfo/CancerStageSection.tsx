import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/medicalValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props {
  methods: UseFormReturn<TwpasForm>;
}

const CancerStageSection: React.FC<Props> = ({ methods }) => {
  const { register, control, getValues, unregister, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "diagnosis.cancerStage" });

  const [assessItemList, setAssessItemList] = useState<SelOptionType>({ select: [] });
  const [assessScoreList, setAssessScoreList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setAssessItemList(getMockCodeMapping("assessItem"));
    setAssessScoreList(getMockCodeMapping("assessScore"));
  }, []);

  const getAssessScoreType = (index: number): string => {
    const selectedItem = getValues(`diagnosis.cancerStage.${index}.assessItem`);
    const item = assessItemList?.select?.find((i: any) => i.code === selectedItem);
    return item?.assessScoreType || "string";
  };

  return (
    <div className="mb-0">
      <h4 className="text-lg font-semibold mb-1 text-surface-700">
        <i className="pi pi-chart-bar mr-2"></i>癌症分期(cancerStage)
      </h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`diagnosis.cancerStage.${index}.assessItem`} control={control} errors={errors} label="癌症分期量表項目(assessItem)" filter options={assessItemList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.assessItem} className="w-full"
                onChange={() => {
                  unregister(`diagnosis.cancerStage.${index}.assessScore`);
                }}
              />
            </div>
            <div className="field col-12 lg:col-6">
              {getAssessScoreType(index) === "select" ? (
                <RHFDropdown name={`diagnosis.cancerStage.${index}.assessScore`} control={control} errors={errors} label="癌症分期分數或結果(assessScore)" options={assessScoreList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.assessScore} className="w-full" />
              ) : getAssessScoreType(index) === "number" ? (
                <RHFInputText register={register} errors={errors} name={`diagnosis.cancerStage.${index}.assessScore`} label="癌症分期分數或結果(assessScore)" type="number" rules={formValidationRules?.diagnosis?.assessScore} className="w-full" />
              ) : (
                <RHFInputText register={register} errors={errors} name={`diagnosis.cancerStage.${index}.assessScore`} label="癌症分期分數或結果(assessScore)" rules={formValidationRules?.diagnosis?.assessScore} className="w-full" />
              )}
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.cancerStage.${index}.assessDate`} label="癌症分期評估日期(assessDate)" type="date" rules={formValidationRules?.diagnosis?.assessDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.cancerStage.${index}.assessPerformer`} label="簽發癌症分期報告醫師身分證號(assessPerformer)" rules={formValidationRules?.diagnosis?.assessPerformer} maxLength={10} showCharCount className="w-full" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增癌症評估" onClick={() => append({ assessItem: "", assessScore: "", assessDate: "", assessPerformer: "" })} />
    </div>
  );
};

export default CancerStageSection;
