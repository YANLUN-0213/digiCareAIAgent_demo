import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/geneticTestValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import GenePdfSection from "./GenePdfSection";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { methods: UseFormReturn<TwpasForm>; }

const GeneticTestSection: React.FC<Props> = ({ methods }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "gene" });
  const [genInterpretationList, setGenInterpretationList] = useState<SelOptionType>({ select: [] });
  const [genMethodList, setGenMethodList] = useState<SelOptionType>({ select: [] });
  const [genTestCodeList, setGenTestCodeList] = useState<SelOptionType>({ select: [] });
  const [mutationTypeList, setMutationTypeList] = useState<SelOptionType>({ select: [] });
  const [specimenTypeList, setSpecimenTypeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setGenInterpretationList(getMockCodeMapping("genInterpretation"));
    setGenMethodList(getMockCodeMapping("genMethod"));
    setGenTestCodeList(getMockCodeMapping("genTestCode"));
    setMutationTypeList(getMockCodeMapping("mutationType"));
    setSpecimenTypeList(getMockCodeMapping("specimenType"));
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-sitemap mr-2"></i>基因資訊</h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-3">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆基因檢測`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`gene.${index}.specimenType`} control={control} errors={errors} label="檢體類型(specimenType)" options={specimenTypeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.specimenType} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`gene.${index}.genMethod`} control={control} errors={errors} label="檢測方法(genMethod)" options={genMethodList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.genMethod} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`gene.${index}.genDate`} label="檢測日期(genDate)" type="date" rules={formValidationRules?.genDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`gene.${index}.genOrg`} label="檢測機構(genOrg)" rules={formValidationRules?.genOrg} maxLength={15} showCharCount className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`gene.${index}.genInterpretation`} control={control} errors={errors} label="臨床判讀結果(genInterpretation)" options={genInterpretationList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.genInterpretation} className="w-full" />
            </div>
            <div className="field col-12">
              <RHFTextarea register={register} errors={errors} name={`gene.${index}.genResult`} label="分析結果(genResult)" rules={formValidationRules?.genResult} maxLength={4000} showCharCount className="w-full" rows={3} control={control} />
            </div>
          </div>

          <DynamicFieldArray name={`gene.${index}.genTestCodeTypeList`} methods={methods} addtitle="新增檢測代碼" labelName="基因檢測代碼(genTestCodeTypeList)" labelClassName="font-bold"
            defaultValue={{ genTestCode: "", mutationType: "" }}
            isRequired={false}
            children={(codeFieldName, codeIndex) => (
              <div className="formgrid grid p-2">
                <Badge value={`代碼 ${codeIndex + 1}`} severity="warning" />
                <div className="field col-12 lg:col-6">
                  <RHFDropdown name={`${codeFieldName}.genTestCode`} control={control} errors={errors} label="檢測代碼(genTestCode)" options={genTestCodeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.genTestCode} className="w-full" />
                </div>
                <div className="field col-12 lg:col-6">
                  <RHFDropdown name={`${codeFieldName}.mutationType`} control={control} errors={errors} label="突變型態(mutationType)" options={mutationTypeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.mutationType} className="w-full" />
                </div>
              </div>
            )}
          />
          <GenePdfSection nestIndex={index} methods={methods} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增基因檢測" onClick={() => append({ genTestCodeTypeList: [], specimenType: "", genMethod: "", genDate: "", genOrg: "", genResult: "", genInterpretation: "", genePdfList: [] })} />
    </div>
  );
};

export default GeneticTestSection;
