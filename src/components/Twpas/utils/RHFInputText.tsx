import React, { ReactNode } from "react";
import { RegisterOptions, UseFormRegister, FieldErrors, useWatch, Control } from "react-hook-form";
import { InputText, InputTextProps } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return acc[key];
    }
    return undefined;
  }, obj);
}

interface RHFInputTextProps extends InputTextProps {
  name: string;
  label?: ReactNode;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  labelClass?: string;
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  showCharCount?: boolean;
  maxLength?: number;
  control?: Control<any>;
  uploadStatusIcon?: ReactNode;
  linkUrl?: string;
  linkContent?: string;
}

const RHFInputText: React.FC<RHFInputTextProps> = ({
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
  uploadStatusIcon,
  linkUrl,
  linkContent,
  ...rest
}) => {
  const fieldError = getValueByPath(errors, name);
  const error = fieldError?.message;
  const tooltipId = `tooltip-${name.replace(/\./g, "-")}`;
  const linkUrlId = `linkTooltip-${name.replace(/\./g, "-")}`;
  const isRequired = rules?.required;

  const value = useWatch({ name, control });
  const currentLength = value?.length || 0;

  return (
    <div>
      {uploadStatusIcon && (<span className="mx-2">{uploadStatusIcon}</span>)}
      {label && <label className={`${isRequired ? 'required' : ''} ${labelClass || ''}`} htmlFor={name}>{label} </label>}
      {tooltipText && (
        <>
          <i
            className={`pi pi-info-circle ml-2 cursor-pointer button-hover-primary ${tooltipId}`}
            style={{ fontSize: '0.875rem', color: 'var(--primary_color)' }}
          />
          <Tooltip
            target={`.${tooltipId}`}
            content={tooltipText}
            position={tooltipPosition}
            className="max-w-20rem"
          />
        </>
      )}
      {linkUrl && (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <i
            className={`pi pi-link ml-2 cursor-pointer button-hover-primary ${linkUrlId}`}
            style={{ fontSize: '0.875rem', color: 'var(--primary_color)' }}
          />
          <Tooltip
            target={`.${linkUrlId}`}
            content={linkContent ?? linkUrl}
            position={tooltipPosition}
            className="max-w-20rem"
          />
        </a>
      )}
      <InputText
        id={name}
        {...register(name, rules)}
        {...rest}
        className={`${error ? "p-invalid" : ""} ${className || ""}`}
      />
      {error || (showCharCount && typeof maxLength === "number") ? (
        <div className="flex justify-between items-center mt-1 text-xs">
          {error && (
            <span className="p-error">{String(error)}</span>
          )}
          {showCharCount && typeof maxLength === "number" && (
            <span className="text-color-secondary ml-auto">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RHFInputText;
