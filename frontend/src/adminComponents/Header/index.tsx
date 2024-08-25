import Image from 'next/image';

import { AdminBlackLink, AdminGrayLink } from '@/app/admin/styled';
import { BORDER_RADIUS, FONT_STYLE } from '@/constants';

import Navigator from './components/Navigator';
import UserName from './components/UserName';
import { HeaderLayout, HeaderWrapper, LogoLink } from './styled';

const Header = () => (
  <HeaderWrapper>
    <HeaderLayout>
      <div style={{ display: 'flex' }}>
        <LogoLink href="/admin">
          <Image src="" alt="SW_logo" width="120" height="40" priority={false} />
        </LogoLink>
        <Navigator />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <UserName />
        <AdminGrayLink href="/" style={{ font: FONT_STYLE.xs.normal, border: 'none', borderRadius: BORDER_RADIUS.lg }}>
          사이트 메인으로
        </AdminGrayLink>
        <AdminBlackLink href="/sign-out" style={{ font: FONT_STYLE.xs.normal, borderRadius: BORDER_RADIUS.lg }}>
          로그아웃
        </AdminBlackLink>
      </div>
    </HeaderLayout>
  </HeaderWrapper>
);

export default Header;
