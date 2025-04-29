import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  let userId: string;
  let userRole: string;
  try {
    const sessionData = JSON.parse(session.value);
    userId = sessionData.userId;
    userRole = sessionData.userRole;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid session data", error },
      { status: 400 }
    );
  }

  return NextResponse.json({ userId: userId, role: userRole }, { status: 200 });
}
