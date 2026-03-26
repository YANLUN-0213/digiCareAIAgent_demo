import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "@/components/Twpas/utils/RHFInputText";
import RHFDropdown from "@/components/Twpas/utils/RHFDropdown";
import { formValidationRules } from "../valid/diagnosisValid";
import { SelOptionType, TwciForm } from "../type/twciform";
import { getMockTwciCodeMapping } from "@/data/twciMockCodeMappings";
import { CusCodeDisplayTemplate } from "@/components/Twpas/itemValueOption/CusItemValueTemplate";
import DynamicFieldArray from "@/components/Twpas/component/DynamicFieldArray";
import { Panel } from "primereact/panel";

interface DiagnosisInfoProps {
  methods: UseFormReturn<TwciForm>;
}

const DiagnosisInfo: React.FC<DiagnosisInfoProps> = ({ methods }) => {
  const { register, control, formState: { errors } } = methods;
  const [icd10CmCodeList, setIcd10CmCodeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setIcd10CmCodeList(getMockTwciCodeMapping("questionnaireResponse.diagnosis.icd10cmCode"));
  }, []);

  return (
    <>
      <div className="mb-0">
        <RHFDropdown
          name="diagnosis.icd10cmCode"
          control={control}
          errors={errors}
          label="主診斷代碼(icd10cmCode)"
          placeholder="請輸入 ICD10-CM"
          rules={formValidationRules?.diagnosis?.icd10cmCode}
          filter
          filterBy="code,display"
          className="w-full"
          tooltipText="(ex)C00.0"
          options={icd10CmCodeList?.select}
          optionValue="code"
          optionLabel="display"
          itemTemplate={CusCodeDisplayTemplate}
          valueTemplate={CusCodeDisplayTemplate}
        />

        {/* 檢查報告 */}
        <h4 className="text-lg font-semibold mb-1 mt-3 text-surface-700">
          <i className="pi pi-file mr-2"></i>檢查報告(examinationReport)
        </h4>
        <DynamicFieldArray
          name="diagnosis.examinationReportArray"
          methods={methods}
          addtitle="新增檢查報告"
          labelName="檢查報告(多筆)"
          labelClassName=""
          defaultValue={{
            reportType: "",
            speType: "",
            reportResultString: "",
            reportResultPdf: "",
            reportResultPdfTitle: "",
            reportDate: "",
          }}
          isRequired={false}
          children={(fieldName, index) => (
            <Panel
              toggleable
              collapsed={false}
              header={`第 ${index + 1} 筆 檢查報告`}
              className="mb-3"
            >
              <div className="formgrid grid">
                <div className="field col-12 sm:col-6 xl:col-4">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.reportType`}
                    label="報告類型(reportType)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.reportType}
                    className="w-full"
                    maxLength={12}
                    showCharCount
                  />
                </div>
                <div className="field col-12 sm:col-6 xl:col-4">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.speType`}
                    label="檢體種類(speType)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.speType}
                    className="w-full"
                    maxLength={20}
                    showCharCount
                  />
                </div>
                <div className="field col-12 sm:col-6 xl:col-4">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.reportDate`}
                    label="報告日期(reportDate)"
                    type="date"
                    rules={formValidationRules?.diagnosis?.reportDate}
                    className="w-full"
                  />
                </div>
                <div className="field col-12">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.reportResultString`}
                    label="檢查報告結果(reportResultString)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.reportResultString}
                    className="w-full"
                  />
                </div>
                <div className="field col-12 sm:col-6">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.reportResultPdfTitle`}
                    label="檢查報告名稱(reportResultPdfTitle)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.reportResultPdfTitle}
                    className="w-full"
                    maxLength={50}
                    showCharCount
                  />
                </div>
                <div className="field col-12 sm:col-6">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.reportResultPdf`}
                    label="檢查報告檔案路徑(reportResultPdf)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.reportResultPdf}
                    className="w-full"
                    maxLength={50}
                    showCharCount
                    tooltipText="Demo模式僅填寫路徑文字，不支援實際上傳"
                  />
                </div>
              </div>
            </Panel>
          )}
        />

        {/* 病歷資料 */}
        <h4 className="text-lg font-semibold mb-1 mt-3 text-surface-700">
          <i className="pi pi-file mr-2"></i>病歷資料(medrec)
        </h4>
        <DynamicFieldArray
          name="diagnosis.medrec"
          methods={methods}
          addtitle="新增病歷資料"
          labelName="病歷資料(多筆)"
          labelClassName=""
          defaultValue={{ medrec: "", medrecTitle: "", medrecUUID: "" }}
          isRequired={false}
          children={(fieldName, index) => (
            <div className="formgrid grid my-2">
              <div className="field col-12 sm:col-6">
                <RHFInputText
                  register={register}
                  errors={errors}
                  name={`${fieldName}.medrecTitle`}
                  label={`第 ${index + 1} 筆 病歷資料名稱`}
                  type="text"
                  rules={formValidationRules?.diagnosis?.medrecTitle}
                  className="w-full"
                  maxLength={50}
                  showCharCount
                />
              </div>
              <div className="field col-12 sm:col-6">
                <RHFInputText
                  register={register}
                  errors={errors}
                  name={`${fieldName}.medrec`}
                  label="病歷資料路徑(medrec)"
                  type="text"
                  rules={formValidationRules?.diagnosis?.medrec}
                  className="w-full"
                  maxLength={50}
                  showCharCount
                  tooltipText="Demo模式僅填寫路徑文字"
                />
              </div>
            </div>
          )}
        />

        {/* 影像報告 */}
        <h4 className="text-lg font-semibold mb-1 mt-3 text-surface-700">
          <i className="pi pi-image mr-2"></i>影像報告(imageStudy)
        </h4>
        <DynamicFieldArray
          name="diagnosis.imageStudy"
          methods={methods}
          addtitle="新增影像報告"
          labelName="影像報告(多筆)"
          labelClassName=""
          defaultValue={{
            imgItem: "",
            imgResult: "",
            imgDate: "",
            imgBodySite: "",
          }}
          isRequired={false}
          children={(fieldName, index) => (
            <Panel
              toggleable
              collapsed={false}
              header={`第 ${index + 1} 筆 影像報告`}
              className="mb-3"
            >
              <div className="formgrid grid">
                <div className="field col-12 sm:col-6 xl:col-3">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.imgItem`}
                    label="影像報告項目(imgItem)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.imgItem}
                    className="w-full"
                    maxLength={10}
                    showCharCount
                  />
                </div>
                <div className="field col-12 sm:col-6 xl:col-3">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.imgDate`}
                    label="影像報告日期(imgDate)"
                    type="date"
                    rules={formValidationRules?.diagnosis?.imgDate}
                    className="w-full"
                  />
                </div>
                <div className="field col-12 sm:col-6 xl:col-3">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.imgBodySite`}
                    label="影像檢查身體部位(imgBodySite)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.imgBodySite}
                    className="w-full"
                    maxLength={12}
                    showCharCount
                  />
                </div>
                <div className="field col-12">
                  <RHFInputText
                    register={register}
                    errors={errors}
                    name={`${fieldName}.imgResult`}
                    label="影像報告結果(imgResult)"
                    type="text"
                    rules={formValidationRules?.diagnosis?.imgResult}
                    className="w-full"
                  />
                </div>
              </div>
            </Panel>
          )}
        />
      </div>
    </>
  );
};

export default DiagnosisInfo;
