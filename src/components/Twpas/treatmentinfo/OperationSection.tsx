import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/treatmentValid";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props { methods: UseFormReturn<TwpasForm>; nestIndex: number; }

const OperationSection: React.FC<Props> = ({ methods, nestIndex }) => {
  const { register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: `treat.${nestIndex}.operation` as any });

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-wrench mr-2"></i>處置與手術(operation)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-50 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.operation.${index}.opCode`} label="手術項目(opCode)" rules={formValidationRules?.opCode} maxLength={20} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`treat.${nestIndex}.operation.${index}.opDate`} label="手術日期(opDate)" type="date" rules={formValidationRules?.opDate} className="w-full" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增處置與手術" onClick={() => append({ opCode: "", opDate: "" })} />
    </div>
  );
};

export default OperationSection;
