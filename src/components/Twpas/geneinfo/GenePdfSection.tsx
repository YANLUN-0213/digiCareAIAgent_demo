import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/geneticTestValid";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props { nestIndex: number; methods: UseFormReturn<TwpasForm>; }

const GenePdfSection: React.FC<Props> = ({ nestIndex, methods }) => {
  const { register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: `gene.${nestIndex}.genePdfList` as any });

  return (
    <div className="mt-2">
      <h6 className="font-semibold">基因報告(genePdfList)</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="formgrid grid p-2 border-1 surface-50 mb-1">
          <Badge value={`報告 ${index + 1}`} severity="info" />
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`gene.${nestIndex}.genePdfList.${index}.genPdf`} label="報告路徑(genPdf)" rules={formValidationRules?.genPdf} maxLength={50} className="w-full" placeholder="(Demo 模式)" />
          </div>
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`gene.${nestIndex}.genePdfList.${index}.genPdfTitle`} label="報告名稱(genPdfTitle)" rules={formValidationRules?.genPdfTitle} maxLength={50} className="w-full" />
          </div>
          <div className="field col-12 lg:col-2 flex align-items-end">
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger" onClick={() => remove(index)} />
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增基因報告路徑" size="small" onClick={() => append({ genPdf: "", genPdfTitle: "" })} />
    </div>
  );
};

export default GenePdfSection;
