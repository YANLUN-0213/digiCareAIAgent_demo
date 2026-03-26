import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import RHFTextarea from "@/components/Twpas/utils/RHFTextarea";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import RHFMultiSelect from "@/components/Twpas/utils/RHFMultiSelect";
import { formValidationRules } from "../valid/illnessValid";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";

interface IllnessInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const IllnessInfo: React.FC<IllnessInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;

  const [oriCancerAjccList, setOriCancerAjccList] = useState<SelOptionType>({ select: [] });
  const [cancerStatusList, setCancerStatusList] = useState<SelOptionType>({ select: [] });
  const [cancerTreatmentList, setCancerTreatmentList] = useState<SelOptionType>({ select: [] });
  const [cancerTreatmentPlanList, setCancerTreatmentPlanList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setOriCancerAjccList(getMockTwciCodeMapping("questionnaireResponse.illness.oriCancerAjcc"));
    setCancerStatusList(getMockTwciCodeMapping("questionnaireResponse.illness.cancerStatus"));
    setCancerTreatmentList(getMockTwciCodeMapping("questionnaireResponse.illness.cancerTreatment"));
    setCancerTreatmentPlanList(getMockTwciCodeMapping("questionnaireResponse.illness.cancerTreatmentPlan"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>惡性腫瘤重大傷病換發評估表
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="illness.code"
              label="原發癌症診斷碼ICD-CM(code)"
              type="text"
              rules={formValidationRules?.code}
              className="w-full"
              tooltipText="ICD10-CM，最長為7碼。"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="illness.date"
              label="癌症最初診斷日期(date)"
              type="date"
              className="w-full"
              tooltipText="癌症最初診斷日期，西元年月日；不得大於系統日。"
              rules={formValidationRules.date}
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="illness.cancerStatus"
              control={control}
              errors={errors}
              label="目前癌症狀態(cancerStatus)"
              options={cancerStatusList?.select}
              optionValue="code"
              optionLabel="display"
              filter
              filterBy="code,display"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              placeholder="請選擇"
              className="w-full"
              rules={formValidationRules.cancerStatus}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="illness.oriCancerAjcc"
              control={control}
              errors={errors}
              virtualScrollerOptions={false}
              label="癌症最初診斷AJCC分期(oriCancerAjcc)"
              options={oriCancerAjccList?.select}
              optionValue="code"
              optionLabel="display"
              filter
              filterBy="code,display"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              placeholder="請選擇"
              className="w-full"
              rules={formValidationRules.oriCancerAjcc}
            />
          </div>
          <div className="field col-12">
            <RHFTextarea
              register={register}
              errors={errors}
              name="illness.oriCancerAjcc1"
              label="癌症最初診斷AJCC分期_補充說明欄位(oriCancerAjcc1)"
              className="w-full"
              maxLength={20}
              showCharCount
              tooltipText="癌症最初診斷AJCC分期_補充說明欄位，若前述欄位為9，則請於此欄位描述其他系統之其他分期為何。"
              rules={formValidationRules.oriCancerAjcc1}
            />
          </div>
        </div>
        <div className="grid">
          <div className="field col-12 sm:col-6 xl:col-6">
            <RHFMultiSelect
              filter
              name="illness.cancerTreatment"
              control={control}
              errors={errors}
              label="後續治療評估(cancerTreatment)"
              options={cancerTreatmentList?.select}
              optionValue="code"
              optionLabel="display"
              filterBy="code,display"
              itemTemplate={CusCodeDisplayTemplate}
              className="w-full"
              tooltipText="當申請類別為【換發】時，此欄位必填"
              placeholder="後續治療評估，可複選"
              maxSelectedLabels={0}
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-6">
            <RHFMultiSelect
              filter
              name="illness.cancerTreatmentPlan"
              control={control}
              errors={errors}
              label="後續治療計劃(cancerTreatmentPlan)"
              options={cancerTreatmentPlanList?.select}
              optionValue="code"
              optionLabel="display"
              filterBy="code,display"
              itemTemplate={CusCodeDisplayTemplate}
              className="w-full"
              tooltipText="當申請類別為【換發】時，此欄位必填"
              placeholder="後續治療計劃，可複選"
              maxSelectedLabels={0}
            />
          </div>
        </div>
        <div className="field col-12">
          <RHFTextarea
            register={register}
            errors={errors}
            name="illness.cancerTreatmentText"
            label="補充說明(cancerTreatmentText)"
            className="w-full"
            tooltipText="補充欄位供申請院所自行補充說明"
            maxLength={400}
            showCharCount
            rules={formValidationRules.cancerTreatmentText}
          />
        </div>
      </div>
    </>
  );
};

export default IllnessInfo;
