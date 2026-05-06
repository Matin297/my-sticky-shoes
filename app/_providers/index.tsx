"use client";

import { MUIThemeProvider } from "./MUIThemeProvider";
import QueryClientProvider from "./QueryClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </QueryClientProvider>
  );
}
