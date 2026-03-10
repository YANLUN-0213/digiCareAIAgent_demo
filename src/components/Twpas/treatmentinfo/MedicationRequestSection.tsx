import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import MedicationRequestDrugItem from "./MedicationRequestDrugItem";
import { formValidationRules } from "../valid/treatmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { methods: UseFormReturn<TwpasForm>; nestIndex: number; }

const MedicationRequestSection: React.FC<Props> = ({ methods, nestIndex }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `treat.${nestIndex}.medicationRequest` as any });
  const [drugTypeList, setDrugTypeList] = useState<SelOptionType>({ select: [] });
  const [eReasonList, setEReasonList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setDrugTypeList(getMockCodeMapping("drugType"));
    setEReasonList(getMockCodeMapping("eReason"));
  }, []);

  const drugStatusList = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Stopped", value: "stopped" },
    { label: "On Hold", value: "on-hold" },
  ];

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-box mr-2"></i>藥物處方(medicationRequest)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-50 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆藥物`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.medicationRequest.${index}.drugCode`} label="藥品代碼(drugCode)" rules={formValidationRules?.drugCode} maxLength={12} showCharCount className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.medicationRequest.${index}.drugStatus`} control={control} errors={errors} label="藥物使用狀態(drugStatus)" options={drugStatusList} placeholder="請選擇" rules={formValidationRules?.drugStatus} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.medicationRequest.${index}.drugType`} control={control} errors={errors} label="自費註記(drugType)" options={drugTypeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.drugType} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`treat.${nestIndex}.medicationRequest.${index}.eReason`} control={control} errors={errors} label="終止原因(eReason)" options={eReasonList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.eReason} className="w-full" />
            </div>
          </div>
          <MedicationRequestDrugItem nestIndex={nestIndex} methods={methods} index={index} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增藥物處方" onClick={() => append({ drugCode: "", drugStatus: "", drugType: "", eReason: "", drugItem: [{ drugFreArray: [], drugRoute: "", dose: "", doseUnit: "", sDate: "", eDate: "" }] })} />
    </div>
  );
};

export default MedicationRequestSection;
