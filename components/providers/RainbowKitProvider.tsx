'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { State, WagmiProvider } from 'wagmi';
import { RainbowKitProvider as NextRainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import wagmiConfig from '@/lib/config/wagmi';
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import { getServerSessionAction } from '@/lib/actions/session';
import { Optional } from '@/lib/types/common';
import { Session } from 'next-auth';

type RainbowKitProviderProps = {
  children: ReactNode;
  initialState: State | undefined;
};

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my RainbowKit app'
});

export default function RainbowKitProvider({
  children,
  initialState
}: RainbowKitProviderProps) {
  const [session, setSession] = useState<Optional<Session>>();

  useEffect(() => {
    (async () => {
      const session = await getServerSessionAction();
      setSession(session);
      console.log('sess', session);
    })();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <ReactQueryProvider>
        <SessionProvider refetchInterval={0} session={session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
            enabled
          >
            <NextRainbowKitProvider coolMode>{children}</NextRainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
