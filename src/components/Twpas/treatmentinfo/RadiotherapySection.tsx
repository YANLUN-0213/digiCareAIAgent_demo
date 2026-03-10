import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/treatmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { methods: UseFormReturn<TwpasForm>; nestIndex: number; }

const RadiotherapySection: React.FC<Props> = ({ methods, nestIndex }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `treat.${nestIndex}.radiotherapy` as any });
  const [rtList, setRtList] = useState<SelOptionType>({ select: [] });
  const [rtUnitList, setRtUnitList] = useState<SelOptionType>({ select: [] });

  const rtStatusList = [
    { label: "Preparation", value: "preparation" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Not Done", value: "not-done" },
  ];

  useEffect(() => {
    setRtList(getMockCodeMapping("rt"));
    setRtUnitList(getMockCodeMapping("rtUnit"));
  }, []);

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-bolt mr-2"></i>放射/照光治療(radiotherapy)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-50 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.radiotherapy.${index}.rtStatus`} control={control} errors={errors} label="治療狀態(rtStatus)" options={rtStatusList} placeholder="請選擇" rules={formValidationRules?.rtStatus} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.radiotherapy.${index}.rt`} control={control} errors={errors} label="治療項目(rt)" filter options={rtList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.rt} className="w-full" />
            </div>
            <div className="field col-12 lg:col-4">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.radiotherapy.${index}.realInspectTime`} label="治療日期(realInspectTime)" type="date" rules={formValidationRules?.realInspectTime} className="w-full" />
            </div>
            <div className="field col-12 lg:col-4">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.radiotherapy.${index}.rtDose`} label="總劑量(rtDose)" rules={formValidationRules?.rtDose} className="w-full" />
            </div>
            <div className="field col-12 lg:col-4">
              <RHFDropdown name={`treat.${nestIndex}.radiotherapy.${index}.rtUnit`} control={control} errors={errors} label="劑量單位(rtUnit)" options={rtUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.rtUnit} className="w-full" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增放射/照光治療" onClick={() => append({ rtStatus: "", rt: "", realInspectTime: "", rtDose: "", rtUnit: "" })} />
    </div>
  );
};

export default RadiotherapySection;
