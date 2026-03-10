import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import TreatmentInfo from "./TreatmentInfo";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props { methods: UseFormReturn<TwpasForm>; }

const TreatmentForm: React.FC<Props> = ({ methods }) => {
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "treat" });

  return (
    <div>
      <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-heart mr-2"></i>治療資訊</h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-3">
          <Badge value={`第 ${index + 1} 筆治療`} severity="info" className="mb-2" />
          <TreatmentInfo methods={methods} nestIndex={index} onRemove={() => remove(index)} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增治療資訊" onClick={() => append({ medicationRequest: [], radiotherapy: [], operation: [], careplan: [] })} />
    </div>
  );
};

export default TreatmentForm;
