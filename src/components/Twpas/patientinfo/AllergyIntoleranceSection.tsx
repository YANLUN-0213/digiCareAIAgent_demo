import React, { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/patientValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface Props {
  fieldName: string;
  index: number;
  methods: UseFormReturn<TwpasForm>;
  clinicalStatusList?: SelOptionType;
  verificationStatusList?: SelOptionType;
  allergyList?: SelOptionType;
}

const AllergyIntoleranceSection: React.FC<Props> = ({ fieldName, index, methods, clinicalStatusList, verificationStatusList, allergyList }) => {
  const { register, control, getValues, trigger, formState: { errors } } = methods;

  const currentVerificationStatus = useWatch({
    control,
    name: `${fieldName}.verificationStatus` as any,
  });

  useEffect(() => {
    if (currentVerificationStatus !== undefined) {
      trigger(`${fieldName}.clinicalStatus` as any);
    }
  }, [currentVerificationStatus, trigger, fieldName]);

  return (
    <div className="mb-0 p-2">
      <div className="formgrid grid">
        <div className="field col-12 lg:col-8">
          <RHFDropdown name={`${fieldName}.allergy.code`} label="過敏史代碼(code)" control={control} errors={errors} filter rules={formValidationRules?.patient?.required} options={allergyList?.select} optionValue="code" optionLabel="display" filterBy="code,display" className="w-full" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.recordedDate`} label="紀錄日期" type="date" className="w-full" rules={formValidationRules?.patient?.recordedDate} />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFDropdown showClear name={`${fieldName}.verificationStatus`} control={control} errors={errors} filter label="驗證狀態(verificationStatus)" options={verificationStatusList?.select} optionValue="code" optionLabel="display" filterBy="code,display" className="w-full" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFDropdown showClear
            labelClass={!currentVerificationStatus?.trim() || currentVerificationStatus?.trim() === "entered-in-error" ? "" : "required"}
            name={`${fieldName}.clinicalStatus`} control={control} errors={errors} filter label="臨床狀態(clinicalStatus)" options={clinicalStatusList?.select} optionValue="code" optionLabel="display" filterBy="code,display" className="w-full" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇"
            rules={{
              validate: (value: any) => {
                const verificationStatus = getValues(`${fieldName}.verificationStatus` as any);
                if (!verificationStatus || verificationStatus.trim() === "entered-in-error") return true;
                if (!value) return "臨床狀態為必填";
                return true;
              }
            }}
          />
        </div>
        <div className="field col-12 lg:col-4">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.recorder`} label="紀錄者身分證" type="text" maxLength={10} className="w-full" rules={formValidationRules?.patient?.recorder} showCharCount />
        </div>
        <div className="field col-12">
          <RHFTextarea register={register} errors={errors} name={`${fieldName}.allergy.description`} label="過敏史描述" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AllergyIntoleranceSection;
