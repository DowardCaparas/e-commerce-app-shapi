import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  try {
    await sql`
            DELETE 
            FROM cart
            WHERE userId = ${userId} AND productId = ${productId}
        `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return NextResponse.json({success: false, message: "Failed to delete product from cart"},
        {status: 500}
    )
  }
}
