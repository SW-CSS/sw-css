export default function AuthFindPageFooter() {
  return (
    <div className="grid w-full grid-cols-2 text-center">
      <div className="cursor-default border-r-2 border-border text-sm font-semibold text-comment">
        로그인 화면{' '}
        <a href="/sign-in" className="underline-offset-3 font-semibold underline">
          돌아가기
        </a>
      </div>
      <div className="cursor-default text-sm font-semibold text-comment">
        처음오셨나요?{' '}
        <a href="/sign-up" className="underline-offset-3 font-semibold underline">
          회원가입
        </a>
      </div>
    </div>
  );
}
