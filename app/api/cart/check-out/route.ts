import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json(
      { message: "Not Authenticated" },
      { status: 401 }
    );
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

  const body = await req.json();
  const productIds = body.productIds;

  if (
    !Array.isArray(productIds) ||
    productIds.length === 0 ||
    !productIds.every((id) => Number.isInteger(id))
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid or missing product IDs" },
      { status: 400 }
    );
  }

  // Convert JS array to Postgres-compatible array string
  const pgArray = `{${productIds.join(",")}}`;

  try {
    await sql`
      UPDATE cart
      SET checkedOut = 'pending'
      WHERE userId = ${userId} AND productId = ANY(${pgArray}::int[])
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to checkout selected products", error },
      { status: 500 }
    );
  }
}
