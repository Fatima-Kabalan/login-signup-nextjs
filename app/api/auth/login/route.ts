import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongodb from "@/util/dbconnection"
import User from '@/models/User';
import jwt from 'jsonwebtoken';



const JWT_SECRET = process.env.JWT_KEY as string;



export async function POST(req: NextRequest) {
  await connectMongodb();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
  }
  // Generate JWT
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ message: 'Login successful', token }, { status: 200 });

}
