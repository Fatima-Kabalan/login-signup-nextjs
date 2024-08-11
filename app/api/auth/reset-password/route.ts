import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User"; // Assuming you have a User model
import connectMongodb from "@/util/dbconnection";
import { NextRequest, NextResponse } from "next/server";


const JWT_SECRET =`${process.env.JWT_SECRET}` as string;

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongodb();

  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  
  }

  const { token, password } = await req.json();

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string };

    // Find the user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the updated user
    await user.save();

    return NextResponse.json({ message:  "Password reset successful"  }, { status: 200 });
   
  } catch (error) {
    NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
