import { IconType } from '@react-icons/all-files/lib';

interface HackathonTeamInputSectionProps {
  icon: IconType;
  label: string;
  inputElement: JSX.Element;
}
export default function HackathonTeamInputSection({ icon: Icon, label, inputElement }: HackathonTeamInputSectionProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-4">
      <p className="flex min-w-[120px] items-center gap-3 font-bold">
        <Icon className="h-5 w-5" />
        {label}
      </p>
      <div className="border border-border md:w-0" />
      {inputElement}
    </div>
  );
}
