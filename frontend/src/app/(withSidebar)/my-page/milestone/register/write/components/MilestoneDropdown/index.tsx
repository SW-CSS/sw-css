/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { Dropdown, DropdownOption, DropdownProps } from '@/app/components/Formik/Dropdown';
import { useMilestoneQuery } from '@/lib/hooks/useApi';
import { Milestone, MilestoneCategory } from '@/types/milestone';

export interface MilestoneDropdownProps extends Omit<DropdownProps, 'options' | 'selectedId' | 'name'> {
  categoryId: number;
  milestoneId: number;
  categoryName: string;
  milestoneName: string;
  selectedCategory: MilestoneCategory | undefined;
  setSelectedCategory: Dispatch<SetStateAction<MilestoneCategory | undefined>>;
  setSelectedMilestone: Dispatch<SetStateAction<Milestone | undefined>>;
}

const MilestoneDropdown = ({ ...props }: MilestoneDropdownProps) => {
  const { data: milestoneOverviews } = useMilestoneQuery();
  const {
    categoryId,
    milestoneId,
    categoryName,
    milestoneName,
    selectedCategory,
    setSelectedCategory,
    setSelectedMilestone,
    setFieldValue,
    ...dropdownProps
  } = props;
  const milestoneCategoryOptions: DropdownOption[] = useMemo(
    () =>
      milestoneOverviews?.map((milestoneOverview) => ({ id: milestoneOverview.id, name: milestoneOverview.name })) ||
      [],
    [milestoneOverviews],
  );
  const [milestoneOptions, setMilestoneOptions] = useState<Milestone[]>([]);

  useEffect(() => {
    setSelectedCategory(
      milestoneOverviews?.find((milestoneOverview) => milestoneOverview.id === categoryId) as MilestoneCategory,
    );
    setSelectedMilestone(undefined);
    setFieldValue(milestoneName, 0, true);
    setMilestoneOptions(
      milestoneOverviews
        ?.find((milestoneOverview) => milestoneOverview.id === categoryId)
        ?.milestones.map((milestone) => ({
          id: milestone.id,
          name: milestone.name,
          limitCount: milestone.limitCount,
          score: milestone.score,
        })) || [],
    );
  }, [categoryId, milestoneOverviews, milestoneName, setFieldValue, setSelectedCategory, setSelectedMilestone]);

  useEffect(() => {
    setSelectedMilestone(milestoneOptions.find((milestoneOption) => milestoneOption.id === milestoneId));
  }, [milestoneId, milestoneOptions, setSelectedMilestone]);

  return (
    <div className="flex gap-x-4">
      <div className="w-[540px]">
        <Dropdown
          name={categoryName}
          label="활동"
          options={milestoneCategoryOptions}
          selectOptionText={dropdownProps.selectOptionText}
          selectedId={categoryId}
          setFieldValue={setFieldValue}
          errorText={dropdownProps.errorText ? '' : undefined}
        />
      </div>
      <div className="flex-grow">
        <Dropdown
          name={milestoneName}
          label="구분"
          options={milestoneOptions}
          selectOptionText={dropdownProps.selectOptionText}
          selectedId={milestoneId}
          setFieldValue={setFieldValue}
          errorText={dropdownProps.errorText}
        />
      </div>
    </div>
  );
};

export default MilestoneDropdown;
