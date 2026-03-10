import React from "react";
import { UseFormReturn } from "react-hook-form";
import MedicationRequestSection from "./MedicationRequestSection";
import RadiotherapySection from "./RadiotherapySection";
import OperationSection from "./OperationSection";
import CarePlanSection from "./CarePlanSection";
import { TwpasForm } from "../type/twpasform";
import { Button } from "primereact/button";

interface Props {
  methods: UseFormReturn<TwpasForm>;
  nestIndex: number;
  onRemove: () => void;
}

const TreatmentInfo: React.FC<Props> = ({ methods, nestIndex, onRemove }) => {
  return (
    <>
      <MedicationRequestSection methods={methods} nestIndex={nestIndex} />
      <hr />
      <RadiotherapySection methods={methods} nestIndex={nestIndex} />
      <hr />
      <OperationSection methods={methods} nestIndex={nestIndex} />
      <hr />
      <CarePlanSection methods={methods} nestIndex={nestIndex} />
      <div className="mt-3">
        <Button type="button" icon="pi pi-trash" label={`刪除第 ${nestIndex + 1} 筆治療資訊`} className="p-button-danger p-button-outlined" onClick={onRemove} />
      </div>
    </>
  );
};

export default TreatmentInfo;
