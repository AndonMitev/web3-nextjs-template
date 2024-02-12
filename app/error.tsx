'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'Error'
};

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg(error.message);
  }, [error]);

  return (
    <main>
      <Label title='Something went wrong' />
      <Label>{errorMsg}</Label>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
