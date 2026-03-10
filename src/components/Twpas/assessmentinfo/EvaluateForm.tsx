import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import AssessmentInfo from "./AssessmentInfo";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props {
  methods: UseFormReturn<TwpasForm>;
  onAiHelper?: (fieldKey: string) => void;
}

const EvaluateForm: React.FC<Props> = ({ methods, onAiHelper }) => {
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "evaluate" });

  const [inspectList, setInspectList] = useState<SelOptionType>({ select: [] });
  const [inspectResultCodeList, setInspectResultCodeList] = useState<SelOptionType>({ select: [] });
  const [consultValueCatList, setConsultValueCatList] = useState<SelOptionType>({ select: [] });
  const [patAstList, setPatAstList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setInspectList(getMockCodeMapping("inspect"));
    setInspectResultCodeList(getMockCodeMapping("inspectResultCode"));
    setConsultValueCatList(getMockCodeMapping("consultValueCat"));
    setPatAstList(getMockCodeMapping("patAst"));
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-clipboard mr-2"></i>評估資訊</h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-3">
          <Badge value={`第 ${index + 1} 筆評估`} severity="info" className="mb-2" />
          <AssessmentInfo methods={methods} nestIndex={index} onRemove={() => remove(index)} inspectList={inspectList} inspectResultCodeList={inspectResultCodeList} consultValueCatList={consultValueCatList} patAstList={patAstList} onAiHelper={onAiHelper} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增評估" onClick={() => append({ tests: [], patientAssessment: [] })} />
    </div>
  );
};

export default EvaluateForm;
