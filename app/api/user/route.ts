import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import connectMongodb from "@/util/dbconnection";
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_KEY as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

export async function GET(req: NextRequest) {
  await connectMongodb();

  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
      algorithms: ["HS256"],
    });

    const userId = payload.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ email: user.email , username : user.username });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
