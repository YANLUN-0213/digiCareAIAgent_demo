import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import RHFMultiSelect from "../utils/RHFMultiSelect";
import { formValidationRules } from "../valid/treatmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate, CusMultiCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { nestIndex: number; methods: UseFormReturn<TwpasForm>; index: number; }

const MedicationRequestDrugItem: React.FC<Props> = ({ nestIndex, methods, index }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `treat.${nestIndex}.medicationRequest.${index}.drugItem` as any });
  const [doseUnitList, setDoseUnitList] = useState<SelOptionType>({ select: [] });
  const [drugFreList, setDrugFreList] = useState<SelOptionType>({ select: [] });
  const [drugRouteList, setDrugRouteList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setDoseUnitList(getMockCodeMapping("doseUnit"));
    setDrugFreList(getMockCodeMapping("drugFre"));
    setDrugRouteList(getMockCodeMapping("drugRoute"));
  }, []);

  return (
    <div className="mt-2">
      <h6 className="font-semibold">藥品使用明細(drugItem)</h6>
      {fields.map((field, itemIndex) => (
        <div key={field.id} className="card border-1 surface-100 p-2 mb-2">
          <div className="flex justify-content-between align-items-center mb-1">
            <Badge value={`明細 ${itemIndex + 1}`} severity="warning" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(itemIndex)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFMultiSelect name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.drugFreArray`} control={control} errors={errors} label="使用頻率(drugFreArray)" options={drugFreList?.select} optionValue="code" optionLabel="display" placeholder="請選擇(可多選)" rules={formValidationRules?.drugFre} display="chip" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.drugRoute`} control={control} errors={errors} label="給藥途徑(drugRoute)" options={drugRouteList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.drugRoute} className="w-full" />
            </div>
            <div className="field col-12 lg:col-4">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.dose`} label="劑量(dose)" rules={formValidationRules?.dose} maxLength={20} className="w-full" />
            </div>
            <div className="field col-12 lg:col-4">
              <RHFDropdown name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.doseUnit`} control={control} errors={errors} label="劑量單位(doseUnit)" options={doseUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.doseUnit} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.sDate`} label="起始日期(sDate)" type="date" rules={formValidationRules?.sDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.medicationRequest.${index}.drugItem.${itemIndex}.eDate`} label="終止日期(eDate)" type="date" rules={formValidationRules?.eDate} className="w-full" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增藥品使用明細" size="small" onClick={() => append({ drugFreArray: [], drugRoute: "", dose: "", doseUnit: "", sDate: "", eDate: "" })} />
    </div>
  );
};

export default MedicationRequestDrugItem;
