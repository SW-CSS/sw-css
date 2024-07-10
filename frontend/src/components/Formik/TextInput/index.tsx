/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { FORM_SIZE } from '@/constants';

type BuiltInTextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomTextInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  onKeyDownEnter?(): void;
  onChangeText?(text: string): void;
}

export type TextInputProps = Omit<BuiltInTextInputProps, 'size'> & CustomTextInputProps;

const TextInput = ({ isRequired = false, size = 'md', ...props }: TextInputProps) => {
  const { label, errorText, onKeyDownEnter, onChangeText, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputProps.name} className={`${FORM_SIZE[size].subTextSize} font-semibold`}>
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
        className={`rounded-sm border-[1px] border-border ${FORM_SIZE[size].padding} ${FORM_SIZE[size].textSize} ${hasError && 'border-red-400'}`}
      />
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};

export default TextInput;
