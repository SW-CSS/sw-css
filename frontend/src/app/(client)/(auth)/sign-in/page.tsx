import { FONT_STYLE } from '@/constants';

import InputUserInfo from './components/InputUserInfo';
import { Divisor, FindLink, SignInContentWrapper, SignInPageWrapper, SignUpLink, SuggestionComment } from './styled';
import { TitleContent } from '../styled';
import PageTitle from '@/components/common/PageTitle';

const Page = () => (
  <SignInPageWrapper>
    <SignInContentWrapper>
      <TitleContent>
        <PageTitle title="로그인" description="PNU SW역량시스템 첫 사용시 회원가입이 필요합니다." />
      </TitleContent>
      <InputUserInfo />
      <SuggestionComment>
        <Divisor>
          <FindLink href="/find-id">아이디</FindLink> / <FindLink href="/find-password">비밀번호</FindLink> 찾기
        </Divisor>
        <div style={{ font: FONT_STYLE.xs.normal }}>
          처음오셨나요? <SignUpLink href="/sign-up">회원가입</SignUpLink>
        </div>
      </SuggestionComment>
    </SignInContentWrapper>
  </SignInPageWrapper>
);

export default Page;
