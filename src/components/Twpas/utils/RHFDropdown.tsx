import React, { useCallback, useMemo } from "react";
import { Controller, Control, FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return acc?.[key];
    }
    return undefined;
  }, obj);
}

interface RHFDropdownProps extends Omit<DropdownProps, "name" | "value" | "onChange"> {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  label?: string;
  labelClass?: string;
  rules?: RegisterOptions;
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  onChange?: DropdownProps["onChange"];
  virtualScrollerOptions?: Object;
  linkUrl?: string;
  linkContent?: string;
  validateOptions?: boolean;
  onInvalidValue?: "clear" | "error" | "both";
  invalidValueMessage?: string;
}

const RHFDropdown: React.FC<RHFDropdownProps> = ({
  name,
  control,
  errors,
  label,
  labelClass,
  rules,
  tooltipText,
  tooltipPosition = "top",
  className,
  virtualScrollerOptions = { itemSize: 40 },
  linkUrl,
  linkContent,
  validateOptions = true,
  onInvalidValue = 'both',
  invalidValueMessage = '所選值不在可選範圍內,請重新選擇',
  options = [],
  optionValue,
  optionLabel,
  ...rest
}) => {
  const fieldError = getValueByPath(errors, name);
  const error = fieldError?.message;
  const tooltipId = `tooltip-${name.replace(/\./g, "-")}`;
  const linkUrlId = `linkTooltip-${name.replace(/\./g, "-")}`;
  const isRequired = rules?.required;

  let setValue: any;
  try {
    const formContext = useFormContext();
    setValue = formContext.setValue;
  } catch (e) {
    setValue = undefined;
  }

  const validValues = useMemo(() => {
    if (!Array.isArray(options) || options.length === 0) return new Set();
    return new Set(options.map((option: any) => {
      if (!option) return option;
      if (typeof option !== 'object') return option;
      if (optionValue) return getValueByPath(option, optionValue);
      const commonKeys = ['value', 'code', 'id', 'key'];
      const foundKey = commonKeys.find(key => key in option);
      return foundKey ? option[foundKey] : option;
    }));
  }, [options, optionValue]);

  const isValueInOptions = useCallback((value: any): boolean => {
    if (!value || validValues.size === 0) return true;
    if (typeof value === 'object') {
      const valueStr = JSON.stringify(value);
      return Array.from(validValues).some(v => typeof v === 'object' && JSON.stringify(v) === valueStr);
    }
    return validValues.has(value);
  }, [validValues]);

  const mergedRules: RegisterOptions | undefined = useMemo(() => {
    if (!validateOptions) return rules;
    const baseValidate = rules?.validate;
    return {
      ...rules,
      validate: {
        ...(typeof baseValidate === 'object' ? baseValidate : {}),
        ...(typeof baseValidate === 'function' ? { custom: baseValidate } : {}),
        optionExists: (value: any) => {
          if (!value) return true;
          return isValueInOptions(value) || `${value} ${invalidValueMessage}`;
        }
      }
    } as RegisterOptions;
  }, [rules, validateOptions, invalidValueMessage, isValueInOptions]);

  const createChangeHandler = useCallback((
    fieldOnChange: (value: any) => void,
    externalOnChange?: DropdownProps["onChange"]
  ) => {
    return (e: any) => {
      const newValue = e.value;
      if (newValue === null || newValue === undefined) {
        fieldOnChange(null);
        externalOnChange?.({ ...e, value: null });
        return;
      }
      if (validateOptions && newValue && !isValueInOptions(newValue)) {
        if (onInvalidValue === 'clear' || onInvalidValue === 'both') {
          fieldOnChange(null);
          if (externalOnChange) externalOnChange({ ...e, value: null });
          return;
        }
      }
      fieldOnChange(newValue);
      if (externalOnChange) externalOnChange?.(e);
    };
  }, [validateOptions, isValueInOptions, onInvalidValue]);

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
      {linkUrl && (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <i className={`pi pi-link ml-2 cursor-pointer button-hover-primary ${linkUrlId}`} style={{ fontSize: '0.875rem', color: 'var(--primary_color)' }} />
          <Tooltip target={`.${linkUrlId}`} content={linkContent ?? linkUrl} position={tooltipPosition} className="max-w-20rem" />
        </a>
      )}
      <Controller
        name={name}
        control={control}
        rules={mergedRules}
        render={({ field }) => {
          const handleChange = createChangeHandler(field.onChange, rest.onChange);
          return (
            <Dropdown
              {...rest}
              id={name}
              options={options}
              optionValue={optionValue}
              optionLabel={optionLabel}
              onChange={handleChange}
              value={field.value ?? null}
              virtualScrollerOptions={virtualScrollerOptions}
              className={`w-full ${error ? "p-invalid" : ""} ${className || ""}`}
            />
          );
        }}
      />
      {error && (
        <small className="p-error" style={{ display: "block" }}>{String(error)}</small>
      )}
    </div>
  );
};

export default RHFDropdown;
