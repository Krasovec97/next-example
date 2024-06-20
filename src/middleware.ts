import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";

export function middleware(request: NextRequest) {
    if (!cookies().has('auth')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Set matchin paths, to run this middleware on
export const config = {
    matcher: ['/profile'],
}