import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import { formValidationRules } from "../valid/cancerStageValid";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";

interface CancerStageInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const CancerStageInfo: React.FC<CancerStageInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;
  const [cancerStageList, setCancerStageList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setCancerStageList(getMockTwciCodeMapping("questionnaireResponse.cancerStage.cancerStage"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>癌症期別
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="cancerStage.cancerStage"
              control={control}
              errors={errors}
              label="癌症期別(cancerStage)"
              options={cancerStageList?.select}
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              className="w-full"
              optionValue="code"
              optionLabel="display"
              filter
              filterBy="code,display"
              virtualScrollerOptions={false}
              rules={formValidationRules?.cancerStage}
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="cancerStage.assessDate"
              label="癌症分期量表評估日期(assessDate)"
              type="date"
              rules={formValidationRules?.assessDate}
              className="w-full"
              tooltipText="格式:西元年(YYYY-MM-DD)"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="cancerStage.assessScore"
              label="癌症分期分數或結果(assessScore)"
              type="text"
              rules={formValidationRules?.assessScore}
              className="w-full"
              maxLength={12}
              showCharCount
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CancerStageInfo;
