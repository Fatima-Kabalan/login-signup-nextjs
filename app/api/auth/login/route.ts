import { jwtVerify, SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongodb from "@/util/dbconnection";
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_KEY as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

// Function to decrypt JWT
async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error('Error decrypting token:', error);
    throw new Error('Invalid token');
  }
}

export async function POST(req: NextRequest) {
  await connectMongodb();

  try {
    const { email, password , username } = await req.json();

    if (!email || !password ||!username) {
      return NextResponse.json({ message: 'Email and password and username are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Ensure JWT_SECRET is a string and defined
    if (typeof JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET is not a valid string');
    }

    // Create JWT
    try {
      const token = await new SignJWT({ userId: user._id.toString() })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(JWT_SECRET));
      console.log("token in login ", token);

      // Optionally decrypt the token to check its contents
      const decryptedPayload = await decrypt(token);
      console.log("Decrypted token payload:", decryptedPayload);

      return NextResponse.json({ token , email: user.email , username: user.username});
    } catch (error) {
      console.error('Error signing token:', error);
      return NextResponse.json({ message: 'Error creating token' }, { status: 500 });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
