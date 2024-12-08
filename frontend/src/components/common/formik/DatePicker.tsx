'use client';

import { VscInfo } from '@react-icons/all-files/vsc/VscInfo';

type BuiltInInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  errorText?: string;
  tooltip?: string;
}

export type DatePickerProps = BuiltInInputProps & CustomInputProps;

export const DatePicker = ({ isRequired = false, ...props }: DatePickerProps) => {
  const { label, errorText, tooltip, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputProps.name} className={`flex items-center text-sm font-semibold`}>
          {tooltip && (
            <div className="relative flex items-center gap-1 px-2 py-1 text-xs">
              <VscInfo className="peer h-[14px] w-[14px]" />
              <div className="absolute left-0 top-1 hidden -translate-y-[calc(100%+4px)] whitespace-nowrap break-keep rounded border bg-white p-2 peer-hover:block">
                {tooltip}
              </div>
            </div>
          )}
          {label} {isRequired && <span className="text-xs font-semibold text-red-400">*</span>}
        </label>
      )}
      <input
        {...inputProps}
        type="date"
        className={`m-0 rounded-sm border-[1px] border-border p-3 text-base ${hasError && 'border-red-400'}`}
      />
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};
