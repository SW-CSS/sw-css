import { NextResponse, type NextRequest } from 'next/server';

import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';

export const middleware = (request: NextRequest) => {
  const auth: AuthSliceState = getAuthFromCookie();

  // TODO: cookie는 사용자가 변조 가능함. 그래서 확인만하는 것이 아닌 검증과증이 필요.
  // token을 API로 보내 진짜 관리자인지 확인하는 과정 추가하기.
  if ((!auth || !auth.isAuth) && request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/sign-in', request.url));
  }
  if ((!auth || !auth.isModerator) && request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname === '/admin') {
    return Response.redirect(new URL('/admin/milestone', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
