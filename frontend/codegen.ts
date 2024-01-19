import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5116/graphql",
  documents: "**/!(*.d).{ts,tsx}",
  generates: {
    "graphql/": {
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
