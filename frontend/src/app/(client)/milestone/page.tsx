import Link from 'next/link';

export default function MilestonePage() {
  return (
    <div className="w-full rounded-sm bg-white p-5 pt-16">
      <div className="flex h-[66px] justify-center bg-[url('/images/milestone/milestone_img01.png')] bg-center bg-no-repeat" />
      <div className="break-keep text-center md:px-20">
        <div className="mx-auto my-5 text-xl font-bold text-primary-main">마일스톤이란</div>
        마일스톤은 전공자들의 SW역량을 종합적으로 평가하기 위한 역량평가지수입니다.
        <br />
        학생들은 교내외 여러 활동들을 통하여 실전적 SW역량, 글로벌 역량, 커뮤니케이션 역량을 균형있게 함양하고
        SW중심대학사업단에서는 학생들의 적립된 마일스톤 점수에 따라 매년 장학생을 선발하고 있습니다.
      </div>
      <div className="mb-10 mt-6 flex flex-col items-center">
        <Link
          href="/my-page/milestone-register"
          className="mt-2 block w-fit rounded-sm bg-primary-main p-3 text-lg font-semibold tracking-wide text-white"
          type="button"
        >
          마일스톤 등록하러 가기
        </Link>
      </div>
      <div className="flex w-full justify-center bg-[url('/images/milestone/milestone_img02_bg.png')] bg-center bg-no-repeat">
        <img className="!relative h-full w-full max-w-[400px]" src="/images/milestone/milestone_img02.png" />
      </div>
      <ul className="mx-2.5 mt-[70px] md:mx-5">
        <li className="mb-10 md:flex">
          <div className="mb-2.5 w-[220px] text-lg font-semibold text-primary-main md:mb-0">마일스톤 획득 방법</div>
          각 영역별 활동 수행 시, 책정 기준에 따라 마일스톤을 획득할 수 있습니다.
          <br />
          상세 내용은 아래 표를 참고해주세요.
        </li>
        <li className="mb-10 md:flex">
          <div className="mb-2.5 w-[220px] text-lg font-semibold text-primary-main md:mb-0">마일스톤 평가기간</div>
          전년도 9월부터 당해년도 8월까지의 실적
          <br />※ SW 창업, 오픈소스 SW 컨트리뷰션의 경우 당해년도 1월부터 9월까지의 실적만을 반영함.
        </li>
        <li className="mb-10 md:flex">
          <div className="mb-2.5 w-[220px] text-lg font-semibold text-primary-main md:mb-0">마일스톤 확인 방법</div>
          SW역량지원시스템에서는 나의 마일스톤 현황을 한 눈에 볼 수 있도록 제공하고 있습니다.
          <br />
          로그인 후, 메인 페이지와 마이페이지에서 확인하실 수 있습니다.
        </li>
      </ul>
      <div className="flex w-full justify-center">
        <img className="!relative h-full w-full max-w-[800px]" src="/images/milestone/milestone_img03.png" />
      </div>
    </div>
  );
}
