import Link from 'next/link';
import { VscAdd } from 'react-icons/vsc';

import { COLOR, FONT_STYLE } from '@/constants';

interface GoPageIconProps {
  name: string;
  url: string;
}

const GoPageIcon = ({ name, url }: GoPageIconProps) => (
  <Link
    href={url}
    style={{
      display: 'flex',
      color: COLOR.comment,
      font: FONT_STYLE.sm.semibold,
      alignItems: 'center',
      gap: '4px',
    }}
  >
    <VscAdd />
    {name}
  </Link>
);

export default GoPageIcon;
