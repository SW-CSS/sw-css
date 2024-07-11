import { ReactNode } from 'react';

interface StudentInfoLabelProps {
  label: string;
  value: ReactNode | string;
}

const StudentInfoLabel = ({ label, value }: StudentInfoLabelProps) => (
  <p className="flex">
    <span className="mr-4 w-[4em]">{label}</span>
    <b>{value}</b>
  </p>
);
export default StudentInfoLabel;
