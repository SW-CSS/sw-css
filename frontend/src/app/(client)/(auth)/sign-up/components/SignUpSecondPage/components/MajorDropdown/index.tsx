/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import Dropdown, { DropdownProps } from '@/components/common/formik/Dropdown';
import { useCollegeQuery } from '@/lib/hooks/useApi';
import { getColleges } from '@/mocks/college';
import { CollegeDto, MajorDto } from '@/types/common.dto';

export interface MajorDropdownProps extends Omit<DropdownProps, 'options' | 'selectedId' | 'name'> {
  collegeId: number;
  majorId: number;
  collegeName: string;
  majorName: string;
}

const MajorDropdown = ({ ...props }: MajorDropdownProps) => {
  const collegesData = getColleges;
  /* TODO: mocks 삭제 및 api 호출
  const { data: collegesData } = useCollegeQuery();
  */
  const [colleges, setColleges] = useState<CollegeDto[]>([]);
  const [majors, setMajors] = useState<MajorDto[]>([]);

  useEffect(() => {
    const filteredMajors = colleges.filter((college) => college.id === props.collegeId);
    if (filteredMajors.length !== 0) {
      setMajors(filteredMajors[0].majors);
    }
    if (props.collegeId === 0) {
      props.setFieldValue(props.majorName, 0);
      setMajors([{ id: 0, name: `이수 중인 ${props.label}이 없습니다.`, createdAt: '' }]);
    }
  }, [colleges, props.collegeId]);

  useEffect(() => {
    setColleges(collegesData);
    if (props.isRequired === undefined) {
      setColleges((prev) => [
        { id: 0, name: `이수 중인 ${props.label}이 없습니다.`, createdAt: '', majors: [] },
        ...prev,
      ]);
    }
  }, []);

  return (
    <div className="">
      <Dropdown
        name={props.collegeName}
        label={props.label}
        options={colleges}
        selectOptionText="단과대학을 선택해주세요."
        selectedId={props.collegeId}
        setFieldValue={props.setFieldValue}
        isRequired
        errorText={props.errorText ? '' : undefined}
      />
      <Dropdown
        name={props.majorName}
        options={majors}
        selectOptionText={props.selectOptionText}
        selectedId={props.majorId}
        setFieldValue={props.setFieldValue}
        errorText={props.errorText}
      />
    </div>
  );
};

export default MajorDropdown;
