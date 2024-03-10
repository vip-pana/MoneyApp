// // for convention, all methods created in this file will have at the start of the name the prefix "use" and on the end "Query"
// // that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// // here you must insert only the request and the call needs to be done on the component

import request from "graphql-request";
import { queryUrl } from "../queryUrl";
import {
  AddCategoryDocument,
  AddCategoryMutation,
  AddOrUpdateTransactionDocument,
  AddOrUpdateTransactionMutation,
  DeleteCategoryDocument,
  DeleteCategoryMutation,
  DeleteTransactionDocument,
  DeleteTransactionListDocument,
  DeleteTransactionListMutation,
  DeleteTransactionMutation,
  LoginDocument,
  LoginMutation,
  SignupDocument,
  SignupMutation,
  User,
  UserByEmailDocument,
  UserByEmailQuery,
  UserExistByEmailDocument,
  UserExistByEmailQuery,
  UserTransactionsFilteredDocument,
} from "@/gql/generated/graphql";
import {
  AddCategoryFormValueDefinition,
  DeleteCategoryQueryValueDefinition,
  LoginQueryValueDefinition,
  SignupQueryValueDefinition,
  TransactionListQueryValueDefinition as TransactionListMutationValueDefinition,
  TransactionQueryValueDefinition as TransactionMutationValueDefinition,
  TransactionsSearchQueryValueDefinition as TransactionsFilteredQueryValueDefinition,
} from "./typeDefinition";

// const headers = {
//   Authorization: `Bearer`,
// };

// NO AUTH NEEDED
export const useCheckEmailExistQuery = async (email: string) => {
  const res = request<UserExistByEmailQuery>(queryUrl, UserExistByEmailDocument, {
    email: email,
  });
  return res;
};

export const useLoginQuery = async ({ email, password }: LoginQueryValueDefinition) => {
  const res = await request<LoginMutation>(queryUrl, LoginDocument, {
    input: {
      email: email,
      password: password,
    },
  });
  return res;
};

export const useSignupQuery = async (props: SignupQueryValueDefinition) => {
  const res = await request<SignupMutation>(queryUrl, SignupDocument, {
    input: {
      name: props.name,
      surname: props.surname,
      email: props.email,
      password: props.password,
      selectedCurrency: props.currency,
    },
  });
  return res;
};

// AUTH REQUIRED
export const UseUserByEmailQuery = async (email: string) => {
  const res = await request<UserByEmailQuery>(
    queryUrl,
    UserByEmailDocument,
    {
      email: email,
    }
    // headers
  );
  return res;
};

export const useAddOrUpdateTransactionMutation = async (props: TransactionMutationValueDefinition) => {
  if (!props.transaction) throw new Error("Missing transaction");

  const res = await request<AddOrUpdateTransactionMutation>(
    queryUrl,
    AddOrUpdateTransactionDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        transaction: {
          id: props.transactionId,
          amount: parseFloat(props.transaction.amount.toString()),
          currency: props.transaction.currency,
          transactionType: props.transaction.operationType,
          description: props.transaction.description,
          dateTime: props.transaction.date,
          category: {
            id: props.transaction.category.id,
            name: props.transaction.category.name,
            categoryType: props.transaction.operationType,
          },
        },
      },
    }
    // headers
  );
  return res;
};

export const useAddCategoryMutation = async (props: AddCategoryFormValueDefinition) => {
  const res = await request<AddCategoryMutation>(
    queryUrl,
    AddCategoryDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        name: props.name,
        operationType: props.operationType,
        subcategorysNames: props.subcategoriesName,
      },
    }
    // headers
  );
  return res;
};

export const useDeleteCategoryMutation = async (props: DeleteCategoryQueryValueDefinition) => {
  const res = await request<DeleteCategoryMutation>(
    queryUrl,
    DeleteCategoryDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        categoryId: props.categoryId,
      },
    }
    // headers
  );
  return res;
};

export const useDeleteTransactionMutation = async (props: TransactionMutationValueDefinition) => {
  const res = await request<DeleteTransactionMutation>(
    queryUrl,
    DeleteTransactionDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionId: props.transactionId,
      },
    }
    // headers
  );
  return res;
};

export const useDeleteTransactionListMutation = async (props: TransactionListMutationValueDefinition) => {
  const res = await request<DeleteTransactionListMutation>(
    queryUrl,
    DeleteTransactionListDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionIds: props.transactionIds,
      },
    }
    // headers
  );
  return res;
};

export const useTransactionsFilteredQuery = async (props: TransactionsFilteredQueryValueDefinition) => {
  const res = await request<User>(
    queryUrl,
    UserTransactionsFilteredDocument,
    {
      filters: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionFilters: {
          dateStart: props.dateStart,
          dateEnd: props.dateEnd,
          categoriesIds: props.categoriesIds,
          currencies: props.currencies,
        },
      },
    }
    // headers
  );
  return res;
};
