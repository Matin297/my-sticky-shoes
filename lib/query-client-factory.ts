import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { cache } from "react";

const QUERY_RETRY = 3;
const STALE_TIME = 5 * 60 * 1000; // 5 min
const GARBAGE_COLLECTION_TIME = 10 * 60 * 1000; // 10 minutes
const NO_RETRY_STATUS_CODES = [401, 403, 404];

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return getServerQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

const getServerQueryClient = cache(() => makeQueryClient());

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: GARBAGE_COLLECTION_TIME,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        retry(failureCount, error) {
          const axiosError = error as AxiosError;
          const axiosStatus = axiosError.response?.status;

          if (axiosStatus && NO_RETRY_STATUS_CODES.includes(axiosStatus)) {
            return false;
          }

          return failureCount < QUERY_RETRY;
        },
      },
      mutations: {
        retry: false,
        networkMode: "online",
      },
    },
  });
}
