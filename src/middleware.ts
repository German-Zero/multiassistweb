import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "What'sFuckingIsIt?");

async function getRoleFromToken(token: string)  { 
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.roles as string;
    } catch {
        return null;
    }
}

export async function middleware(req: NextRequest) {

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
    
    if (token && pathname.startsWith('/dashboard')) {
        const role = await getRoleFromToken(token);

        if (!role) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (pathname.startsWith('/dashboard/admin') && !role.includes('ADMIN')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } 

        if (pathname.startsWith('/dashboard/director') && !role.includes('DIRECTOR')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (pathname.startsWith('/dashboard/preceptor') && !role.includes('PRECEPTOR')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (pathname.startsWith('/dashboard/students') && !role.includes('ALUMNO')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (pathname.startsWith('/dashboard/teachers') && !role.includes('PROFESOR')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*']
}