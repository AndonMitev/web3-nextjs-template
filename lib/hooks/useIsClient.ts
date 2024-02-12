import { useEffect, useState } from 'react';

/**
 * Fix hydration in client components that render diff from what was pre-rendered on server ( dynamic computed on CSR )
 * https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
 */

export default function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient };
}
