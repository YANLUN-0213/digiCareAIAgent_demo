import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import { formValidationRules } from "../valid/patientValid";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";

interface PatientInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;
  const [zipCodeList, setZipCodeList] = useState<SelOptionType>({ select: [] });
  const [genderList, setGenderList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setZipCodeList(getMockTwciCodeMapping("patient.zipCode"));
    setGenderList(getMockTwciCodeMapping("patient.gender"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>基本資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.patID"
              label="病歷號(patID)"
              placeholder="請輸入病歷號"
              type="text"
              rules={formValidationRules?.patient?.patID}
              maxLength={20}
              className="w-full"
              tooltipText="由醫院自行填寫(參與醫院必須註冊命名系統)"
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.name"
              label="姓名(name)"
              placeholder="請輸入姓名"
              rules={formValidationRules?.patient?.name}
              maxLength={40}
              className="w-full"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.idCard"
              label="身分證號/統一證號(idCard)"
              placeholder="請輸入身分證號/統一證號"
              rules={formValidationRules?.patient?.idCard}
              maxLength={10}
              className="w-full"
              tooltipText="被保險人國民身分證統一編號"
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.birthday"
              label="出生日期(birthday)"
              type="date"
              rules={formValidationRules?.patient?.birthday}
              className="w-full"
              tooltipText="YYYY-MM-DD，西元年月日"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFDropdown
              name="patient.gender"
              control={control}
              errors={errors}
              label="病人性別(gender)"
              options={genderList?.select}
              optionValue="code"
              optionLabel="display"
              placeholder="請選擇病人性別"
              rules={formValidationRules?.patient?.gender}
              tooltipText="male:男性 female:女性 other:其他 unknown:未知"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-1">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>聯絡資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFDropdown
              name="patient.zipCode"
              control={control}
              errors={errors}
              label="郵遞區號(zipCode)"
              options={zipCodeList?.select}
              optionValue="code"
              optionLabel="display"
              tooltipText="3碼(ex)106"
              rules={formValidationRules?.patient?.zipCode}
              className="w-full"
              itemTemplate={CusCodeDisplayTemplate}
              valueTemplate={CusCodeDisplayTemplate}
              filter
              filterBy="code,display"
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-9">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.contactAddr"
              label="連絡住址(contactAddr)"
              type="text"
              rules={formValidationRules?.patient?.contactAddr}
              className="w-full"
              tooltipText="長度不得超過80字(ex)台北市大安區信義路三段140號"
              maxLength={80}
              showCharCount
            />
          </div>
          <div className="field col-12 card border-0">
            <label className="text-lg font-bold text-tip">
              <i className="pi pi-bell mr-2"></i>手機號碼與聯絡電話應至少填寫一欄
            </label>
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.mobile"
              label="手機號碼(mobile)"
              type="text"
              rules={formValidationRules?.patient?.mobile}
              className="w-full"
              placeholder="0912345678"
              tooltipText="應為數字10碼(寄送核發簡訊使用)"
              maxLength={10}
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.contactTel"
              label="連絡電話(contactTel)"
              type="text"
              rules={formValidationRules?.patient?.contactTel}
              className="w-full"
              placeholder="02270658668"
              tooltipText="長度不得超過15字"
              maxLength={15}
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="patient.email"
              label="電子郵件信箱(email)"
              type="email"
              rules={formValidationRules?.patient?.email}
              className="w-full"
              placeholder="a123456@nhi.gov.tw"
              tooltipText="長度不得超過40字(ex)a123456@nhi.gov.tw"
              maxLength={40}
              showCharCount
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientInfo;
