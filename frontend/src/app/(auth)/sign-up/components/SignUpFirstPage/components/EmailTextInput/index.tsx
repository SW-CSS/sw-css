type BuiltInTextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface CustomTextInputProps {
  name: string;
  label: string;
  errorText?: string;
  onKeyDownEnter?(): void;
  onChangeText?(text: string): void;
}

export type TextInputProps = BuiltInTextInputProps & CustomTextInputProps;

export const EmailTextInput = ({ ...props }: TextInputProps) => {
  const { label, errorText, onKeyDownEnter, onChangeText, ...inputProps } = props;
  const hasError = errorText !== undefined;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.id || inputProps.name} className="text-sm font-semibold">
        {label} <span className="text-sm font-semibold text-red-400">*</span>{' '}
        <span className="text-xs text-comment">
          부산대 메일이 없나요?{' '}
          <a href="https://webmail.pusan.ac.kr/" className="font-semibold underline underline-offset-2">
            신청바로가기
          </a>
        </span>
      </label>
      <div className="relative w-full">
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
          className={`m-0 w-full rounded-sm border-[1px] border-border p-3 text-base ${hasError && 'border-red-400'}`}
        />
        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-comment">@pusan.ac.kr</p>
      </div>
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};

export default EmailTextInput;
