import React from "react";
import { UseFormReturn } from "react-hook-form";
import PatientAssessmentSection from './PatientAssessmentSection';
import { Button } from "primereact/button";
import InspectionSection from "./InspectionSection";
import { SelOptionType, TwpasForm } from "../type/twpasform";

interface AssessmentInfoProps {
  methods: UseFormReturn<TwpasForm>;
  nestIndex: number;
  onRemove: () => void;
  inspectList: SelOptionType;
  inspectResultCodeList: SelOptionType;
  consultValueCatList: SelOptionType;
  patAstList: SelOptionType;
  onAiHelper?: (fieldKey: string) => void;
}

const AssessmentInfo: React.FC<AssessmentInfoProps> = ({ methods, nestIndex, onRemove, inspectList, inspectResultCodeList, consultValueCatList, patAstList, onAiHelper }) => {
  return (
    <>
      <InspectionSection methods={methods} nestIndex={nestIndex} inspectList={inspectList} inspectResultCodeList={inspectResultCodeList} consultValueCatList={consultValueCatList} onAiHelper={onAiHelper} />
      <hr />
      <PatientAssessmentSection methods={methods} nestIndex={nestIndex} patAstList={patAstList} />
      <div className="mt-3">
        <Button type="button" icon="pi pi-trash" label={`刪除此評估`} className="p-button-danger p-button-outlined" onClick={onRemove} />
      </div>
    </>
  );
};

export default AssessmentInfo;
