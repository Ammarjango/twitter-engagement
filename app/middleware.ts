// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import isAuthenticated from '../utils/auth'
// export default withAuth(
//   function middleware(request: NextRequest) {
//     console.log('Middleware triggered:', request.nextUrl.pathname)
//     if (!isAuthenticated && config.matcher.includes(request.nextUrl.pathname)) {
//       if (request.nextUrl.pathname.startsWith('/admin')) {
//         return NextResponse.rewrite(new URL('/admin', request.url))
//       }
//       if (request.nextUrl.pathname.startsWith('/user')) {
//         return NextResponse.rewrite(new URL('/', request.url))
//       }
//     }
//   },
//   {
//     callbacks: {t-auth
//       authorized: (token) => {
//         return !!token
//       },
//     },
//   },
// )
// export const config = {
//   matcher: ['/((?!api|_next/static|favicon.ico).*)'],
// }
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('middleware :>>  app  ', request.url)

  return NextResponse.next()
  //   return NextResponse.redirect(new URL('/home', request.url))
}
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/((?!api|_next/static|favicon.ico).*)'],
// }
