import { IconType } from '@react-icons/all-files/lib';

interface TeamCreateInputSectionProps {
  icon: IconType;
  label: string;
  inputElement: JSX.Element;
}

const TeamCreateInputSection = ({ icon: Icon, label, inputElement }: TeamCreateInputSectionProps) => {
  return (
    <div className="flex gap-4">
      <p className="flex min-w-[140px] items-center gap-3 font-bold">
        <Icon className="h-5 w-5" />
        {label}
      </p>
      <div className="w-0 border border-border" />
      {inputElement}
    </div>
  );
};

export default TeamCreateInputSection;
