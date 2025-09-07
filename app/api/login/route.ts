import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // success
    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
