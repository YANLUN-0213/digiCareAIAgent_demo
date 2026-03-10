import React from "react";
import { UseFormReturn } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import { SelOptionType, TwpasForm } from "../type/twpasform";
import { formValidationRules } from "../valid/medicalValid";
import { Badge } from "primereact/badge";
import { Panel } from "primereact/panel";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";

interface Props {
  fieldName: string;
  index: number;
  methods: UseFormReturn<TwpasForm>;
  sopClassList: SelOptionType;
}

const DicomSeriesListSection: React.FC<Props> = ({ fieldName, index, methods, sopClassList }) => {
  const { register, control, formState: { errors } } = methods;

  return (
    <div className="p-2">
      <Badge value={`Series ${index + 1}`} severity="info" className="mb-2" />
      <div className="formgrid grid">
        <div className="field col-12 lg:col-6">
          <RHFInputText register={register} errors={errors} name={`${fieldName}.seriesUID`} label="Series Instance UID(seriesUID)" className="w-full" />
        </div>
      </div>
      <Panel header="SOP Instance UIDs" toggleable collapsed className="mb-2">
        <DynamicFieldArray name={`${fieldName}.sopList`} methods={methods} addtitle="新增SOP Instance UID" defaultValue={{ uid: "", class: "" }} isRequired={false}
          children={(sopFieldName, sopIndex) => (
            <div className="formgrid grid">
              <div className="field col-12 lg:col-6">
                <RHFInputText register={register} errors={errors} name={`${sopFieldName}.uid`} label="UID" rules={formValidationRules?.diagnosis?.dicomData?.sopList?.uid} className="w-full" />
              </div>
              <div className="field col-12 lg:col-6">
                <RHFDropdown name={`${sopFieldName}.class`} control={control} errors={errors} label="SOP Class" options={sopClassList?.select} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" rules={formValidationRules?.diagnosis?.dicomData?.sopList?.class} className="w-full" />
              </div>
            </div>
          )}
        />
      </Panel>
    </div>
  );
};

export default DicomSeriesListSection;
