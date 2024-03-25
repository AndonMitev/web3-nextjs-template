'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '../constants';

export async function signInAction({ jwt }: { jwt: string }) {
  cookies().set(COOKIE_KEYS.JWT, jwt, { secure: true });
}

export async function signOutAction() {
  cookies().delete(COOKIE_KEYS.JWT);
}

export async function isAuthAction() {
  const jwt = cookies().get(COOKIE_KEYS.JWT)?.value;

  return { isAuth: Boolean(jwt) };
}
