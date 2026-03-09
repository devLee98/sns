"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    //전역으로 설정하는 방법
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 5 * 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
