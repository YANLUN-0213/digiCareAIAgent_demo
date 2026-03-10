import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import ResultInfo from "./ResultInfo";
import { TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props { methods: UseFormReturn<TwpasForm>; }

const ResultForm: React.FC<Props> = ({ methods }) => {
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "result" });

  return (
    <div>
      <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-check-circle mr-2"></i>結果資訊</h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <Badge value={`第 ${index + 1} 筆結果`} severity="info" className="mb-2" />
          <ResultInfo nestIndex={index} methods={methods} onRemove={() => remove(index)} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增結果" onClick={() => append({ txAst: "", txAstResult: "", txAstDate: "" })} />
    </div>
  );
};

export default ResultForm;
