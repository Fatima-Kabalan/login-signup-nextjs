import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_KEY as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Attach the decoded user information to the request
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected-route'], // Replace with the actual routes you want to protect
};
