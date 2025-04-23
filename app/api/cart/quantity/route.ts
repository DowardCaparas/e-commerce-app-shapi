import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // update if your db helper is elsewhere

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const result = await sql<{ count: number }>`
      SELECT COUNT(*) AS count
      FROM cart
      WHERE userId = ${userId}
    `;
    const quantity = result.rows[0].count || 0;
    return NextResponse.json({ quantity });
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
