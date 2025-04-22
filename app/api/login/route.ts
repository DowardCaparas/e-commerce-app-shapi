import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const result = await sql`
      SELECT * FROM accounts WHERE username = ${username}
    `;

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", userId: user.userId }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
