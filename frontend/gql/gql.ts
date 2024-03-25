/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment errorFields on Error {\n      __typename\n      message\n    }\n  ": types.ErrorFieldsFragmentDoc,
    "\n    fragment categoryFields on Category {\n      id\n      name\n      categoryType\n      subCategories {\n        id\n        name\n        categoryType\n      }\n    }\n  ": types.CategoryFieldsFragmentDoc,
    "\n    fragment subcategoryFields on SubCategory {\n      id\n      name\n      categoryType\n    }\n  ": types.SubcategoryFieldsFragmentDoc,
    "\n    fragment transactionFields on Transaction {\n      id\n      amount\n      currency\n      dateTime\n      description\n      transactionType\n      category {\n        ...categoryFields\n      }\n    }\n  ": types.TransactionFieldsFragmentDoc,
    "\n    fragment accountFields on Account {\n      currency\n      incomeAmount\n      expenseAmount\n      categories {\n        ...categoryFields\n      }\n      transactions {\n        ...transactionFields\n      }\n    }\n  ": types.AccountFieldsFragmentDoc,
    "\n    fragment accountBaseDetails on Account {\n      id\n      name\n      currency\n      incomeAmount\n      expenseAmount\n    }\n  ": types.AccountBaseDetailsFragmentDoc,
    "\n  mutation addOrUpdateTransaction($input: AddOrUpdateTransactionInput!) {\n    addOrUpdateTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          ...categoryFields\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.AddOrUpdateTransactionDocument,
    "\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      name\n      surname\n      email\n      accounts {\n        id\n        name\n        currency\n        incomeAmount\n        expenseAmount\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            id\n            name\n            categoryType\n          }\n        }\n      }\n    }\n  }\n": types.UserByEmailDocument,
    "\n  mutation refreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation addCategory($input: AddCategoryInput!) {\n    addCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.AddCategoryDocument,
    "\n  mutation DeleteCategory($input: DeleteCategoryInput!) {\n    deleteCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.EditCategoryDocument,
    "\n  mutation AddSubCategory($input: AddSubCategoryInput!) {\n    addSubCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.AddSubCategoryDocument,
    "\n  mutation DeleteSubCategory($input: DeleteSubCategoryInput!) {\n    deleteSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.DeleteSubCategoryDocument,
    "\n  mutation EditSubCategory($input: EditSubCategoryInput!) {\n    editSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.EditSubCategoryDocument,
    "\n  mutation deleteTransaction($input: DeleteTransactionInput!) {\n    deleteTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.DeleteTransactionDocument,
    "\n  mutation deleteTransactionList($input: DeleteTransactionListInput!) {\n    deleteTransactionList(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.DeleteTransactionListDocument,
    "\n  query userTransactionsFiltered($input: FilterTransactionListInput!) {\n    userTransactionsFiltered(input: $input) {\n      accounts {\n        transactions {\n          ...transactionFields\n        }\n      }\n    }\n  }\n": types.UserTransactionsFilteredDocument,
    "\n  query userExistByEmail($email: String!) {\n    userExistByEmail(email: $email)\n  }\n": types.UserExistByEmailDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation signup($input: SignupInput!) {\n    signup(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n": types.SignupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment errorFields on Error {\n      __typename\n      message\n    }\n  "): (typeof documents)["\n    fragment errorFields on Error {\n      __typename\n      message\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment categoryFields on Category {\n      id\n      name\n      categoryType\n      subCategories {\n        id\n        name\n        categoryType\n      }\n    }\n  "): (typeof documents)["\n    fragment categoryFields on Category {\n      id\n      name\n      categoryType\n      subCategories {\n        id\n        name\n        categoryType\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment subcategoryFields on SubCategory {\n      id\n      name\n      categoryType\n    }\n  "): (typeof documents)["\n    fragment subcategoryFields on SubCategory {\n      id\n      name\n      categoryType\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment transactionFields on Transaction {\n      id\n      amount\n      currency\n      dateTime\n      description\n      transactionType\n      category {\n        ...categoryFields\n      }\n    }\n  "): (typeof documents)["\n    fragment transactionFields on Transaction {\n      id\n      amount\n      currency\n      dateTime\n      description\n      transactionType\n      category {\n        ...categoryFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment accountFields on Account {\n      currency\n      incomeAmount\n      expenseAmount\n      categories {\n        ...categoryFields\n      }\n      transactions {\n        ...transactionFields\n      }\n    }\n  "): (typeof documents)["\n    fragment accountFields on Account {\n      currency\n      incomeAmount\n      expenseAmount\n      categories {\n        ...categoryFields\n      }\n      transactions {\n        ...transactionFields\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment accountBaseDetails on Account {\n      id\n      name\n      currency\n      incomeAmount\n      expenseAmount\n    }\n  "): (typeof documents)["\n    fragment accountBaseDetails on Account {\n      id\n      name\n      currency\n      incomeAmount\n      expenseAmount\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addOrUpdateTransaction($input: AddOrUpdateTransactionInput!) {\n    addOrUpdateTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          ...categoryFields\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation addOrUpdateTransaction($input: AddOrUpdateTransactionInput!) {\n    addOrUpdateTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          ...categoryFields\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      name\n      surname\n      email\n      accounts {\n        id\n        name\n        currency\n        incomeAmount\n        expenseAmount\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            id\n            name\n            categoryType\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      name\n      surname\n      email\n      accounts {\n        id\n        name\n        currency\n        incomeAmount\n        expenseAmount\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            id\n            name\n            categoryType\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation refreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation refreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addCategory($input: AddCategoryInput!) {\n    addCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation addCategory($input: AddCategoryInput!) {\n    addCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCategory($input: DeleteCategoryInput!) {\n    deleteCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($input: DeleteCategoryInput!) {\n    deleteCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation editCategory($input: EditCategoryInput!) {\n    editCategory(input: $input) {\n      user {\n        accounts {\n          transactions {\n            id\n            amount\n            description\n            transactionType\n            currency\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n            dateTime\n          }\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddSubCategory($input: AddSubCategoryInput!) {\n    addSubCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddSubCategory($input: AddSubCategoryInput!) {\n    addSubCategory(input: $input) {\n      category {\n        id\n        name\n        categoryType\n        subCategories {\n          id\n          name\n          categoryType\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSubCategory($input: DeleteSubCategoryInput!) {\n    deleteSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSubCategory($input: DeleteSubCategoryInput!) {\n    deleteSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditSubCategory($input: EditSubCategoryInput!) {\n    editSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditSubCategory($input: EditSubCategoryInput!) {\n    editSubCategory(input: $input) {\n      user {\n        accounts {\n          categories {\n            id\n            name\n            categoryType\n            subCategories {\n              name\n              categoryType\n              id\n            }\n          }\n          transactions {\n            id\n            amount\n            currency\n            dateTime\n            description\n            transactionType\n            subCategory {\n              id\n              categoryType\n              name\n            }\n            category {\n              id\n              name\n              categoryType\n              subCategories {\n                id\n                name\n                categoryType\n              }\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTransaction($input: DeleteTransactionInput!) {\n    deleteTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTransaction($input: DeleteTransactionInput!) {\n    deleteTransaction(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTransactionList($input: DeleteTransactionListInput!) {\n    deleteTransactionList(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTransactionList($input: DeleteTransactionListInput!) {\n    deleteTransactionList(input: $input) {\n      account {\n        currency\n        incomeAmount\n        expenseAmount\n        categories {\n          id\n          name\n          categoryType\n          subCategories {\n            ...subcategoryFields\n          }\n        }\n        transactions {\n          id\n          amount\n          currency\n          dateTime\n          description\n          transactionType\n          subCategory {\n            id\n            categoryType\n            name\n          }\n          category {\n            id\n            name\n            categoryType\n            subCategories {\n              id\n              name\n              categoryType\n            }\n          }\n        }\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userTransactionsFiltered($input: FilterTransactionListInput!) {\n    userTransactionsFiltered(input: $input) {\n      accounts {\n        transactions {\n          ...transactionFields\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userTransactionsFiltered($input: FilterTransactionListInput!) {\n    userTransactionsFiltered(input: $input) {\n      accounts {\n        transactions {\n          ...transactionFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userExistByEmail($email: String!) {\n    userExistByEmail(email: $email)\n  }\n"): (typeof documents)["\n  query userExistByEmail($email: String!) {\n    userExistByEmail(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signup($input: SignupInput!) {\n    signup(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signup($input: SignupInput!) {\n    signup(input: $input) {\n      tokenResponse {\n        accessToken\n        refreshToken\n      }\n      errors {\n        ...errorFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;