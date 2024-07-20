import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./services/AuthService";

function redirectLogin(pathname: string, req: NextRequest): NextResponse {
    var response;
    
    if(pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
        response = NextResponse.next();
    } else {
        response = NextResponse.redirect(new URL("/login", req.url));
    }

    response.cookies.delete("token");
    return response;
}

function redirectHome(req: NextRequest): NextResponse {
    return NextResponse.redirect(new URL("/", req.url));
}

export default async function middleware(req: NextRequest) {
    let token = req.cookies.get("token")?.value;
    let pathname = req.nextUrl.pathname;

    // if token exists and is valid.
    if (token && (await validateToken(token)).data) {
        // redirect home if user want to go /login or /sign-up
        if (pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
            return redirectHome(req);
        }

        else return NextResponse.next();
    } else {
        return redirectLogin(pathname, req);
    }
}

export const config = {
    matcher: [
        "/login",
        "/sign-up",
        "/setting",
        "/create/:path*"
    ]
}