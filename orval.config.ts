import { defineConfig } from "orval";

export default defineConfig({
  services: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "./services/generated",
      client: "react-query",
      clean: true,
      httpClient: "axios",
      override: {
        mutator: {
          path: "./services/axios.ts",
          name: "getAxiosInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
          usePrefetch: true,
        },
      },
    },
  },
});
