import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import { formValidationRules } from "../valid/patientValid";
import RHFDropdown from "../utils/RHFDropdown";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { Panel } from "primereact/panel";
import AllergyIntoleranceSection from "./AllergyIntoleranceSection";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface PatientInfoProps {
  methods: UseFormReturn<TwpasForm>;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ methods }) => {
  const { control, register, formState: { errors } } = methods;

  const [clinicalStatusList, setClinicalStatusList] = useState<SelOptionType>({ select: [] });
  const [verificationStatusList, setVerificationStatusList] = useState<SelOptionType>({ select: [] });
  const [allergyList, setAllergyList] = useState<SelOptionType>({ select: [] });
  const [bloodList, setBloodList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setClinicalStatusList(getMockCodeMapping("clinicalStatus"));
    setVerificationStatusList(getMockCodeMapping("verificationStatus"));
    setAllergyList(getMockCodeMapping("allergy"));
    setBloodList(getMockCodeMapping("blood"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-info-circle mr-2"></i>基本資訊</h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.patId" label="病歷號(patId)" placeholder="請輸入病歷號" type="text" rules={formValidationRules?.patient?.patId} maxLength={20} className="w-full" tooltipText="由醫院自行填寫" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.name" label="姓名(name)" placeholder="請輸入姓名" rules={formValidationRules?.patient?.name} maxLength={40} className="w-full" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.idCard" label="身分證號/統一證號(idCard)" placeholder="請輸入身分證號/統一證號" rules={formValidationRules?.patient?.idCard} maxLength={10} className="w-full" tooltipText="被保險人國民身分證統一編號" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.birthday" label="出生日期(birthday)" type="date" rules={formValidationRules?.patient?.birthday} className="w-full" tooltipText="YYYY-MM-DD" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFDropdown name="patient.gender" control={control} errors={errors} label="病人性別(gender)" options={[
              { label: "男性", value: "male" },
              { label: "女性", value: "female" },
              { label: "其他", value: "other" },
              { label: "unknown", value: "未知" },
            ]} placeholder="請選擇病人性別" rules={formValidationRules?.patient?.gender} tooltipText="male:男性 female:女性 other:其他 unknown:未知" className="w-full" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.weight" label="病人體重(weight)" type="number" placeholder="請輸入數字" rules={formValidationRules?.patient?.weight} className="w-full" step="any" tooltipText="整數至多3位數及小數至多2位數" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFInputText register={register} errors={errors} name="patient.height" label="病人身高(height)" placeholder="請輸入數字" type="number" step="any" rules={formValidationRules?.patient?.height} className="w-full" tooltipText="整數至多3位數及小數至多2位數" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFDropdown name="patient.pregnant" label="是否懷孕或哺乳(pregnant)" control={control} errors={errors} options={[
              { label: "false-未懷孕或哺乳", value: "false" },
              { label: "true-有懷孕或哺乳", value: "true" },
            ]} placeholder="請選擇" rules={formValidationRules?.patient?.pregnant} className="w-full" />
          </div>
          <div className="field col-12 sm:col-6 xl:col-3">
            <RHFDropdown name="patient.blood" label="血型(blood)" control={control} errors={errors} filter options={bloodList?.select} optionValue="code" optionLabel="display" filterBy="code,display" className="w-full" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" />
          </div>
        </div>
      </div>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-info-circle mr-2"></i>過敏史</h4>
        <DynamicFieldArray name="patient.allergyIntolerance" methods={methods} addtitle="新增過敏史" labelName="過敏史(allergyIntolerance)(多筆)" labelClassName="font-bold" delBtnAlign="align-item-start"
          defaultValue={{ allergy: { code: "", description: "" }, clinicalStatus: "", verificationStatus: "", recordedDate: "", recorder: "" }}
          isRequired={false}
          children={(fieldName, index) => (
            <Panel expandIcon="pi pi-chevron-right" collapseIcon="pi pi-chevron-down" toggleable collapsed={false} header={`第 ${index + 1} 筆 過敏紀錄`} className="mb-3">
              <AllergyIntoleranceSection clinicalStatusList={clinicalStatusList} verificationStatusList={verificationStatusList} allergyList={allergyList} fieldName={fieldName} index={index} methods={methods} />
            </Panel>
          )}
        />
      </div>
    </>
  );
};

export default PatientInfo;
