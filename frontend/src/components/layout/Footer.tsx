import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex min-h-[200px] w-[100vw] items-center justify-center bg-background-base">
      <div className="grid w-client_max grid-cols-1 justify-items-center gap-5 lg:grid-cols-[1fr_3fr_105px] lg:justify-items-start">
        <Image
          className="hidden lg:block"
          src="/images/logo/foot_logo.svg"
          alt="foot_logo"
          width="160"
          height="40"
          priority={false}
        />
        {/* 400 14px "Noto Sans KR", sans-serif */}
        <div className="text-center lg:text-left">
          <p className="text-sm font-normal">(46241) 부산광역시 금정구 부산대학로 63번길 2 (장전동)</p>
          <p className="text-sm font-normal">부산대학교 소프트웨어융합교육원</p>
        </div>
        <Link className="h-fit w-fit border-b border-comment pb-[2px] text-sm font-normal text-comment" href="/">
          개인정보처리방침
        </Link>
        <p className="text-sm font-normal">ⓒ 2021 PNUswedu. All Right Reserved.</p>
        <p className="text-sm font-normal">TEL : 051-510-3737, 3738, 3624</p>
      </div>
    </footer>
  );
}
