import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

type ReactQueryProviderProps = {
  children: ReactNode;
};

export default function ReactQueryProvider({
  children
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
