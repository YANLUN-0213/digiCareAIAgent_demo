import React, { useCallback, useMemo } from "react";
import { Controller, Control, FieldErrors, RegisterOptions } from "react-hook-form";
import { MultiSelect, MultiSelectProps } from "primereact/multiselect";
import { Tooltip } from "primereact/tooltip";

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') return acc?.[key];
    return undefined;
  }, obj);
}

interface RHFMultiSelectProps extends Omit<MultiSelectProps, "name" | "value" | "onChange"> {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  label?: string;
  labelClass?: string;
  rules?: RegisterOptions;
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  onChange?: MultiSelectProps["onChange"];
}

const RHFMultiSelect: React.FC<RHFMultiSelectProps> = ({
  name,
  control,
  errors,
  label,
  labelClass,
  rules,
  tooltipText,
  tooltipPosition = "top",
  className,
  ...rest
}) => {
  const fieldError = getValueByPath(errors, name);
  const error = fieldError?.message;
  const tooltipId = `tooltip-${name.replace(/\./g, "-")}`;
  const isRequired = rules?.required;

  return (
    <div>
      {label && (
        <label htmlFor={name} className={`${isRequired ? "required" : ""} ${labelClass || ''}`}>
          {label}
        </label>
      )}
      {tooltipText && (
        <>
          <i className={`pi pi-info-circle ml-2 cursor-pointer button-hover-primary ${tooltipId}`} style={{ fontSize: "0.875rem" }} />
          <Tooltip target={`.${tooltipId}`} content={tooltipText} position={tooltipPosition} className="max-w-20rem" />
        </>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <MultiSelect
            {...rest}
            id={name}
            value={field.value ?? []}
            onChange={(e) => {
              field.onChange(e.value);
              rest.onChange?.(e);
            }}
            className={`w-full ${error ? "p-invalid" : ""} ${className || ""}`}
          />
        )}
      />
      {error && (
        <small className="p-error" style={{ display: "block" }}>{String(error)}</small>
      )}
    </div>
  );
};

export default RHFMultiSelect;
