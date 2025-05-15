import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
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
  const productId = body.productId;

  try {

    await sql`
      UPDATE cart
      SET checkedOut = 'no'
      WHERE userId = ${userId} AND productId = ${productId} AND checkedOut = 'pending'
    `;

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to checkout selected products",
        error,
      },
      { status: 500 }
    );
  }
}
