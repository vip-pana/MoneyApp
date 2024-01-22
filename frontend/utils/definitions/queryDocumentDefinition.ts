import { graphql } from "@/graphql";

// for convention all methods created in this file will have at the end of the name the phrase "QueryDocument"
// there are all the graphql queries, the query name must have at the end of the name the phrase "Query" or "Mutation" depending of what is the use

export const getUsersQueryDocument = graphql(`
  query getUsersQuery {
    users {
      name
      surname
    }
  }
`);

export const checkEmailExistQueryDocument = graphql(`
  query userExistByEmailQuery($email: String!) {
    userExistByEmail(email: $email)
  }
`);

// export const loginQueryDocument = graphql(`
//     query GetTask {

//     }
// `);
