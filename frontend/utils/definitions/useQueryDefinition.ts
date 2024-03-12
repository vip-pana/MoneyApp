// // for convention, all methods created in this file will have at the start of the name the prefix "use" and on the end "Query"
// // that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// // here you must insert only the request and the call needs to be done on the component

import request from "graphql-request";
import { queryUrl } from "../queryUrl";
import {
  AddOrUpdateTransactionDocument,
  AddOrUpdateTransactionMutation,
  DeleteTransactionDocument,
  DeleteTransactionListDocument,
  DeleteTransactionMutation,
  LoginDocument,
  LoginMutation,
  SignupDocument,
  SignupMutation,
  User,
  UserByEmailDocument,
  UserByEmailQuery,
  UserTransactionsFilteredDocument,
  UserExistByEmailDocument,
  UserExistByEmailQuery,
  DeleteTransactionListMutation,
  RefreshTokenMutation,
  RefreshTokenDocument,
  RefreshTokenInput,
} from "@/gql/generated/graphql";
import {
  LoginQueryValueDefinition,
  SignupQueryValueDefinition,
  TransactionListQueryValueDefinition as TransactionListMutationValueDefinition,
  TransactionQueryValueDefinition as TransactionMutationValueDefinition,
  TransactionsSearchQueryValueDefinition as TransactionsFilteredQueryValueDefinition,
} from "./typeDefinition";

// NO AUTH NEEDED
export const UseCheckEmailExistQuery = async (emailFormValue: string) => {
  const res = request<UserExistByEmailQuery>(queryUrl, UserExistByEmailDocument, {
    email: emailFormValue,
  });
  return res;
};

export const UseLoginQuery = async ({ email, password }: LoginQueryValueDefinition) => {
  const res = await request<LoginMutation>(queryUrl, LoginDocument, {
    input: {
      email: email,
      password: password,
    },
  });
  return res;
};

export const UseSignupQuery = async (props: SignupQueryValueDefinition) => {
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
export const UseUserByEmailQuery = async (email: string, headers: {}) => {
  const res = await request<UserByEmailQuery>(
    queryUrl,
    UserByEmailDocument,
    {
      email: email,
    },
    headers
  );
  return res;
};

export const UseAddOrUpdateTransactionMutation = async (props: TransactionMutationValueDefinition) => {
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
    },
    props.headers
  );
  return res;
};

export const UseDeleteTransactionMutation = async (props: TransactionMutationValueDefinition) => {
  const res = await request<DeleteTransactionMutation>(
    queryUrl,
    DeleteTransactionDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionId: props.transactionId,
      },
    },
    props.headers
  );
  return res;
};

export const UseDeleteTransactionListMutation = async (props: TransactionListMutationValueDefinition) => {
  const res = await request<DeleteTransactionListMutation>(
    queryUrl,
    DeleteTransactionListDocument,
    {
      input: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionIds: props.transactionIds,
      },
    },
    props.headers
  );
  return res;
};

export const UseTransactionsFilteredQuery = async (props: TransactionsFilteredQueryValueDefinition) => {
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
    },
    props.headers
  );
  return res;
};

export const UseRefreshTokenMutation = async (refreshToken: string) => {
  return await request<RefreshTokenMutation>(queryUrl, RefreshTokenDocument, {
    input: { refreshToken: refreshToken },
  });
};
