import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import DynamicFieldArray from "../component/DynamicFieldArray";
import OpdDiagnosisSection from "./OpdDiagnosisSection";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { formValidationRules as hospValid } from "../valid/hospValid";
import { formValidationRules as opdValid } from "../valid/opdValid";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import RHFDropdown from "../utils/RHFDropdown";
import { CusFuncTypeTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props {
  fieldName: string;
  index: number;
  methods: UseFormReturn<TwpasForm>;
}

const OpdSection: React.FC<Props> = ({ fieldName, index, methods }) => {
  const { register, control, formState: { errors } } = methods;
  const [funcTypeList, setFuncTypeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setFuncTypeList(getMockCodeMapping("funcType"));
  }, []);

  return (
    <div className="formgrid grid p-2">
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.hospId`} label="醫事機構代碼(hospId)" rules={hospValid?.hosp?.hospId} maxLength={10} showCharCount className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.funcDate`} label="門診日期(funcDate)" type="date" rules={opdValid?.funcDate} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFDropdown name={`${fieldName}.funcType`} control={control} errors={errors} label="科別(funcType)" filter filterBy="display_tw,display,code" options={funcTypeList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusFuncTypeTemplate} valueTemplate={CusFuncTypeTemplate} placeholder="請選擇科別" rules={opdValid?.required} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.prsnId`} label="門診醫師身分證號(prsnId)" rules={opdValid?.prsnId} className="w-full" maxLength={10} showCharCount />
      </div>
      <div className="col-12 mt-2">
        <DynamicFieldArray name={`${fieldName}.diagnosis`} methods={methods} addtitle="新增(ICD-10-CM)診斷代碼" labelName="診斷(diagnosis)(多筆)" delBtnAlign="align-item-start" defaultValue={{ icd10cmCode: "" }} isRequired={true}
          children={(diagFieldName, diagIndex) => (
            <div className="border-round">
              <Badge value={`第 ${diagIndex + 1}筆診斷`} severity="info" />
              <OpdDiagnosisSection fieldName={diagFieldName} methods={methods} />
              <Divider />
            </div>
          )}
        />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.subjective`} label="主觀描述(subjective)" rules={opdValid?.required} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.objective`} label="客觀描述(objective)" rules={opdValid?.required} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.assessment`} label="評估(assessment)" rules={opdValid?.required} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.plan`} label="計畫(plan)" className="w-full" />
      </div>
    </div>
  );
};

export default OpdSection;
