import { NextResponse, type NextRequest } from 'next/server';

import { AuthSliceState } from './store/auth.slice';

export const middleware = (request: NextRequest) => {
  const authJsonStr = request.cookies.get('auth')?.value;
  const auth: AuthSliceState = authJsonStr ? JSON.parse(authJsonStr) : null;

  if ((!auth || !auth.isAuth) && request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/sign-in', request.url));
  }
  if ((!auth || !auth.isModerator) && request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname === '/admin') {
    return Response.redirect(new URL('/admin/milestone/list', request.url));
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
