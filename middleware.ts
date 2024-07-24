import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./services/AuthService";
import { auth } from "./auth";
import { signOut } from "@/auth";

function redirectLogin(pathname: string, req: NextRequest): NextResponse {
    var response;

    if(pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
        response = NextResponse.next();
    } else {
        response = NextResponse.redirect(new URL("/login", req.url));
    }

    response.cookies.delete("authjs.callback-url");
    response.cookies.delete("authjs.csrf-token");
    response.cookies.delete("authjs.session-token");
    return response;
}

function redirectHome(req: NextRequest): NextResponse {
    return NextResponse.redirect(new URL("/", req.url));
}

export default auth(async (req) => {
    let token = (await auth())?.user?.token;
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
});

export const config = {
    matcher: [
        "/login",
        "/sign-up",
        "/setting",
        "/create/:path*",
        "/categories/:name/edit"
    ]
}