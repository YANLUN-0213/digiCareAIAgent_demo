import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props {
  methods: UseFormReturn<TwpasForm>;
  fieldName: any;
}

const PatAstPdfListSection: React.FC<Props> = ({ methods, fieldName }) => {
  const { register, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: fieldName });

  return (
    <div className="mt-2">
      <h6 className="font-semibold">評估報告(patAstPdfList)</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="formgrid grid p-2 border-1 surface-50 mb-1">
          <Badge value={`報告 ${index + 1}`} severity="info" />
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`${fieldName}.${index}.patAstPdf`} label="報告路徑(patAstPdf)" maxLength={50} className="w-full" placeholder="(Demo 模式)" />
          </div>
          <div className="field col-12 lg:col-5">
            <RHFInputText register={register} errors={errors} name={`${fieldName}.${index}.patAstPdfTitle`} label="報告名稱(patAstPdfTitle)" maxLength={50} className="w-full" />
          </div>
          <div className="field col-12 lg:col-2 flex align-items-end">
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger" onClick={() => remove(index)} />
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增評估報告" size="small" onClick={() => append({ patAstPdf: "", patAstPdfTitle: "" })} />
    </div>
  );
};

export default PatAstPdfListSection;
