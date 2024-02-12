'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import useIsClient from '@/lib/hooks/useIsClient';

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const { isClient } = useIsClient();

  if (!isClient) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
