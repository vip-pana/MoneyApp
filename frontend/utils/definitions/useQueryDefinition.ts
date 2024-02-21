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
  DeleteTransactionListMutation,
  DeleteTransactionMutation,
  LoginDocument,
  LoginMutation,
  OperationType,
  SignupDocument,
  SignupMutation,
  UserByEmailDocument,
  UserByEmailQuery,
  UserExistByEmailDocument,
  UserExistByEmailQuery,
  UserTransactionsFilteredDocument,
  UserTransactionsFilteredQuery,
} from "@/gql/generated/graphql";
import {
  GetUserByEmailQueryValueDefinition,
  LoginQueryValueDefinition,
  SignupQueryValueDefinition,
  TransactionListQueryValueDefinition,
  TransactionQueryValueDefinition,
  TransactionsSearchQueryValueDefinition,
} from "./typeDefinition";

const headers = {
  Authorization: `Bearer ${sessionStorage?.getItem("token")}`,
};

export const useCheckEmailExistQuery = async (emailFormValue: string) => {
  const res = request<UserExistByEmailQuery>(queryUrl, UserExistByEmailDocument, {
    email: emailFormValue,
  });
  return res;
};

export const useLoginQuery = async ({ email, password }: LoginQueryValueDefinition) => {
  const res = await request<LoginMutation>(queryUrl, LoginDocument, {
    user: {
      email: email,
      password: password,
    },
  });
  return res;
};

export const useSignupQuery = async (props: SignupQueryValueDefinition) => {
  const res = await request<SignupMutation>(queryUrl, SignupDocument, {
    user: {
      name: props.name,
      surname: props.surname,
      email: props.email,
      password: props.password,
      selectedCurrency: props.selectedCurrency,
    },
  });
  return res;
};

export const UseUserByEmailQuery = async (props: GetUserByEmailQueryValueDefinition) => {
  const res = await request<UserByEmailQuery>(
    queryUrl,
    UserByEmailDocument,
    {
      email: props.email,
    },
    headers
  );
  props.setName(res.userByEmail.name);
  props.setSurname(res.userByEmail.surname);
  props.setEmail(res.userByEmail.email);

  if (res.userByEmail.accounts) {
    if (res.userByEmail.accounts[0].id) props.setSelectedAccountId(res.userByEmail.accounts[0].id);
    props.setCurrency(res.userByEmail.accounts[0].currency);
    props.setIncomeAmount(res.userByEmail.accounts[0].incomeAmount);
    props.setExpenseAmount(res.userByEmail.accounts[0].expenseAmount);
    props.setTransactions(res.userByEmail.accounts[0].transactions);

    const incomeCategories = res.userByEmail.accounts[0].categories
      .filter((category) => category.categoryType === OperationType.Income)
      .map((category) => ({
        id: category.id,
        name: category.name,
        categoryType: category.categoryType,
        subCategories: category.subCategories || [],
      }));
    props.setIncomeCategories(incomeCategories);

    const expenseCategories = res.userByEmail.accounts[0].categories
      .filter((category) => category.categoryType === OperationType.Expense)
      .map((category) => ({
        id: category.id,
        name: category.name,
        categoryType: category.categoryType,
        subCategories: category.subCategories || [],
      }));
    props.setExpenseCategories(expenseCategories);
  }

  return res;
};

export const useAddOrUpdateTransactionQuery = async (props: TransactionQueryValueDefinition) => {
  if (!props.transaction) throw new Error("Missing transaction");

  const res = await request<AddOrUpdateTransactionMutation>(
    queryUrl,
    AddOrUpdateTransactionDocument,
    {
      transactionInput: {
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
    headers
  );
  return res;
};

export const useDeleteTransactionQuery = async (props: TransactionQueryValueDefinition) => {
  const res = await request<DeleteTransactionMutation>(
    queryUrl,
    DeleteTransactionDocument,
    {
      transaction: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionId: props.transactionId,
      },
    },
    headers
  );
  return res;
};

export const useDeleteTransactionListQuery = async (props: TransactionListQueryValueDefinition) => {
  const res = await request<DeleteTransactionListMutation>(
    queryUrl,
    DeleteTransactionListDocument,
    {
      transactions: {
        userEmail: props.email,
        accountId: props.accountId,
        transactionIds: props.transactionIds,
      },
    },
    headers
  );
  return res;
};

export const useTransactionsFilteredQuery = async (props: TransactionsSearchQueryValueDefinition) => {
  const res = await request<UserTransactionsFilteredQuery>(
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
    headers
  );
  return res;
};
