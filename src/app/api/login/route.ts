import { NextRequest, NextResponse } from 'next/server';
import { createToken, setAuthCookie } from '../../lib/auth';

const USERS = [
  {
    id: '1',
    email: process.env.NEXT_PUBLIC_EMAIL,
    password: process.env.NEXT_PUBLIC_PWD,
  },
];

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!process.env.NEXT_PUBLIC_EMAIL || !process.env.NEXT_PUBLIC_PWD) {
    return NextResponse.json(
      { error: 'Process Env Not Set Up' },
      { status: 401 },
    );
  }

  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createToken(
    user as { id: string; email: string; password: string },
  );

  const response = NextResponse.json({
    message: 'Login successful',
    user: { id: user.id, email: user.email },
  });

  await setAuthCookie(token);

  return response;
}
