import { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import RainbowKitProvider from './RainbowKitProvider';
import { cookieToInitialState } from 'wagmi';
import wagmiConfig from '@/lib/config/wagmi';
import { headers } from 'next/headers';

type ProvidersProps = {
  children: ReactNode;
};

export default async function Providers({ children }: ProvidersProps) {
  const headersStore = headers();
  const cookie = headersStore.get('cookie');

  const initialState = cookieToInitialState(wagmiConfig, cookie);

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <RainbowKitProvider initialState={initialState}>
        {children}
      </RainbowKitProvider>
    </ThemeProvider>
  );
}
