import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import RHFMultiSelect from "../utils/RHFMultiSelect";
import { formValidationRules } from "../valid/applyValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { CusCodeDisplayTemplate, CusMultiCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { fieldName: string; index: number; methods: UseFormReturn<TwpasForm>; }

const MedicationUsage: React.FC<Props> = ({ fieldName, methods }) => {
  const { register, control, formState: { errors } } = methods;
  const [applDrugRouteList, setApplDrugRouteList] = useState<SelOptionType>({ select: [] });
  const [applDrugFreList, setApplDrugFreList] = useState<SelOptionType>({ select: [] });
  const [applDosageUnitList, setApplDosageUnitList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setApplDrugRouteList(getMockCodeMapping("applDrugRoute"));
    setApplDrugFreList(getMockCodeMapping("applDrugFre"));
    setApplDosageUnitList(getMockCodeMapping("applDosageUnit"));
  }, []);

  return (
    <div className="formgrid grid p-2">
      <div className="field col-12 lg:col-4">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.applQty`} label="申請數量(applQty)" type="number" rules={formValidationRules?.applQty} className="w-full" />
      </div>
      <div className="field col-12 lg:col-4">
        <RHFDropdown name={`${fieldName}.applQtyUnit`} control={control} errors={errors} label="申請數量單位(applQtyUnit)" options={applDosageUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.applQtyUnit} className="w-full" />
      </div>
      <div className="field col-12 lg:col-4">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.applDrugCycle`} label="處方頻次(cycles)(applDrugCycle)" type="number" rules={formValidationRules?.applDrugCycle} className="w-full" />
      </div>
      <div className="field col-12 lg:col-4">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.applDosage`} label="每次處方劑量(applDosage)" type="number" rules={formValidationRules?.applDosage} className="w-full" />
      </div>
      <div className="field col-12 lg:col-4">
        <RHFDropdown name={`${fieldName}.applDosageUnit`} control={control} errors={errors} label="劑量單位(applDosageUnit)" options={applDosageUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.applDosageUnit} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.useSdate`} label="預定起始日期(useSdate)" type="date" rules={formValidationRules?.useSdate} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFInputText register={register} errors={errors} name={`${fieldName}.useEdate`} label="預定終止日期(useEdate)" type="date" rules={formValidationRules?.useEdate} className="w-full" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFMultiSelect name={`${fieldName}.applDrugFre`} control={control} errors={errors} label="使用頻率(applDrugFre)" options={applDrugFreList?.select} optionValue="code" optionLabel="display" placeholder="請選擇(可多選)" rules={formValidationRules?.applDrugFre} display="chip" />
      </div>
      <div className="field col-12 lg:col-6">
        <RHFMultiSelect name={`${fieldName}.applDrugRoute`} control={control} errors={errors} label="給藥途徑(applDrugRoute)" options={applDrugRouteList?.select} optionValue="code" optionLabel="display" placeholder="請選擇(可多選)" rules={formValidationRules?.applDrugRoute} display="chip" />
      </div>
    </div>
  );
};

export default MedicationUsage;
