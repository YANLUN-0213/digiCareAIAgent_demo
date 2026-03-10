import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/treatmentValid";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props { methods: UseFormReturn<TwpasForm>; nestIndex: number; }

const CarePlanSection: React.FC<Props> = ({ methods, nestIndex }) => {
  const { register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: `treat.${nestIndex}.careplan` as any });

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-file mr-2"></i>治療計畫(careplan)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-50 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.careplan.${index}.carePlanDocPdf`} label="治療計畫文件路徑(carePlanDocPdf)" rules={formValidationRules?.carePlanDocPdf} maxLength={50} showCharCount className="w-full" placeholder="(Demo 模式)" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.careplan.${index}.carePlanDocTitle`} label="治療計畫文件名稱(carePlanDocTitle)" rules={formValidationRules?.carePlanDocTitle} maxLength={50} showCharCount className="w-full" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增治療計畫" onClick={() => append({ carePlanDocPdf: "", carePlanDocTitle: "" })} />
    </div>
  );
};

export default CarePlanSection;
