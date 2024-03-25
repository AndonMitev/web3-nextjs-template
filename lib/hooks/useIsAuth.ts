import { useState } from 'react';
import useAsyncEffect from './useAsyncEffect';
import { isAuthAction } from '../actions/auth';
import { Optional } from '../types/common';

export default function useIsAuth() {
  const [isAuth, setIsAuth] = useState<Optional<boolean>>();

  useAsyncEffect(async () => {
    const { isAuth } = await isAuthAction();
    setIsAuth(isAuth);
  }, []);

  return { isAuth };
}
