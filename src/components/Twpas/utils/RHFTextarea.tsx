import React from "react";
import { RegisterOptions, UseFormRegister, FieldErrors, useWatch, Control } from "react-hook-form";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') return acc[key];
    return undefined;
  }, obj);
}

interface RHFTextareaProps extends InputTextareaProps {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  labelClass?: string;
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  showCharCount?: boolean;
  maxLength?: number;
  control?: Control<any>;
}

const RHFTextarea: React.FC<RHFTextareaProps> = ({
  name,
  label,
  rules,
  register,
  errors,
  className,
  labelClass,
  tooltipText,
  tooltipPosition = "top",
  showCharCount = false,
  maxLength,
  control,
  ...rest
}) => {
  const fieldError = getValueByPath(errors, name);
  const error = fieldError?.message;
  const tooltipId = `tooltip-${name.replace(/\./g, "-")}`;
  const isRequired = rules?.required;

  const value = useWatch({ name, control });
  const currentLength = value?.length || 0;

  return (
    <div>
      {label && <label className={`${isRequired ? 'required' : ''} ${labelClass || ''}`} htmlFor={name}>{label}</label>}
      {tooltipText && (
        <>
          <i className={`pi pi-info-circle ml-2 cursor-pointer button-hover-primary ${tooltipId}`} style={{ fontSize: '0.875rem', color: 'var(--primary_color)' }} />
          <Tooltip target={`.${tooltipId}`} content={tooltipText} position={tooltipPosition} className="max-w-20rem" />
        </>
      )}
      <InputTextarea
        id={name}
        {...register(name, { ...rules, ...(maxLength ? { maxLength: { value: maxLength, message: `不可超過${maxLength}個字元` } } : {}) })}
        {...rest}
        className={`${error ? "p-invalid" : ""} ${className || ""}`}
      />
      {error || (showCharCount && typeof maxLength === "number") ? (
        <div className="flex justify-between items-center mt-1 text-xs">
          {error && <span className="p-error">{String(error)}</span>}
          {showCharCount && typeof maxLength === "number" && (
            <span className="text-color-secondary ml-auto">{currentLength} / {maxLength}</span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RHFTextarea;
