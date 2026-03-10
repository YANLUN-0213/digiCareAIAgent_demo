import { Panel } from "primereact/panel";
import DynamicFieldArray from "../component/DynamicFieldArray";
import { UseFormReturn } from "react-hook-form";
import { TwpasForm } from "../type/twpasform";
import OpdSection from "./OpdSection";

interface PatientInfoProps {
  methods: UseFormReturn<TwpasForm>;
}

const OpdInfo: React.FC<PatientInfoProps> = ({ methods }) => {
  return (
    <>
      <h4 className="text-lg font-semibold mb-1 text-surface-700">
        <i className="pi pi-info-circle mr-2"></i> 門診病例
      </h4>
      <DynamicFieldArray name="opd" methods={methods} addtitle="新增門診紀錄" labelName="門診病例 (多筆)" delBtnAlign="align-item-start"
        defaultValue={{ hospId: "", funcDate: "", funcType: "", prsnId: "", diagnosis: [{ icd10cmCode: "" }], subjective: "", objective: "", assessment: "", plan: "" }}
        isRequired={false}
        children={(fieldName, index) => (
          <Panel expandIcon="pi pi-chevron-right" collapseIcon="pi pi-chevron-down" toggleable collapsed={false} header={`門診紀錄 第 ${index + 1} 筆`}>
            <OpdSection fieldName={fieldName} index={index} methods={methods} />
          </Panel>
        )}
      />
    </>
  );
};

export default OpdInfo;
