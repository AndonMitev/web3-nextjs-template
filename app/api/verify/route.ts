import { IRON_OPTIONS } from '@/lib/config/session';
import { getIronSession } from 'iron-session';
import { NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';

export async function POST(request: Request) {
  const session = await getIronSession<{ nonce: string }>(
    cookies(),
    IRON_OPTIONS
  );

  const { message, signature } = await request.json();

  const siweMessage = new SiweMessage(message);
  const { data: fields } = await siweMessage.verify({ signature });

  if (fields.nonce !== session.nonce) {
    return NextResponse.json({ message: 'Invalid nonce.' }, { status: 422 });
  }

  return NextResponse.json({ jwt: 'json_web_token' });
}
