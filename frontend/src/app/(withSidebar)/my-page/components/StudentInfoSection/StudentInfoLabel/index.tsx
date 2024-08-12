import { ReactNode } from 'react';

interface StudentInfoLabelProps {
  label: string;
  value: ReactNode | string;
}

const StudentInfoLabel = ({ label, value }: StudentInfoLabelProps) => (
  <p className="flex sm:min-w-80 sm:flex-1">
    <span className="mr-4 w-[4em]">{label}</span>
    <b>{value}</b>
  </p>
);
export default StudentInfoLabel;
