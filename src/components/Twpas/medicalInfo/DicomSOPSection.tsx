import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import RHFInputText from "../utils/RHFInputText";
import RHFDropdown from "../utils/RHFDropdown";
import { OptionType, TwpasForm } from "../type/twpasform";
import { Button } from "primereact/button";
import { CusCodeDisplayTemplate } from "../itemValueOption/CusItemValueTemplate";
import { formValidationRules } from "../valid/medicalValid";

interface Props {
  nestIndex: number;
  methods: UseFormReturn<TwpasForm>;
  sopClassList: OptionType[];
}

const DicomSOPSection: React.FC<Props> = ({ nestIndex, methods, sopClassList }) => {
  const { register, control, formState: { errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: `diagnosis.imageStudy.${nestIndex}.dicomData.sopList` as any });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="formgrid grid mb-1">
          <div className="field col-5">
            <RHFInputText register={register} errors={errors} name={`diagnosis.imageStudy.${nestIndex}.dicomData.sopList.${index}.uid`} label="UID" className="w-full" />
          </div>
          <div className="field col-5">
            <RHFDropdown name={`diagnosis.imageStudy.${nestIndex}.dicomData.sopList.${index}.class`} control={control} errors={errors} label="SOP Class" options={sopClassList} optionValue="code" optionLabel="display" itemTemplate={CusCodeDisplayTemplate} valueTemplate={CusCodeDisplayTemplate} placeholder="請選擇" className="w-full" />
          </div>
          <div className="field col-2 flex align-items-end">
            <Button type="button" icon="pi pi-trash" size="small" className="p-button-danger" onClick={() => remove(index)} />
          </div>
        </div>
      ))}
      <Button type="button" icon="pi pi-plus" label="新增SOP" size="small" onClick={() => append({ uid: "", class: "" })} />
    </div>
  );
};

export default DicomSOPSection;
