import { headers } from 'next/headers';

const findTabs = [
  { name: '아이디 찾기', url: '/find-id' },
  { name: '비밀번호 찾기', url: '/find-password' },
];

export default function AuthFindPageTabButton() {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const matchedPathStyle = 'border-b-4 border-primary-main text-primary-main';
  const unmatchedPathStyle = 'border-b-[1px] border-comment text-comment';

  return (
    <div className="flex w-full text-center">
      {findTabs.map((tab) => (
        <a
          key={tab.url}
          href={tab.url}
          className={`flex-grow pb-3 font-semibold ${pathname === tab.url ? matchedPathStyle : unmatchedPathStyle}`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
}
