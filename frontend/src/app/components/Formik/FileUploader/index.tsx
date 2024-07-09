type BuiltInInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomInputProps {
  name: string;
  label: string;
  isRequired?: boolean;
  errorText?: string;
  onKeyDownEnter?(): void;
  onChangeText?(text: string): void;
}

export type FileUploaderProps = BuiltInInputProps & CustomInputProps;

export const FileUploader = ({ isRequired = false, ...props }: FileUploaderProps) => {
  const { label, errorText, onKeyDownEnter, onChangeText, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.id || inputProps.name} className="text-sm font-semibold">
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
