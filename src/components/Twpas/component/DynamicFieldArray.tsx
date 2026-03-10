import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "primereact/button";

interface DynamicFieldArrayProps {
  name: string;
  methods: UseFormReturn<any>;
  defaultValue: any;
  children: (fieldName: string, index: number, remove: (index: number) => void) => React.ReactNode;
  addtitle?: string;
  labelName?: string;
  labelClassName?: string;
  isRequired?: boolean;
  delBtnAlign?: string;
  outlineClass?: string;
  removeFilesByItemId?: (itemId: string | undefined) => void;
  disabledAddBtn?: boolean;
  gridStyle?: Record<string, any>;
}

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({
  name,
  methods,
  defaultValue,
  children,
  addtitle = "新增一筆",
  labelName,
  labelClassName,
  isRequired,
  delBtnAlign = "align-content-center",
  outlineClass,
  removeFilesByItemId,
  disabledAddBtn = false,
  gridStyle
}) => {
  const { control, setValue } = methods;
  const { fields, append, remove } = useFieldArray({ control, name });

  const handleRemove = (index: number, itemId?: string) => {
    if (isRequired && fields.length === 1) {
      const emptyValue = typeof defaultValue === "object" ? { ...defaultValue } : "";
      setValue(`${name}.${index}.`, emptyValue);
      methods.clearErrors(`${name}.${index}`);
      if (removeFilesByItemId) removeFilesByItemId(itemId);
    } else {
      if (removeFilesByItemId) removeFilesByItemId(itemId);
      remove(index);
      methods.clearErrors(`${name}.${index}`);
    }
  };

  return (
    <div className={`card border-1 surface-100 ${outlineClass || ''}`}>
      <div className={`${labelClassName || ''} mb-1`}>{labelName}</div>
      {fields.map((field, index) => {
        const fieldName = `${name}.${index}`;
        return (
          <div key={field.id} className="grid" style={gridStyle}>
            <div className="col-12 md:col-11">
              {children(fieldName, index, remove)}
            </div>
            <div className={`${delBtnAlign} col-1 lg:col-1 sm:col-1 justify-center items-center pt-3 sm:pt-0 sm:my-1`}>
              <Button
                type="button"
                icon="pi pi-trash"
                size="small"
                className="p-button-danger"
                onClick={() => handleRemove(index, fieldName)}
              />
            </div>
          </div>
        );
      })}
      <div className="mb-4">
        <Button
          type="button"
          icon="pi pi-plus"
          label={addtitle}
          disabled={disabledAddBtn}
          onClick={() =>
            append(typeof defaultValue === "object" ? { ...defaultValue } : defaultValue, {
              shouldFocus: false,
            })
          }
        />
      </div>
    </div>
  );
};

export default DynamicFieldArray;
