import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
