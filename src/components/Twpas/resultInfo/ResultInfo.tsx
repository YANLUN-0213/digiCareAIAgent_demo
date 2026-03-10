import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/resultValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";

interface Props { nestIndex: number; methods: UseFormReturn<TwpasForm>; onRemove: () => void; }

const ResultInfo: React.FC<Props> = ({ nestIndex, methods, onRemove }) => {
  const { register, control, formState: { errors } } = methods;
  const [txAstList, setTxAstList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setTxAstList(getMockCodeMapping("txAst"));
  }, []);

  return (
    <div>
      <div className="formgrid grid">
        <div className="field col-12 lg:col-6">
          <RHFDropdown name={`result.${nestIndex}.txAst`} control={control} errors={errors} label="治療後疾病狀態評估項目(txAst)" options={txAstList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.txAst} className="w-full" />
        </div>
        <div className="field col-12 lg:col-6">
          <RHFInputText register={register} errors={errors} name={`result.${nestIndex}.txAstDate`} label="評估日期(txAstDate)" type="date" rules={formValidationRules?.txAstDate} className="w-full" />
        </div>
        <div className="field col-12">
          <RHFTextarea register={register} errors={errors} name={`result.${nestIndex}.txAstResult`} label="評估結果(txAstResult)" rules={formValidationRules?.txAstResult} maxLength={100} showCharCount className="w-full" rows={2} control={control} />
        </div>
      </div>
      <Button type="button" icon="pi pi-trash" label="刪除此結果" className="p-button-danger p-button-text" onClick={onRemove} />
    </div>
  );
};

export default ResultInfo;
