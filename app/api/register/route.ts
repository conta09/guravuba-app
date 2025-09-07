import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    console.log("✅ User created:", user.email);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("❌ Error in register:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
