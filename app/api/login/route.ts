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

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set({
      name: "session",
      value: JSON.stringify({userId: user.id, userRole: user.role}),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 //7days
    });

    return response;
    
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
