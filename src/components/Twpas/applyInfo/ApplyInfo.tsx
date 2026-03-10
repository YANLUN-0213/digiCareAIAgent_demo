import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import DynamicFieldArray from "../component/DynamicFieldArray";
import ApplyDataInfo from "./ApplyDataInfo";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import { getApplyFormValidationRules } from "../valid/applyValid";

interface Props {
  methods: UseFormReturn<TwpasForm>;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

const ApplyInfo: React.FC<Props> = ({ methods, targetRef }) => {
  const { register, control, watch, formState: { errors } } = methods;
  const tmhbType = watch("hosp.tmhbType");
  const isSelfReview = tmhbType === "3";
  const approveRules = getApplyFormValidationRules(isSelfReview);

  const [applyReasonList, setApplyReasonList] = useState<SelOptionType>({ select: [] });
  const [outcomeList, setOutcomeList] = useState<SelOptionType>({ select: [] });
  const [adjudicationCodeList, setAdjudicationCodeList] = useState<SelOptionType>({ select: [] });
  const [approveCommentList, setApproveCommentList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setApplyReasonList(getMockCodeMapping("applyReason"));
    setOutcomeList(getMockCodeMapping("outcome"));
    setAdjudicationCodeList(getMockCodeMapping("adjudicationCode"));
    setApproveCommentList(getMockCodeMapping("approveComment"));
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-1 text-surface-700"><i className="pi pi-send mr-2"></i>事前審查申請資訊</h4>
      {isSelfReview && (
        <div className="text-blue-500 mb-2"><i className="pi pi-exclamation-circle mr-2"></i>申請案件類別為自主審查(3)，須填寫事前審查相關欄位</div>
      )}

      <DynamicFieldArray name="apply.applyData" methods={methods} addtitle="新增申請項目" labelName="申請項目(applyData)(多筆)" labelClassName="font-bold" delBtnAlign="align-item-start"
        defaultValue={{ orderType: "", cancerDrugType: "", applyReason: "", continuation: "", lot: "", medicationUsage: [{ applQty: 0, applQtyUnit: "", applDrugCycle: null, applDosage: 0, applDosageUnit: "", useSdate: "", useEdate: "", applDrugFre: [], applDrugRoute: [] }] }}
        isRequired={true}
        children={(fieldName, index) => (
          <Panel expandIcon="pi pi-chevron-right" collapseIcon="pi pi-chevron-down" toggleable collapsed={false} header={`申請項目 第 ${index + 1} 筆`} className="mb-2">
            <ApplyDataInfo fieldName={fieldName} index={index} methods={methods} applyReasonList={applyReasonList} />
          </Panel>
        )}
      />

      <Divider />

      <div ref={targetRef}>
        <h5 className="font-semibold">事前審查(approve)</h5>
        <DynamicFieldArray name="apply.approve" methods={methods} addtitle="新增審查結果" labelName="審查結果(approve)(多筆)" labelClassName="font-bold" delBtnAlign="align-item-start"
          defaultValue={{ approveDate: "", approveNum: "", approveComment: "", outcome: "", adjudicationCode: "", requestors: [""] }}
          isRequired={false}
          children={(fieldName, index) => (
            <Panel expandIcon="pi pi-chevron-right" collapseIcon="pi pi-chevron-down" toggleable collapsed={false} header={`審查結果 第 ${index + 1} 筆`} className="mb-2">
              <div className="formgrid grid p-2">
                <div className="field col-12 lg:col-6">
                  <RHFInputText register={register} errors={errors} name={`${fieldName}.approveDate`} label="核定日期(approveDate)" type="date" rules={approveRules?.approveDate} className="w-full" />
                </div>
                <div className="field col-12 lg:col-6">
                  <RHFInputText register={register} errors={errors} name={`${fieldName}.approveNum`} label="審查結果數量(approveNum)" type="number" rules={approveRules?.approveNum} className="w-full" />
                </div>
                <div className="field col-12 lg:col-4">
                  <RHFDropdown name={`${fieldName}.approveComment`} control={control} errors={errors} label="核定註記(approveComment)" options={approveCommentList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={approveRules?.approveComment} className="w-full" />
                </div>
                <div className="field col-12 lg:col-4">
                  <RHFDropdown name={`${fieldName}.outcome`} control={control} errors={errors} label="處置狀態(outcome)" options={outcomeList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={approveRules?.outcome} className="w-full" />
                </div>
                <div className="field col-12 lg:col-4">
                  <RHFDropdown name={`${fieldName}.adjudicationCode`} control={control} errors={errors} label="審查類型(adjudicationCode)" options={adjudicationCodeList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" rules={approveRules?.adjudicationCode} className="w-full" />
                </div>
              </div>
              <DynamicFieldArray name={`${fieldName}.requestors`} methods={methods} addtitle="新增審查委員" labelName="審查委員身分證號(requestors)" labelClassName="font-bold"
                defaultValue="" isRequired={false}
                children={(reqFieldName, reqIndex) => (
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={reqFieldName} label={`審查委員 ${reqIndex + 1}`} maxLength={10} rules={approveRules?.requestors} className="w-full" />
                  </div>
                )}
              />
            </Panel>
          )}
        />
      </div>
    </div>
  );
};

export default ApplyInfo;
