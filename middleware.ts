import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./services/AuthService";
import { auth } from "./auth";

function redirectLogin(pathname: string, req: NextRequest): NextResponse {
    var response;

    if (pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
        response = NextResponse.next();
    } else {
        response = NextResponse.redirect(new URL("/login", req.url));
    }

    return response;
}

function redirectHome(req: NextRequest): NextResponse {
    return NextResponse.redirect(new URL("/", req.url));
}

export default auth(async (req) => {
    let token = req.auth?.user?.token;
    let pathname = req.nextUrl.pathname;

    // If the user go to logout.
    if (pathname.startsWith("/logout") && req.auth?.user) {
        return NextResponse.next();
    }

    // if token exists and is valid.
    else if (token && (await validateToken(token)).data) {
        // redirect home if user want to go /login or /sign-up
        if (pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
            return redirectHome(req);
        }

        else return NextResponse.next();
    } else {
        if(req.auth?.user) {
            return NextResponse.redirect(new URL("/logout", req.url));
        }

        return redirectLogin(pathname, req);
    }
});

export const config = {
    matcher: [
        "/login",
        "/logout",
        "/sign-up",
        "/setting",
        "/create/:path*",
        "/categories/:name/edit"
    ]
}