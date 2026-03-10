import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/medicalValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import ExaminationReportItem from "./ExaminationReportItem";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import AiHelperButton from "../component/AiHelperButton";

interface Props {
  methods: UseFormReturn<TwpasForm>;
  onAiHelper?: (fieldKey: string) => void;
}

const ExaminationReportSection: React.FC<Props> = ({ methods, onAiHelper }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "diagnosis.examinationReport" });

  const [reportTypeList, setReportTypeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setReportTypeList(getMockCodeMapping("reportType"));
  }, []);

  return (
    <div className="mb-0">
      <h4 className="text-lg font-semibold mb-1 text-surface-700">
        <i className="pi pi-file-edit mr-2"></i>檢查報告(examinationReport)
      </h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <div className="flex align-items-end gap-1">
                <div className="flex-1">
                  <RHFDropdown name={`diagnosis.examinationReport.${index}.reportType`} control={control} errors={errors} label="報告類型(reportType)" filter options={reportTypeList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.reportType} className="w-full" />
                </div>
                {onAiHelper && <AiHelperButton onClick={() => onAiHelper('reportType')} />}
              </div>
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.examinationReport.${index}.speType`} label="檢體種類(speType)" rules={formValidationRules?.diagnosis?.speType} maxLength={20} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.examinationReport.${index}.reportDate`} label="報告日期(reportDate)" type="date" rules={formValidationRules?.diagnosis?.reportDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.examinationReport.${index}.reportPerformer`} label="檢查報告醫師身分證號(reportPerformer)" rules={formValidationRules?.diagnosis?.reportPerformer} maxLength={10} showCharCount className="w-full" />
            </div>
          </div>
          <ExaminationReportItem index={index} methods={methods} />
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增檢查報告" onClick={() => append({ reportType: "", speType: "", reportDate: "", reportPerformer: "", reportResult: { reportResultString: "", reportResultPdfList: [] } })} />
    </div>
  );
};

export default ExaminationReportSection;
