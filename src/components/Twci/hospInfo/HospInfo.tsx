import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import { formValidationRules } from "../valid/hospValid";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";

interface HospInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const HospInfo: React.FC<HospInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;
  const [applModeList, setApplModeList] = useState<SelOptionType>({ select: [] });
  const [applTypeList, setApplTypeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setApplModeList(getMockTwciCodeMapping("questionnaireResponse.hosp.applMode"));
    setApplTypeList(getMockTwciCodeMapping("questionnaireResponse.hosp.applType"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>基本資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-4">
            <RHFDropdown
              name="hosp.applMode"
              control={control}
              errors={errors}
              label="申報方式(applMode)"
              options={applModeList?.select}
              placeholder="請選擇申報方式"
              tooltipText="醫院報備固定為 2(院所代辦)"
              rules={formValidationRules?.hosp?.applMode}
              className="w-full"
              optionValue="code"
              optionLabel="display"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
            />
          </div>
          <div className="field col-12 sm:col-4">
            <RHFDropdown
              name="hosp.applType"
              control={control}
              errors={errors}
              label="申報類別(applType)"
              virtualScrollerOptions={{ itemSize: 45 }}
              options={applTypeList?.select}
              placeholder="請選擇申報類別"
              tooltipText="醫院上傳固定為1(送核)"
              rules={formValidationRules?.hosp?.applType}
              className="w-full"
              optionValue="code"
              optionLabel="display"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
            />
          </div>
          <div className="field col-12 sm:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="hosp.hospId"
              label="醫事機構代碼(hospId)"
              placeholder="請輸入10個字元"
              type="text"
              rules={formValidationRules?.hosp?.hospId}
              maxLength={10}
              className="w-full"
              tooltipText="必須存在於醫事機構基本資料檔內(ex)1145010010"
              showCharCount
            />
          </div>
        </div>
      </div>

      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-file mr-2"></i>案件資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 lg:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="hosp.applDate"
              label="申請日期(applDate)"
              type="date"
              step="1"
              rules={formValidationRules?.hosp?.applDate}
              className="w-full"
              tooltipText="格式:西元年(YYYY-MM-DD)"
            />
          </div>
          <div className="field col-12 sm:col-6 lg:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="hosp.medCertBookDate"
              label="開立診斷書申請日期(medCertBookDate)"
              type="date"
              step="1"
              rules={formValidationRules?.hosp?.medCertBookDate}
              className="w-full"
              tooltipText="格式:西元年(YYYY-MM-DD)。開立診斷書申請日期，不可大於系統日，不可小於2016-01-01，且為系統日之30日內。"
            />
          </div>
          <div className="field col-12 sm:col-12 lg:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="hosp.acptNo"
              label="受理編號(acptNo)"
              className="w-full"
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-12 lg:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="hosp.acptNum"
              label="受理次數(acptNum)"
              className="w-full"
              type="number"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospInfo;
