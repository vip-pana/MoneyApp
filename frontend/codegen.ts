import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://localhost:7234/graphql",
  documents: "**/!(*.d).{ts,tsx}",
  generates: {
    "graphql/": {
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
