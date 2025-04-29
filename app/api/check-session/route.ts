import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("session");

    if(!session){
        return NextResponse.json({isLoggedIn: false});
    }

    return NextResponse.json({isLoggedIn: true});
}