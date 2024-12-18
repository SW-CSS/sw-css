import { IconType } from '@react-icons/all-files/lib';
import { VscInfo } from '@react-icons/all-files/vsc/VscInfo';

interface InputSectionProps {
  icon: IconType;
  label: string;
  inputElement: JSX.Element;
  tooltip?: string;
  iconProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
}

export default function InputSection({ icon: Icon, label, tooltip, inputElement, iconProps }: InputSectionProps) {
  return (
    <div className="relative flex flex-col gap-2 md:flex-row md:gap-4">
      <p {...iconProps} className="peer flex min-w-[120px] cursor-default items-center gap-3 font-bold">
        <Icon className="h-5 w-5" />
        {label}
      </p>
      {tooltip && (
        <div className="absolute -left-2 -top-4 hidden items-center gap-1 text-xs text-comment peer-hover:flex">
          <VscInfo className="peer h-[14px] w-[14px]" />
          {tooltip}
        </div>
      )}
      <div className="border border-border md:w-0" />
      {inputElement}
    </div>
  );
}
