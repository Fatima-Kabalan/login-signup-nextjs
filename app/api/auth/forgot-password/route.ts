
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/util/sendEmail';
import User from '@/models/User';
import connectMongodb from '@/util/dbconnection';

const JWT_SECRET = `${process.env.JWT_SECRET}` as string;

export async function POST(request: Request) {
  await connectMongodb();

  const { email } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("token", token);

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    console.log("url", resetUrl);
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ message: 'Failed to send password reset email' }, { status: 500 });
  }
}
