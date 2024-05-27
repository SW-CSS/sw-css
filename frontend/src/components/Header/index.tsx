import Link from 'next/link';

import { FONT_STYLE, COLOR } from '@/constants';
import { headerBar } from '@/mocks/Header';

import HeaderAccordion from './HeaderAccordion';
import { HeaderWrapper, HeaderLayout, SignButton, SignText } from './style';

const Header = () => (
  <HeaderWrapper>
    <HeaderLayout>
      <Link href="/" style={{ width: 'fit-content' }}>
        <p style={{ margin: 0, font: FONT_STYLE.sm, color: COLOR.comment }}>부산대학교</p>
        <p style={{ margin: 0, font: FONT_STYLE.lg.bold, color: COLOR.malibu }}>SW역량지원시스템</p>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        {headerBar.map((item) => (
          <HeaderAccordion key={item.title} title={item.title} url={item.url} sub={item.sub} />
        ))}
      </div>
      <SignButton>
        <SignText>
          <Link href="/">로그인</Link> /<Link href="/">회원가입</Link>
        </SignText>
      </SignButton>
    </HeaderLayout>
  </HeaderWrapper>
);

export default Header;
