import { VscAdd } from '@react-icons/all-files/vsc/VscAdd';
import Link from 'next/link';

interface GoPageIconProps {
  name: string;
  url: string;
}

export default function GoPageIcon({ name, url }: GoPageIconProps) {
  return (
    <Link href={url} className="flex items-center gap-1 text-sm font-semibold text-comment">
      <VscAdd />
      {name}
    </Link>
  );
}
