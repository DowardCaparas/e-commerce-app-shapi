import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // update if your db helper is elsewhere

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
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

  try {
    const result = await sql<{ count: number }>`
      SELECT COUNT(*) AS count
      FROM cart
      WHERE userId = ${userId} AND checkedOut = 'no'
    `;
    const quantity = result.rows[0].count || 0;
    return NextResponse.json({ quantity });
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
