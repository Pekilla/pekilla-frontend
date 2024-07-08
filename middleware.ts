import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    
    console.log("MIDDLEWARE");
    return NextResponse.next();
}

export const config = {
    matcher : [
        '/setting'
    ]
}