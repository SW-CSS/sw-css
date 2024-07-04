'use client';

import PageTitle from '@/app/components/PageTitle';

const Page = () => (
  <div className="rounded-sm bg-white p-5">
    <PageTitle title="실적 등록" description="" urlText="" url="" />
    <div className="mb-10 flex items-center justify-between border-b-black py-4">
      <p className="text-lg font-bold">실적 등록하기</p>
      <button type="button" className="rounded-sm bg-primary-main px-5 py-1 text-white">
        등록하기
      </button>
    </div>
    <div>실적 내용 </div>
  </div>
);

export default Page;
