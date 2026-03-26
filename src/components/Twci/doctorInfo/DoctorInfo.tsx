import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import { formValidationRules } from "../valid/doctorValid";
import { TwciForm } from "../type/twciform";

interface DoctorInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ methods }) => {
  const { register, formState: { errors } } = methods;

  return (
    <>
      <div className="mb-0">
        <h4 className="text-lg font-semibold mb-1 text-surface-700">
          <i className="pi pi-info-circle mr-2"></i>醫師資訊
        </h4>
        <div className="formgrid grid">
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="doctor.diagPrsnId"
              label="醫師身分證字號(diagPrsnId)"
              placeholder="請輸入醫師身分證字號"
              type="text"
              rules={formValidationRules?.doctor?.diagPrsnId}
              maxLength={10}
              className="w-full"
              tooltipText="申請醫師身分證號"
              showCharCount
            />
          </div>
          <div className="field col-12 sm:col-6 xl:col-4">
            <RHFInputText
              register={register}
              errors={errors}
              name="doctor.diagPrsnName"
              label="姓名(diagPrsnName)"
              placeholder="診斷醫師姓名"
              rules={formValidationRules?.doctor?.diagPrsnName}
              maxLength={40}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorInfo;
