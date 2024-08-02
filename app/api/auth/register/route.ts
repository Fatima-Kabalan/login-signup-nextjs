import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongodb from "@/util/dbconnection";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_KEY as string;

export async function POST(req: NextRequest) {
  await connectMongodb();

  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json({ message: 'Email, password, and username are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ email, password: hashedPassword, username });

  // Save the user to the database
  await user.save();

  // Generate JWT
  const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ message: 'User created', token }, { status: 201 });
}
