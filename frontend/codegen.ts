import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5116/graphql",
  documents: "app/**/*.tsx",
  generates: {
    "gql/generated/": {
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
