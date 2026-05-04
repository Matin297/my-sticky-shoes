"use client";

import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/query-client-factory";
import { isDevelopmentEnv } from "@/lib/utils";

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {isDevelopmentEnv && <ReactQueryDevtools />}
    </TanstackQueryClientProvider>
  );
}
