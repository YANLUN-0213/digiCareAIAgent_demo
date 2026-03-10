import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/assessmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { CusCodeDisplayTemplate, CusCodeClassDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface Props {
  fieldName: string;
  index: number;
  methods: UseFormReturn<TwpasForm>;
  inspectResultCodeList: SelOptionType;
  consultValueCatList: SelOptionType;
  inspectList: SelOptionType;
  applDosageUnitList: SelOptionType;
}

const InspectSetSection: React.FC<Props> = ({ fieldName, index, methods, inspectResultCodeList, consultValueCatList, inspectList, applDosageUnitList }) => {
  const { register, control, watch, formState: { errors } } = methods;
  const inspectResultType = watch(`${fieldName}.inspectResultType` as any);

  return (
    <div className="p-2 mb-2">
      <Badge value={`套組項目 ${index + 1}`} severity="warning" className="mb-2" />
      <div className="formgrid grid">
        <div className="field col-12 lg:col-6">
          <RHFDropdown name={`${fieldName}.inspect`} control={control} errors={errors} label="檢驗名稱(inspect)" filter options={inspectList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusCodeClassDisplayTemplate} valueTemplate={CusCodeClassDisplayTemplate} placeholder="請選擇" className="w-full" />
        </div>
        <div className="field col-12 lg:col-6">
          <RHFDropdown name={`${fieldName}.inspectResultType`} control={control} errors={errors} label="結果類型(inspectResultType)" options={[
            { label: "valueQuantity", value: "valueQuantity" },
            { label: "valueString", value: "valueString" },
            { label: "valueCodeableConcept", value: "valueCodeableConcept" },
            { label: "valueBoolean", value: "valueBoolean" },
            { label: "valueInteger", value: "valueInteger" },
          ]} placeholder="請選擇" className="w-full" />
        </div>

        {inspectResultType === "valueQuantity" && (
          <>
            <div className="field col-6 lg:col-3">
              <RHFInputText register={register} errors={errors} name={`${fieldName}.inspectResultQuantity.value`} label="數值" type="number" step="any" className="w-full" />
            </div>
            <div className="field col-6 lg:col-3">
              <RHFDropdown name={`${fieldName}.inspectResultQuantity.unit`} control={control} errors={errors} label="單位" options={applDosageUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" className="w-full" />
            </div>
          </>
        )}
        {inspectResultType === "valueString" && (
          <div className="field col-12 lg:col-6">
            <RHFInputText register={register} errors={errors} name={`${fieldName}.inspectResultString`} label="結果(文字)" className="w-full" />
          </div>
        )}
        {inspectResultType === "valueCodeableConcept" && (
          <div className="field col-12 lg:col-6">
            <RHFInputText register={register} errors={errors} name={`${fieldName}.inspectResultCodeableConcept`} label="結果(代碼)" className="w-full" />
          </div>
        )}

        <div className="field col-12 lg:col-6">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.inspectResultTxt`} label="結果判讀(inspectResultTxt)" className="w-full" />
        </div>
        <div className="field col-12 lg:col-6">
          <RHFDropdown name={`${fieldName}.inspectResultCode`} control={control} errors={errors} label="結果代碼(inspectResultCode)" options={inspectResultCodeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" className="w-full" />
        </div>
        <div className="field col-6 lg:col-3">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.consultValueLower.value`} label="參考值下限" type="number" step="any" className="w-full" />
        </div>
        <div className="field col-6 lg:col-3">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.consultValueLower.unit`} label="下限單位" className="w-full" />
        </div>
        <div className="field col-6 lg:col-3">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.consultValueMax.value`} label="參考值上限" type="number" step="any" className="w-full" />
        </div>
        <div className="field col-6 lg:col-3">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.consultValueMax.unit`} label="上限單位" className="w-full" />
        </div>
        <div className="field col-12 lg:col-6">
          <RHFDropdown name={`${fieldName}.consultValueCat`} control={control} errors={errors} label="參考範圍類型" options={consultValueCatList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" className="w-full" />
        </div>
        <div className="field col-12 lg:col-6">
          <RHFTextarea register={register} errors={errors} name={`${fieldName}.consultValueDesc`} label="參考範圍說明" className="w-full" />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default InspectSetSection;
