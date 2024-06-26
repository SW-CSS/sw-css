import { FONT_STYLE } from '@/adminConstants';

import InputUserInfo from './components/InputUserInfo';
import { AlertComment, Divisor, FindLink, SignUpLink, SuggestionComment } from './styled';

const SignIn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '28px', gap: '20px' }}>
    <AlertComment>로그인이 필요한 서비스입니다.</AlertComment>
    <InputUserInfo />
    <SuggestionComment>
      <Divisor>
        <FindLink href="/find-id">아이디</FindLink> / <FindLink href="/find-pw">비밀번호</FindLink> 찾기
      </Divisor>
      <div style={{ font: FONT_STYLE.xs.normal }}>
        처음오셨나요? <SignUpLink href="/sign-up">회원가입</SignUpLink>
      </div>
    </SuggestionComment>
  </div>
);

export default SignIn;
