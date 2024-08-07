import { IRON_OPTIONS } from '@/lib/config/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { SignJWT } from 'jose';
import { env } from '@/lib/config/env';
import { JWT_CONFIG } from '@/lib/constants';

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

  const jwt = await generateJwt({
    address: fields.address,
    chainId: fields.chainId,
    domain: fields.domain,
    nonce: fields.nonce,
  });

  return NextResponse.json({ jwt });
}

async function generateJwt(payload: { address: string; chainId: number; domain: string; nonce: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_CONFIG.ISSUER)
    .setAudience(JWT_CONFIG.AUDIENCE)
    .sign(new TextEncoder().encode(env.JWT_SECRET_KEY));
}