import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';



const JWT_SECRET = process.env.JWT_KEY as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

export async function middleware(req: NextRequest) {
  console.log('middleware is activated')
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/api/protected'], // Apply to all routes under /protected/
};
