'use client';

import { FORM_SIZE } from '@/constants';
import { VscInfo } from '@react-icons/all-files/vsc/VscInfo';

type BuiltInTextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomTextInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  isAdmin?: boolean;
  tooltip?: string;
  onKeyDownEnter?(): void;
  onChangeText?(text: string): void;
}

export type TextInputProps = Omit<BuiltInTextInputProps, 'size'> & CustomTextInputProps;

const TextInput = ({ isRequired = false, size = 'md', ...props }: TextInputProps) => {
  const { label, errorText, isAdmin, tooltip, onKeyDownEnter, onChangeText, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-grow flex-col gap-1">
      {label && (
        <label htmlFor={inputProps.name} className={`flex items-center ${FORM_SIZE[size].subTextSize} font-semibold`}>
          {tooltip && (
            <div className="relative flex items-center gap-1 px-2 py-1 text-xs">
              <VscInfo className="peer h-[14px] w-[14px]" />
              <div className="absolute left-0 top-1 hidden -translate-y-[calc(100%+4px)] whitespace-nowrap break-keep rounded border bg-white p-2 peer-hover:block">
                {tooltip}
              </div>
            </div>
          )}
          {label} {isRequired && <span className={`${FORM_SIZE[size].subTextSize} font-semibold text-red-400`}>*</span>}
        </label>
      )}
      <input
        {...inputProps}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onKeyDownEnter?.();
          }
          inputProps.onKeyDown?.(e);
        }}
        onChange={(e) => {
          inputProps.onChange?.(e);
          onChangeText?.(e.target.value);
        }}
        className={`rounded-sm border-[1px] ${isAdmin ? 'border-admin-border' : 'border-border'} outline-none ${FORM_SIZE[size].padding} ${FORM_SIZE[size].textSize} ${hasError && 'border-red-400'}`}
      />
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};

export default TextInput;
