import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  try {
    await sql`
      UPDATE cart
      SET quantity = ${quantity}
      WHERE userId = ${userId} AND productId = ${productId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update quantity." }, { status: 500 });
  }
}
