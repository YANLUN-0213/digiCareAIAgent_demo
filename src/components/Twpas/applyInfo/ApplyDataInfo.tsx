import React, { useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import DynamicFieldArray from "../component/DynamicFieldArray";
import MedicationUsage from "./MedicationUsage";
import { formValidationRules } from "../valid/applyValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface Props {
  fieldName: string;
  index: number;
  methods: UseFormReturn<TwpasForm>;
  applyReasonList: SelOptionType;
}

const ApplyDataInfo: React.FC<Props> = ({ fieldName, index, methods, applyReasonList }) => {
  const { register, control, formState: { errors } } = methods;

  const selectedApplyReason = useWatch({ control, name: `${fieldName}.applyReason` as any });
  const isOther = selectedApplyReason === "other";

  const cancerDrugTypeOptions = useMemo(() => {
    if (!selectedApplyReason || isOther) return [];
    const found = applyReasonList?.select?.find((item: any) => item.code === selectedApplyReason);
    return (found as any)?.cancerDrugType || [];
  }, [selectedApplyReason, applyReasonList, isOther]);

  return (
    <div className="p-2">
      <div className="formgrid grid">
        <div className="field col-12 lg:col-4">
          <RHFDropdown name={`${fieldName}.continuation`} control={control} errors={errors} label="續用註記(continuation)" options={[
            { label: "1-初次", value: "1" },
            { label: "2-續用", value: "2" },
          ]} placeholder="請選擇" rules={formValidationRules?.continuation} className="w-full" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFDropdown name={`${fieldName}.lot`} control={control} errors={errors} label="治療線數(lot)" options={[
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]} placeholder="請選擇" rules={formValidationRules?.lot} className="w-full" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFDropdown name={`${fieldName}.orderType`} control={control} errors={errors} label="醫令類別(orderType)" options={[
            { label: "1-藥品", value: "1" },
            { label: "2-診療", value: "2" },
            { label: "3-特材", value: "3" },
          ]} placeholder="請選擇" rules={formValidationRules?.orderType} className="w-full" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.applySide`} label="申請部位(applySide)" rules={formValidationRules?.applySide} maxLength={1} className="w-full" tooltipText="R:右, L:左, B:雙側" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFDropdown name={`${fieldName}.applyReason`} control={control} errors={errors} label="給付適應症條件(applyReason)" filter options={applyReasonList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.applyReason} className="w-full" />
        </div>
        <div className="field col-12 lg:col-4">
          {isOther ? (
            <RHFInputText register={register} errors={errors} name={`${fieldName}.cancerDrugType`} label="事前審查品項代碼(cancerDrugType)" rules={formValidationRules?.cancerDrugType} maxLength={12} className="w-full" />
          ) : (
            <RHFDropdown name={`${fieldName}.cancerDrugType`} control={control} errors={errors} label="事前審查品項代碼(cancerDrugType)" options={cancerDrugTypeOptions} optionValue="code" optionLabel="display" placeholder="請選擇" rules={formValidationRules?.cancerDrugType} className="w-full" />
          )}
        </div>
        {isOther && (
          <div className="field col-12">
            <RHFInputText register={register} errors={errors} name={`${fieldName}.applyReasonTxt`} label="給付適應症條件說明(applyReasonTxt)" className="w-full" />
          </div>
        )}
      </div>

      <DynamicFieldArray name={`${fieldName}.medicationUsage`} methods={methods} addtitle="新增用藥資訊" labelName="用藥資訊(medicationUsage)(多筆)" labelClassName="font-bold" delBtnAlign="align-item-start"
        defaultValue={{ applQty: 0, applQtyUnit: "", applDrugCycle: null, applDosage: 0, applDosageUnit: "", useSdate: "", useEdate: "", applDrugFre: [], applDrugRoute: [] }}
        isRequired={true}
        children={(usageFieldName, usageIndex) => (
          <div>
            <Badge value={`用藥 ${usageIndex + 1}`} severity="warning" className="mb-2" />
            <MedicationUsage fieldName={usageFieldName} index={usageIndex} methods={methods} />
          </div>
        )}
      />
    </div>
  );
};

export default ApplyDataInfo;
