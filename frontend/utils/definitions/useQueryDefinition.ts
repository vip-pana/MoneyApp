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
  EditCategoryMutation,
  EditCategoryDocument,
  DeleteCategoryMutation,
  DeleteCategoryDocument,
  AddCategoryMutation,
  AddCategoryDocument,
  AddSubCategoryMutation,
  AddSubCategoryDocument,
  LoginInput,
  SignupInput,
  DeleteTransactionInput,
  DeleteTransactionListInput,
  AddCategoryInput,
  AddSubCategoryInput,
  DeleteCategoryInput,
  EditCategoryInput,
  AddOrUpdateTransactionInput,
  EditSubCategoryInput,
  FilterTransactionListInput,
  EditSubCategoryMutation,
  EditSubCategoryDocument,
} from "@/gql/generated/graphql";
import { GqlHeaders } from "./typeDefinition";

// NO AUTH NEEDED
export const UseCheckEmailExistQuery = async (email: string) => {
  return request<UserExistByEmailQuery>(queryUrl, UserExistByEmailDocument, { email });
};

export const UseLoginQuery = async (input: LoginInput) => {
  return await request<LoginMutation>(queryUrl, LoginDocument, { input });
};

export const UseSignupQuery = async (input: SignupInput) => {
  return await request<SignupMutation>(queryUrl, SignupDocument, { input });
};

export const UseRefreshTokenMutation = async (input: RefreshTokenInput) => {
  return await request<RefreshTokenMutation>(queryUrl, RefreshTokenDocument, { input });
};

// AUTH REQUIRED
export const UseUserByEmailQuery = async (email: string, headers: {}) => {
  return await request<UserByEmailQuery>(queryUrl, UserByEmailDocument, { email }, headers);
};

//# Transactions
export const UseAddOrUpdateTransactionMutation = async (input: AddOrUpdateTransactionInput & GqlHeaders) => {
  return await request<AddOrUpdateTransactionMutation>(
    queryUrl,
    AddOrUpdateTransactionDocument,
    { input },
    input.headers
  );
};

export const UseDeleteTransactionMutation = async (input: DeleteTransactionInput & GqlHeaders) => {
  return await request<DeleteTransactionMutation>(
    queryUrl,
    DeleteTransactionDocument,
    {
      input: {
        userEmail: input.userEmail,
        selectedAccountId: input.selectedAccountId,
        transactionId: input.transactionId,
      },
    },
    input.headers
  );
};

export const UseDeleteTransactionListMutation = async (input: DeleteTransactionListInput & GqlHeaders) => {
  return await request<DeleteTransactionListMutation>(
    queryUrl,
    DeleteTransactionListDocument,
    {
      input: {
        userEmail: input.userEmail,
        selectedAccountId: input.selectedAccountId,
        transactionIds: input.transactionIds,
      },
    },
    input.headers
  );
};

export const UseTransactionsFilteredQuery = async (input: FilterTransactionListInput & GqlHeaders) => {
  return await request<User>(
    queryUrl,
    UserTransactionsFilteredDocument,
    {
      input: {
        selectedAccountId: input.selectedAccountId,
        transactionFilters: input.transactionFilters,
        userEmail: input.userEmail,
      },
    },
    input.headers
  );
};

// #Categories
export const UseAddCategoryMutation = async (input: AddCategoryInput & GqlHeaders) => {
  return await request<AddCategoryMutation>(
    queryUrl,
    AddCategoryDocument,
    {
      input: {
        name: input.name,
        operationType: input.operationType,
        selectedAccountId: input.selectedAccountId,
        subcategoriesNames: input.subcategoriesNames,
        userEmail: input.userEmail,
      },
    },
    input.headers
  );
};

export const UseAddSubCategoryMutation = async (input: AddSubCategoryInput & GqlHeaders) => {
  return await request<AddSubCategoryMutation>(
    queryUrl,
    AddSubCategoryDocument,
    {
      input: {
        categoryId: input.categoryId,
        selectedAccountId: input.selectedAccountId,
        subCategoryName: input.subCategoryName,
        userEmail: input.userEmail,
      },
    },
    input.headers
  );
};

export const UseEditSubCategoryMutation = async (input: EditSubCategoryInput & GqlHeaders) => {
  const res = await request<EditSubCategoryMutation>(
    queryUrl,
    EditSubCategoryDocument,
    {
      input: {
        userEmail: input.userEmail,
        categoryId: input.categoryId,
        subCategoryId: input.subCategoryId,
        selectedAccountId: input.selectedAccountId,
        subCategoryName: input.subCategoryName,
      },
    },
    input.headers
  );
  return res;
};

export const UseDeleteCategoryMutation = async (input: DeleteCategoryInput & GqlHeaders) => {
  return await request<DeleteCategoryMutation>(
    queryUrl,
    DeleteCategoryDocument,
    {
      input: {
        categoryId: input.categoryId,
        selectedAccountId: input.selectedAccountId,
        userEmail: input.userEmail,
      },
    },
    input.headers
  );
};

export const UseEditCategoryMutation = async (input: EditCategoryInput & GqlHeaders) => {
  return await request<EditCategoryMutation>(
    queryUrl,
    EditCategoryDocument,
    {
      input: {
        categoryId: input.categoryId,
        name: input.name,
        selectedAccountId: input.selectedAccountId,
        userEmail: input.userEmail,
      },
    },
    input.headers
  );
};
