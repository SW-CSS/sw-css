import Dropdown from '@/components/common/formik/Dropdown';
import TextInput from '@/components/common/formik/TextInput';
import { memberRoleOptions, teamMemberRoleInfo } from '@/data/hackathon';
import { useStudentMemberMutation } from '@/lib/hooks/useApi';
import useDebounce from '@/lib/hooks/useDebounce';
import { StudentMemberDto, TeamMember } from '@/types/common.dto';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';

interface TeamMemberInputProps {
  fieldName: string;
  student: TeamMember;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: FocusEventHandler<HTMLInputElement> | undefined;
  errorText: string | undefined;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const TeamMemberInput = ({ fieldName, student, onChange, onBlur, errorText, setFieldValue }: TeamMemberInputProps) => {
  const [studentInfo, setStudentInfo] = useState<StudentMemberDto | null>();
  const { mutate: searchStudent } = useStudentMemberMutation();
  useDebounce(
    () => {
      if (student.id) {
        searchStudent(student.id, {
          onSuccess: (data) => {
            setStudentInfo(data);
          },
        });
      }
    },
    300,
    student.id,
  );

  return (
    <>
      <TextInput
        style={{ width: '100%' }}
        name={`${fieldName}.id`}
        value={student.id ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        errorText={errorText}
        placeholder="학번을 입력해주세요."
      />
      <TextInput style={{ width: '100%' }} name="member-name" value={studentInfo?.name} disabled />
      <div className="hidden md:block">
        <TextInput style={{ width: '100%' }} name="member-major" value={studentInfo?.major} disabled />
      </div>
      <Dropdown
        name={`${fieldName}.role`}
        options={memberRoleOptions}
        selectOptionText={teamMemberRoleInfo[student.role].text}
        selectedId={student.role}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

export default TeamMemberInput;
