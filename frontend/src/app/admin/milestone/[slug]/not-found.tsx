import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>요청하신 리소스를 찾을 수 없습니다.</p>
        <Link
          href="/admin/milestone"
          className="mt-4 rounded-sm bg-admin-primary-main px-4 py-2 text-sm text-white hover:bg-admin-primary-dark"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
}
