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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();

   // Generate JWT
   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

   return NextResponse.json({ message: 'User created', token }, { status: 201 })
}
