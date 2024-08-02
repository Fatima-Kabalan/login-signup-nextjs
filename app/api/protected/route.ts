
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = (req as any).user

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: 'This is a protected route', user });
}
