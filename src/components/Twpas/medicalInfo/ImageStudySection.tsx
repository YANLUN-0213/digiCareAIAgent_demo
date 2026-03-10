import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray, Controller } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFTextarea from "../utils/RHFTextarea";
import RHFDropdown from "../utils/RHFDropdown";
import { formValidationRules } from "../valid/medicalValid";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { CusCodeDisplayTemplate, CusFuncTypeTemplate } from "../itemValueOption/CusItemValueTemplate";
import { getMockCodeMapping } from "@/data/twpasMockCodeMappings";
import DicomSeriesListSection from "./DicomSeriesListSection";
import DynamicFieldArray from "../component/DynamicFieldArray";
import AiHelperButton from "../component/AiHelperButton";

interface ImageStudySectionProps {
  methods: UseFormReturn<TwpasForm>;
  onAiHelper?: (fieldKey: string) => void;
}

const ImageStudySection: React.FC<ImageStudySectionProps> = ({ methods, onAiHelper }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "diagnosis.imageStudy" });

  const [imgItemList, setImgItemList] = useState<SelOptionType>({ select: [] });
  const [imgBodySiteList, setImgBodySiteList] = useState<SelOptionType>({ select: [] });
  const [modalityList, setModalityList] = useState<SelOptionType>({ select: [] });
  const [sopClassList, setSopClassList] = useState<SelOptionType>({ select: [] });
  const [noDicomContentTypeList, setNoDicomContentTypeList] = useState<SelOptionType>({ select: [] });

  useEffect(() => {
    setImgItemList(getMockCodeMapping("imgItem"));
    setImgBodySiteList(getMockCodeMapping("imgBodySite"));
    setModalityList(getMockCodeMapping("modality"));
    setSopClassList(getMockCodeMapping("sopClass"));
    setNoDicomContentTypeList(getMockCodeMapping("noDicomData.contentType"));
  }, []);

  const dicomOptions = [
    { label: "DICOM影像", value: "dicom" },
    { label: "非DICOM影像", value: "nondicom" },
  ];

  return (
    <div className="mb-0">
      <h4 className="text-lg font-semibold mb-1 text-surface-700">
        <i className="pi pi-image mr-2"></i>影像資料(imageStudy)
      </h4>
      {fields.map((field, index) => (
        <div key={field.id} className="card border-1 surface-100 p-3 mb-2">
          <div className="flex justify-content-between align-items-center mb-2">
            <Badge value={`第 ${index + 1} 筆影像`} severity="info" />
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger p-button-text" onClick={() => remove(index)} />
          </div>
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6">
              <div className="flex align-items-end gap-1">
                <div className="flex-1">
                  <RHFDropdown name={`diagnosis.imageStudy.${index}.imgItem`} control={control} errors={errors} label="影像報告項目(imgItem)" filter filterBy="code,display,display_tw" options={imgItemList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusFuncTypeTemplate} valueTemplate={CusFuncTypeTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.imgItem} className="w-full" />
                </div>
                {onAiHelper && <AiHelperButton onClick={() => onAiHelper('imgItem')} />}
              </div>
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.imgDate`} label="影像報告日期(imgDate)" type="date" rules={formValidationRules?.diagnosis?.imgDate} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.imgInterpreter`} label="簽發影像報告醫師身分證號(imgInterpreter)" rules={formValidationRules?.diagnosis?.imgInterpreter} maxLength={10} showCharCount className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`diagnosis.imageStudy.${index}.imgBodySite`} control={control} errors={errors} label="影像檢查的身體部位(imgBodySite)" filter options={imgBodySiteList?.select} optionValue="code" optionLabel="display_tw" itemTemplate={CusFuncTypeTemplate} valueTemplate={CusFuncTypeTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.imgBodySite} className="w-full" />
            </div>
            <div className="field col-12 lg:col-6">
              <RHFDropdown name={`diagnosis.imageStudy.${index}.modality`} control={control} errors={errors} label="成像儀器代碼(modality)" options={modalityList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" className="w-full" />
            </div>
            <div className="field col-12">
              <RHFTextarea register={register} errors={errors} name={`diagnosis.imageStudy.${index}.imgResult`} label="影像報告結果(imgResult)" rules={formValidationRules?.diagnosis?.imgResult} maxLength={4000} showCharCount className="w-full" rows={3} control={control} />
            </div>

            {/* DICOM/NonDICOM toggle */}
            <div className="field col-12">
              <label>影像類型</label>
              <Controller name={`diagnosis.imageStudy.${index}.dicomStatus` as any} control={control}
                render={({ field: f }) => (
                  <SelectButton value={f.value} onChange={(e) => f.onChange(e.value)} options={dicomOptions} className="ml-2" />
                )}
              />
            </div>

            {methods.watch(`diagnosis.imageStudy.${index}.dicomStatus`) === "dicom" && (
              <div className="col-12 card border-1 p-2 mb-2">
                <Badge value="DICOM 影像資訊" severity="warning" className="mb-2" />
                <div className="formgrid grid">
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.dicomData.path`} label="DICOM影像路徑(path)" className="w-full" placeholder="(Demo 模式)" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.dicomData.contentType`} label="檔案格式(contentType)" className="w-full" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.dicomData.studyUID`} label="Study UID(studyUID)" rules={formValidationRules?.diagnosis?.dicomData?.studyUID} className="w-full" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.dicomData.seriesUID`} label="Series Instance UID" rules={formValidationRules?.diagnosis?.dicomData?.seriesUID} className="w-full" />
                  </div>
                </div>
                <DynamicFieldArray name={`diagnosis.imageStudy.${index}.dicomData.seriesList`} methods={methods} addtitle="新增Series" labelName="Series List" labelClassName="font-bold"
                  defaultValue={{ seriesUID: "", sopList: [] }}
                  isRequired={false}
                  children={(seriesFieldName, seriesIndex) => (
                    <DicomSeriesListSection fieldName={seriesFieldName} index={seriesIndex} methods={methods} sopClassList={sopClassList} />
                  )}
                />
              </div>
            )}

            {methods.watch(`diagnosis.imageStudy.${index}.dicomStatus`) === "nondicom" && (
              <div className="col-12 card border-1 p-2 mb-2">
                <Badge value="非DICOM 影像資訊" severity="warning" className="mb-2" />
                <div className="formgrid grid">
                  <div className="field col-12 lg:col-6">
                    <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${index}.noDicomData.path`} label="非DICOM影像路徑(path)" className="w-full" placeholder="(Demo 模式)" />
                  </div>
                  <div className="field col-12 lg:col-6">
                    <RHFDropdown name={`diagnosis.imageStudy.${index}.noDicomData.contentType`} control={control} errors={errors} label="檔案格式(contentType)" options={noDicomContentTypeList?.select} optionValue="code" optionLabel="display" placeholder="請選擇" className="w-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增影像資料" onClick={() => append({ imgItem: "", imgDate: "", imgResult: "", imgInterpreter: "", imgBodySite: "", modality: "" })} />
    </div>
  );
};

export default ImageStudySection;
