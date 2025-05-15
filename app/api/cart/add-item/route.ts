import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({success: false, message: "Not authenticated" }, { status: 401 });
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

  const { productId, name, price, discount, thumbnail, quantity, date } =
    await req.json();

  try {
    // check if the product is already exist in the cart
    const existingItem = await sql`
      SELECT * FROM cart
      WHERE userId = ${userId} AND productId = ${productId} AND checkedOut = 'no'
      LIMIT 1
    `;

    if (existingItem.rows.length > 0) {
      // if exist update the quantity only
      await sql`
        UPDATE cart 
        SET quantity = quantity + ${quantity}
        WHERE userId = ${userId} AND productId = ${productId}
      `;
    } else {
      await sql`
      INSERT INTO cart (userId, productId, name, price, discount, thumbnail, quantity, date)
      VALUES (${userId}, ${productId}, ${name}, ${price}, ${discount}, ${thumbnail}, ${quantity}, ${date})
    `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}
