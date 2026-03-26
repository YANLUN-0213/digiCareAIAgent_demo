import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import { formValidationRules } from "../valid/ciValid";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";
import DynamicFieldArray from "@/components/Twpas/component/DynamicFieldArray";

interface CiInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const CiInfo: React.FC<CiInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;

  const [clinicalStatusList, setClinicalStatusList] = useState<SelOptionType>({ select: [] });
  const [verificationStatusList, setVerificationStatusList] = useState<SelOptionType>({ select: [] });
  const [severityList, setSeverityList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setClinicalStatusList(getMockTwciCodeMapping("condition.clinicalStatus"));
    setVerificationStatusList(getMockTwciCodeMapping("condition.verificationStatus"));
    setSeverityList(getMockTwciCodeMapping("condition.severity"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>重大傷病
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="condition.recordedDate"
              label="記錄的日期(recordedDate)"
              type="date"
              rules={formValidationRules?.recordedDate}
              className="w-full"
              tooltipText="YYYY-MM-DD，西元年月日"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="condition.clinicalStatus"
              control={control}
              errors={errors}
              filter
              label="病情、問題或診斷的臨床狀態(clinicalStatus)"
              options={clinicalStatusList?.select}
              optionValue="code"
              optionLabel="display"
              className="w-full"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              placeholder="請選擇"
              rules={formValidationRules?.clinicalStatus}
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="condition.verificationStatus"
              control={control}
              errors={errors}
              filter
              label="驗證狀態(verificationStatus)"
              options={verificationStatusList?.select}
              optionValue="code"
              optionLabel="display"
              className="w-full"
              rules={formValidationRules?.verificationStatus}
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              placeholder="請選擇"
              tooltipText="支持或拒絕病情、問題或診斷的臨床狀態的驗證狀態"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="condition.severity"
              control={control}
              errors={errors}
              label="病情、問題或診斷的主觀嚴重程度(severity)"
              options={severityList?.select}
              optionValue="code"
              optionLabel="display"
              className="w-full"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              filter
              placeholder="請選擇"
              rules={formValidationRules?.severity}
            />
          </div>
          <div className="field col-12">
            <DynamicFieldArray
              name="condition.bodySiteArray"
              methods={methods}
              addtitle="新增解剖位置"
              labelName="如果相關請填寫解剖位置(bodySiteArray)多筆"
              labelClassName=""
              defaultValue=""
              isRequired={false}
              children={(fieldName, index) => (
                <div className="my-2">
                  <RHFInputText
                    name={fieldName}
                    label={`第 ${index + 1} 筆 解剖位置`}
                    register={register}
                    errors={errors}
                    type="text"
                    className="w-full"
                    rules={formValidationRules.bodySite}
                    tooltipText="描述解剖位置的代碼。可包括側面；應填入所綁定值集中適合的代碼，確定無適合的代碼才可以使用其他值集的代碼來表示。"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CiInfo;
