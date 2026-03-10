import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/hospValid";
import RHFDropdown from "../utils/RHFDropdown";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import { CusCodeDisplayTemplate, CusFuncTypeTemplate } from "../itemValueOption/CusItemValueTemplate";

interface HospInfoProps {
  methods: UseFormReturn<TwpasForm>;
  onJumpToApprove?: () => void;
}

const HospInfo: React.FC<HospInfoProps> = ({ methods, onJumpToApprove }) => {
  const { watch, control, register, clearErrors, trigger, setValue, formState: { errors } } = methods;

  const applType = watch("hosp.applType");
  const oldAcptNo = watch("hosp.oldAcptNo");
  const [funcTypeList, setFuncTypeList] = useState<SelOptionType>({ select: [] });

  const tmhbTypeList = [
    { label: '一般事前審查申請 (1)', value: '1' },
    { label: '自主審查 (3)', value: '3' },
    { label: '緊急報備 (4)', value: '4' },
  ];

  const oldAcptNoRules = {
    maxLength: { value: 20, message: "原受理編號不可超過20個字元" },
    validate: (_value: string, formValues: any) => {
      const applTypeStr = formValues?.hosp?.applType;
      const requiredApplTypes = ["2", "3", "4", "5"];
      const isRequired = requiredApplTypes.includes(applTypeStr);
      if (isRequired && !_value?.trim()) {
        return "當申報類別為 2、3、4、5 時，原受理編號為必填";
      }
      return true;
    }
  };

  useEffect(() => {
    setFuncTypeList(getMockCodeMapping("funcType"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>基本資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-6">
            <RHFInputText register={register} errors={errors} name="hosp.hospId" label="醫事機構代碼(hospId)" placeholder="請輸入10個字元" type="text" rules={formValidationRules?.hosp?.hospId} maxLength={10} className="w-full" tooltipText="必須存在於醫事機構基本資料檔內(ex)1145010010" showCharCount />
          </div>
          <div className="field col-12 sm:col-6 xl:col-6">
            <RHFDropdown name="hosp.applType" control={control} errors={errors} label="申報類別(applType)" options={[
              { label: "1-送核", value: "1" },
              { label: "2-送核補件", value: "2" },
              { label: "3-申復", value: "3" },
              { label: "4-爭議審議", value: "4" },
              { label: "5-申復補件", value: "5" },
            ]} placeholder="請選擇申報類別" rules={formValidationRules?.hosp?.applType} className="w-full" virtualScrollerOptions={false}
              onChange={async (e) => {
                if (e.value === '1') {
                  clearErrors(["hosp.oldAcptNo"]);
                } else if (!oldAcptNo) {
                  await trigger("hosp.oldAcptNo");
                }
              }}
            />
          </div>
          <div className="field col-12 sm:col-12 xl:col-6">
            <RHFDropdown name="hosp.funcType" control={control} errors={errors} label="就醫科別(funcType)" tooltipText="SNOMED CT，為細分科之就醫科別，作為審查分科用(ex)419192003" filter filterBy="display_tw,display,code" options={funcTypeList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusFuncTypeTemplate} valueTemplate={CusFuncTypeTemplate} placeholder="請選擇就醫科別" rules={formValidationRules?.hosp?.funcType} className="w-full" />
          </div>
        </div>
      </div>

      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-user mr-2"></i>申請醫師資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 lg:col-6">
            <RHFInputText register={register} errors={errors} name="hosp.applPrsnId" label="申請醫師身分證號/統一證號(applPrsnId)" placeholder="請輸入身分證號/統一證號" rules={formValidationRules?.hosp?.applPrsnId} maxLength={10} className="w-full" tooltipText="必須存在於醫事人員基本資料檔內，並於合約生效起迄日內" />
          </div>
          <div className="field col-12 lg:col-6">
            <RHFInputText register={register} errors={errors} name="hosp.applDate" label="申請日期(applDate)" type="date" rules={formValidationRules?.hosp?.applDate} className="w-full" tooltipText="YYYY-MM-DD，機構自填，健保署收案後另建受理日期" />
          </div>
        </div>
      </div>

      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-file mr-2"></i>案件資訊
        </h4>
        <label>
          {watch("hosp.tmhbType") === "3" ? (
            <div className="text-blue-500">
              <i className="pi pi-exclamation-circle mr-2"></i>v1.0.9 申請案件類別為自主審查(3)須填寫事前審查:核定日期、審查結果數量、核定註記及審查委員身分證號。
              <i onClick={onJumpToApprove} className="pi pi-external-link cursor-pointer" title="前往填寫"></i>
            </div>
          ) : null}
        </label>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 lg:col-4">
            <RHFDropdown name="hosp.tmhbType" control={control} errors={errors} label="申請案件類別(tmhbType)" tooltipText="1:一般事前審查申請 3:自主審查 4:緊急報備" options={tmhbTypeList} placeholder="請選擇" rules={formValidationRules?.hosp?.tmhbType} className="w-full"
              onChange={(e) => {
                let typeV = e.target.value;
                if (typeV !== "3") {
                  clearErrors("apply.approve");
                } else if (typeV === "3") {
                  let applyList = watch("apply.approve");
                  if (applyList?.length === 0) {
                    setValue("apply.approve", [{
                      approveDate: "",
                      approveNum: "",
                      approveComment: "",
                      outcome: "",
                      adjudicationCode: "",
                      requestors: [" "],
                    }]);
                  }
                }
              }}
            />
          </div>
          <div className="field col-12 sm:col-6 lg:col-4">
            <RHFInputText register={register} errors={errors} name="hosp.immediateDate" label="緊急報備日期(immediateDate)" type="datetime-local" step="1" rules={formValidationRules?.hosp?.immediateDate} className="w-full" tooltipText="YYYY-MM-DDTHH:MM:SS" />
          </div>
          <div className="field col-12 sm:col-12 lg:col-4">
            <RHFInputText register={register} errors={errors} name="hosp.oldAcptNo" label="原受理編號(oldAcptNo)" placeholder="如有舊案請填入" labelClass={`${["2", "3", "4", "5"].includes(applType) ? 'required' : ''}`} rules={oldAcptNoRules} maxLength={20} className="w-full" tooltipText="當申報類別為2、3、4、5時需填寫原受理編號" showCharCount />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospInfo;
