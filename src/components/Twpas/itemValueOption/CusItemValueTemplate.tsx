import { JSX } from "react";
import { OptionType } from "../type/twpasform";

export const CusFuncTypeTemplate = (option: OptionType | null | undefined): JSX.Element => {
  if (option) {
    return (
      <div className="flex align-items-center">
        <div>{option?.display_tw} - {option?.display} - ( {option?.code} )</div>
      </div>
    );
  }
  return <span>請選擇</span>;
};

export const CusCodeDisplayTemplate = (option: OptionType | null | undefined): JSX.Element => {
  if (option) {
    return (
      <div className="flex align-items-center">
        <div>{option?.display} ({option?.code})</div>
      </div>
    );
  }
  return <span>請選擇</span>;
};

export const CusMultiCodeDisplayTemplate = (
  option: OptionType | string,
  optionsList?: OptionType[]
) => {
  if (typeof option === "string" && optionsList) {
    const item = optionsList.find((i) => i.code === option);
    if (!item) return <span>{option}</span>;
    return <span>{item.display} ({item.code})</span>;
  }
  if (typeof option === "object" && option !== null) {
    return <span>{option.display} ({option.code})</span>;
  }
  return <span>{String(option)}</span>;
};

export const CusCodeClassDisplayTemplate = (option: OptionType | null | undefined): JSX.Element => {
  if (option) {
    return (
      <div className="flex align-items-center">
        <div>{option?.display} ({option?.code}) - {option.CLASS}</div>
      </div>
    );
  }
  return <span>請選擇</span>;
};
