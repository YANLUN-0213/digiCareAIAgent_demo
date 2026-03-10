import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/assessmentValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import InspectItem from "./InspectItem";
import InspectSetSection from "./InspectSetSection";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate, CusCodeClassDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import AiHelperButton from "../component/AiHelperButton";

interface Props {
  nestIndex: number;
  methods: UseFormReturn<TwpasForm>;
  inspectList: SelOptionType;
  inspectResultCodeList: SelOptionType;
  consultValueCatList: SelOptionType;
  onAiHelper?: (fieldKey: string) => void;
}

const InspectionSection: React.FC<Props> = ({ nestIndex, methods, inspectList, inspectResultCodeList, consultValueCatList, onAiHelper }) => {
  const { register, control, watch, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `evaluate.${nestIndex}.tests` as any });

  const [applDosageUnitList, setApplDosageUnitList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setApplDosageUnitList(getMockCodeMapping("applDosageUnit"));
  }, []);

  return (
    <div className="mb-0">
      <h5 className="font-semibold"><i className="pi pi-search mr-2"></i>檢驗(查)資訊(tests)</h5>
      {fields.map((field, index) => {
        const inspectClass = watch(`evaluate.${nestIndex}.tests.${index}.inspectClass` as any);
        const inspectResultType = watch(`evaluate.${nestIndex}.tests.${index}.inspectResultType` as any);

        return (
          <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
            <div className="flex justify-content-between align-items-center mb-2">
              <Badge value={`第 ${index + 1} 筆檢驗`} severity="info" />
              <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
            </div>
            <div className="formgrid grid">
              <div className="field col-12 lg:col-6">
                <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.caseTime`} label="檢驗(查)報告日期(caseTime)" type="date" rules={formValidationRules?.evaluate?.caseTime} className="w-full" />
              </div>
              <div className="field col-12 lg:col-6">
                <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectPerformer`} label="簽發報告醫事人員身分證號(inspectPerformer)" rules={formValidationRules?.evaluate?.inspectPerformer} maxLength={10} showCharCount className="w-full" />
              </div>
              <div className="field col-12 lg:col-6">
                <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspectClass`} control={control} errors={errors} label="檢驗單項或套組(inspectClass)" options={[
                  { label: "CHEM - 單項", value: "CHEM" },
                  { label: "PANEL - 套組", value: "PANEL" },
                ]} placeholder="請選擇" className="w-full" />
              </div>
              <div className="field col-12 lg:col-6">
                <div className="flex align-items-end gap-1">
                  <div className="flex-1">
                    <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspect`} control={control} errors={errors} label="檢驗(查)名稱或套組代碼(inspect)" filter filterBy="code,display,display_tw,CLASS" options={inspectList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusCodeClassDisplayTemplate} valueTemplate={CusCodeClassDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.evaluate?.inspect} className="w-full" />
                  </div>
                  {onAiHelper && <AiHelperButton onClick={() => onAiHelper('inspect')} />}
                </div>
              </div>

              {inspectClass !== "PANEL" && (
                <>
                  <div className="field col-12 lg:col-4">
                    <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspectResultType`} control={control} errors={errors} label="檢驗結果類型(inspectResultType)" options={[
                      { label: "valueQuantity (數值+單位)", value: "valueQuantity" },
                      { label: "valueString (文字)", value: "valueString" },
                      { label: "valueCodeableConcept (代碼)", value: "valueCodeableConcept" },
                      { label: "valueBoolean (布林)", value: "valueBoolean" },
                      { label: "valueInteger (整數)", value: "valueInteger" },
                    ]} placeholder="請選擇" className="w-full" />
                  </div>

                  {inspectResultType === "valueQuantity" && (
                    <>
                      <div className="field col-6 lg:col-4">
                        <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectResultQuantity.value`} label="結果數值" type="number" step="any" className="w-full" />
                      </div>
                      <div className="field col-6 lg:col-4">
                        <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspectResultQuantity.unit`} control={control} errors={errors} label="單位" options={applDosageUnitList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" className="w-full" />
                      </div>
                    </>
                  )}
                  {inspectResultType === "valueString" && (
                    <div className="field col-12 lg:col-8">
                      <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectResultString`} label="結果(文字)" className="w-full" />
                    </div>
                  )}
                  {inspectResultType === "valueCodeableConcept" && (
                    <div className="field col-12 lg:col-8">
                      <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectResultCodeableConcept`} label="結果(代碼)" className="w-full" />
                    </div>
                  )}
                  {inspectResultType === "valueBoolean" && (
                    <div className="field col-12 lg:col-8">
                      <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspectResultBoolean`} control={control} errors={errors} label="結果(布林)" options={[{ label: "true", value: true }, { label: "false", value: false }]} className="w-full" />
                    </div>
                  )}
                  {inspectResultType === "valueInteger" && (
                    <div className="field col-12 lg:col-8">
                      <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectResultInteger`} label="結果(整數)" type="number" className="w-full" />
                    </div>
                  )}

                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.inspectResultTxt`} label="結果判讀(inspectResultTxt)" rules={formValidationRules?.evaluate?.inspectResultTxt} className="w-full" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.inspectResultCode`} control={control} errors={errors} label="結果代碼(inspectResultCode)" options={inspectResultCodeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.evaluate?.inspectResultCode} className="w-full" />
                  </div>
                  <div className="field col-6 lg:col-3">
                    <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.consultValueLower.value`} label="參考值下限(value)" type="number" step="any" className="w-full" />
                  </div>
                  <div className="field col-6 lg:col-3">
                    <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.consultValueLower.unit`} label="參考值下限(unit)" className="w-full" />
                  </div>
                  <div className="field col-6 lg:col-3">
                    <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.consultValueMax.value`} label="參考值上限(value)" type="number" step="any" className="w-full" />
                  </div>
                  <div className="field col-6 lg:col-3">
                    <RHFInputText register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.consultValueMax.unit`} label="參考值上限(unit)" className="w-full" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFDropdown name={`evaluate.${nestIndex}.tests.${index}.consultValueCat`} control={control} errors={errors} label="參考範圍類型(consultValueCat)" options={consultValueCatList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" className="w-full" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFTextarea register={register} errors={errors} name={`evaluate.${nestIndex}.tests.${index}.consultValueDesc`} label="參考範圍說明(consultValueDesc)" className="w-full" />
                  </div>
                </>
              )}

              {inspectClass === "PANEL" && (
                <div className="col-12 mt-2">
                  <DynamicFieldArray name={`evaluate.${nestIndex}.tests.${index}.inspectSet`} methods={methods} addtitle="新增套組檢驗項目" labelName="檢驗套組(inspectSet)" labelClassName="font-bold"
                    defaultValue={{ inspect: "", inspectResult: "", inspectResultTxt: "", inspectResultCode: "" }}
                    isRequired={false}
                    children={(setFieldName, setIndex) => (
                      <InspectSetSection fieldName={setFieldName} index={setIndex} methods={methods} inspectResultCodeList={inspectResultCodeList} consultValueCatList={consultValueCatList} inspectList={inspectList} applDosageUnitList={applDosageUnitList} />
                    )}
                  />
                </div>
              )}
            </div>

            <InspectItem nestIndex={nestIndex} methods={methods} testIndex={index} />
          </div>
        );
      })}
      <Button type="button" icon="pi pi-plus" label="新增檢驗(查)資訊" onClick={() => append({ inspect: "", inspectClass: "", caseTime: "", inspectPerformer: "", inspectItem: [] })} />
    </div>
  );
};

export default InspectionSection;
