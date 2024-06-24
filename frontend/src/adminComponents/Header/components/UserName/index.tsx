'use client';

import { COLOR, FONT_STYLE } from '@/constants';
import { useAppSelector } from '@/hocks/redux';

const UserName = () => {
  const auth = useAppSelector((state) => state.auth).value;

  return (
    <span style={{ font: FONT_STYLE.xs, color: COLOR.comment, display: 'flex', alignItems: 'center' }}>
      반갑습니다! <span style={{ color: COLOR.primary.main }}>{auth.username}</span>님
    </span>
  );
};

export default UserName;
