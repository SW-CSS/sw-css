/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import { Dropdown, DropdownProps } from '@/app/components/Formik/Dropdown';
import { useCollegeQuery } from '@/lib/hooks/useApi';
import { getColleges } from '@/mocks/college';
import { MajorDto } from '@/types/common.dto';

const MajorDropdown = ({ ...props }: Omit<DropdownProps, 'options'>) => {
  const colleges = getColleges;
  /* TODO: mocks 삭제 및 api 호출
  const { data: colleges } = useCollegeQuery();
  */

  const [majors, setMajors] = useState<MajorDto[]>([]);

  const [selectedCollegeId, setSelectedCollegeId] = useState<number>(-1);

  const handleCollegeFieldChange = (field: string, collegeId: number) => {
    setSelectedCollegeId(collegeId);
  };

  useEffect(() => {
    const filteredMajors = colleges.filter((college) => college.id === selectedCollegeId);
    if (filteredMajors.length !== 0 && props.isRequired === undefined) {
      setMajors([{ id: 0, name: '없습니다.', createdAt: '' }, ...filteredMajors[0].majors]);
    } else if (filteredMajors.length !== 0) {
      setMajors(filteredMajors[0].majors);
    } else if (props.isRequired === undefined) {
      setMajors([{ id: 0, name: '없습니다.', createdAt: '' }]);
    }
  }, [colleges, props.isRequired, selectedCollegeId]);

  return (
    <div className="">
      <Dropdown
        name={props.name}
        label={props.label}
        options={colleges}
        selectOptionText="단과대학을 선택해주세요."
        selectedId={selectedCollegeId}
        setFieldValue={handleCollegeFieldChange}
        isRequired
        errorText={props.errorText ? '' : undefined}
      />
      <Dropdown
        name={props.name}
        label=""
        options={majors}
        selectOptionText={props.selectOptionText}
        selectedId={props.selectedId}
        setFieldValue={props.setFieldValue}
        errorText={props.errorText}
      />
    </div>
  );
};

export default MajorDropdown;
