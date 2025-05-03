// File: /app/api/cart/total-sum-checkedout-items/route.ts

import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session) {
    return NextResponse.json({ success: false, message: "Not Authenticated" }, { status: 401 });
  }

  let userId: string;
  try {
    const sessionData = JSON.parse(session.value);
    userId = sessionData.userId;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid session", error }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT 
        SUM(price * quantity) AS totalValue,
        SUM(((price / (1 - discount / 100)) - price) * quantity) AS totalSaved
      FROM cart
      WHERE userId = ${userId} AND checkedOut = TRUE
    `;

    const row = result.rows[0];
    const totalValue = parseFloat(row.totalvalue || 0);
    const totalSaved = parseFloat(row.totalsaved || 0);

    return NextResponse.json({
      success: true,
      totalValue,
      totalSaved,
    });
  } catch (error) {
    console.error("Error fetching totals:", error);
    return NextResponse.json({ success: false, message: "Server error", error }, { status: 500 });
  }
}
