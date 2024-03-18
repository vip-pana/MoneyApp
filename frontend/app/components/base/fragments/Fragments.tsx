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
      subCategories {
        id
        name
        categoryType
      }
    }
  `);

  const subcategoryFragment = graphql(`
    fragment subcategoryFields on SubCategory {
      id
      name
      categoryType
    }
  `);

  const transactionFragment = graphql(`
    fragment transactionFields on Transaction {
      id
      amount
      currency
      dateTime
      description
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

  const accountBaseDetailFragment = graphql(`
    fragment accountBaseDetails on Account {
      id
      name
      currency
      incomeAmount
      expenseAmount
    }
  `);

  return <></>;
};

export default Fragments;
