import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  let userId: string;
  try {
    const sessionData = JSON.parse(session.value);
    userId = sessionData.userId;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid session data", error },
      { status: 400 }
    );
  }

  return NextResponse.json({ userId: userId }, { status: 200 });
}
