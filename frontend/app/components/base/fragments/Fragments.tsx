import { graphql } from "@/gql/generated";

const Fragments = () => {
  const errorMutationFragment = graphql(`
    fragment errorFields on Error {
      __typename
      message
    }
  `);

  const categoryFragment = graphql(`
    fragment categoryFields on Category {
      id
      name
      categoryType
    }
  `);

  const transactionFragment = graphql(`
    fragment transactionFields on Transaction {
      id
      amount
      description
      dateTime
      currency
      transactionType
      category {
        ...categoryFields
      }
    }
  `);

  const accountFragment = graphql(`
    fragment accountFields on Account {
      currency
      incomeAmount
      expenseAmount
      categories {
        ...categoryFields
      }
      transactions {
        ...transactionFields
      }
    }
  `);

  return <></>;
};

export default Fragments;
