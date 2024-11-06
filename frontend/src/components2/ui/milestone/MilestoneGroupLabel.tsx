import { MilestoneGroup } from '@/data/milestone';
import { convertMilestoneGroup } from '@/lib/utils/utils';

export interface MilestoneGroupLabelProps {
  group: string;
}

export default function MilestoneGroupLabel({ group }: MilestoneGroupLabelProps) {
  const labelText = convertMilestoneGroup(group);

  switch (group) {
    case MilestoneGroup.ACTIVITY:
      return (
        <span className="rounded-sm bg-milestone-blue-light px-2 py-1 text-xs text-milestone-blue-dark">
          {labelText}
        </span>
      );
    case MilestoneGroup.GLOBAL:
      return (
        <span className="rounded-sm bg-milestone-green-light px-2 py-1 text-xs text-milestone-green-dark">
          {labelText}
        </span>
      );
    case MilestoneGroup.COMMUNITY:
      return (
        <span className="rounded-sm bg-milestone-purple-light px-2 py-1 text-xs text-milestone-purple-dark">
          {labelText}
        </span>
      );
    default:
      return <span className="rounded-sm bg-milestone-gray-light px-2 py-1 text-xs">{labelText}</span>;
  }
}
