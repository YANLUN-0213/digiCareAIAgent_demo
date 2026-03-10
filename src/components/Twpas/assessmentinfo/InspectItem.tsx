import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/assessmentValid";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props {
  nestIndex: number;
  methods: UseFormReturn<TwpasForm>;
  testIndex: number;
}

const InspectItem: React.FC<Props> = ({ nestIndex, methods, testIndex }) => {
  const { register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: `evaluate.${nestIndex}.tests.${testIndex}.inspectItem` as any });

  return (
    <div className="mt-2">
      <h6 className="font-semibold">檢驗(查)附件(inspectItem)</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="formgrid grid p-2 border-1 surface-50 mb-1">
          <Badge value={`附件 ${index + 1}`} severity="info" />
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${testIndex}.inspectItem.${index}.inspectPdf`} label="附件路徑(inspectPdf)" rules={formValidationRules?.evaluate?.inspectPdf} maxLength={50} className="w-full" placeholder="(Demo 模式)" />
          </div>
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${testIndex}.inspectItem.${index}.inspectPdfTitle`} label="附件名稱(inspectPdfTitle)" rules={formValidationRules?.evaluate?.inspectPdfTitle} maxLength={50} className="w-full" />
          </div>
          <div className="field col-12 lg:col-2 flex align-items-end">
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger" onClick={() => remove(index)} />
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增檢驗附件" size="small" onClick={() => append({ inspectPdf: "", inspectPdfTitle: "" })} />
    </div>
  );
};

export default InspectItem;
