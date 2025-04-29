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

  const { productId, quantity } = await req.json();

  try {
    await sql`
      UPDATE cart
      SET quantity = ${quantity}
      WHERE userId = ${userId} AND productId = ${productId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update quantity." },
      { status: 500 }
    );
  }
}
