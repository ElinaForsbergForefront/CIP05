import { defineConfig } from "orval"

export default defineConfig({
  flightfront: {
    input: {
      target: "http://localhost:5021/swagger/v1/swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "src/api/generated",
      schemas: "src/api/generated/model",
      client: "react-query",
      httpClient: "axios",
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "src/api/client/axios-instance.ts",
          name: "customAxiosInstance",
        },
        query: {
          useQuery: true,
          useInfinite: false,
          useInfiniteQueryParam: "page",
          options: {
            staleTime: 10000,
          },
        },
      },
    },
  },
})