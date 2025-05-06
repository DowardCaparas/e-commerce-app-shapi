import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    await sql`
      UPDATE cart
      SET checkedOut = 'completed'
      WHERE userId = ${userId} AND checkedOut = 'pending'
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product from cart" },
      { status: 500 }
    );
  }
}
