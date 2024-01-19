import { graphql } from "@/graphql";

export const getUsers = graphql(`
  query Query {
    users {
      name
      surname
    }
  }
`);