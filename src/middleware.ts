import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get('access_token')?.value;
    const { pathname } = req.nextUrl;
    
    if (pathname.startsWith('/login') && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    if (pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    
    if (pathname === '/') {
        return NextResponse.redirect(
            new URL(token ? '/dashboard' : '/login', req.url)
        );
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*']
}