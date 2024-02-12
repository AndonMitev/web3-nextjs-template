'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { State, WagmiProvider } from 'wagmi';
import { RainbowKitProvider as NextRainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import wagmiConfig from '@/lib/config/wagmi';

type RainbowKitProviderProps = {
  children: ReactNode;
  initialState: State | undefined;
};

export default function RainbowKitProvider({
  children,
  initialState
}: RainbowKitProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <ReactQueryProvider>
        <NextRainbowKitProvider coolMode>{children}</NextRainbowKitProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
