import { VscInfo } from '@react-icons/all-files/vsc/VscInfo';

type BuiltInInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomInputProps {
  name: string;
  label: string;
  isRequired?: boolean;
  errorText?: string;
  tooltip?: string;
  onChangeText?(text: string): void;
}

export type DatePickerProps = BuiltInInputProps & CustomInputProps;

export const DatePicker = ({ isRequired = false, ...props }: DatePickerProps) => {
  const { label, errorText, tooltip, onChangeText, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.id || inputProps.name} className="flex items-center text-sm font-semibold">
        {tooltip && (
          <div className="relative flex items-center gap-1 px-2 py-1 text-xs">
            <VscInfo className="peer h-[14px] w-[14px]" />
            <div className="absolute left-1/2 top-1 hidden -translate-x-1/2 -translate-y-[calc(100%+4px)] whitespace-nowrap break-keep rounded border bg-white p-2 peer-hover:block">
              {tooltip.split('\\n').map((data) => (
                <div>{data}</div>
              ))}
            </div>
          </div>
        )}
        {label} {isRequired && <span className="text-sm font-semibold text-red-400">*</span>}
      </label>
      <input
        {...inputProps}
        onChange={(e) => {
          inputProps.onChange?.(e);
          onChangeText?.(e.target.value);
        }}
        className={`m-0 rounded-sm border-[1px] border-border p-3 text-base ${hasError && 'border-red-400'}`}
      />
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};
