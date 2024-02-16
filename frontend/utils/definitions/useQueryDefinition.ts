// // for convention all methods created in this file will have at the start of the name the phrase "use" and on the end "Query"
// // that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// // here you have to insert only the request but the call are to do on the component

import request from "graphql-request";
import { queryUrl } from "../queryUrl";
import {
  AddOrUpdateTransactionDocument,
  AddOrUpdateTransactionMutation,
  DeleteTransactionDocument,
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
} from "@/gql/generated/graphql";
import {
  GetUserByEmailQueryValueDefinition,
  LoginQueryValueDefinition,
  SignupQueryValueDefinition,
  TransactionModalFormValueDefinition,
  TransactionQueryValueDefinition,
} from "./typeDefinition";

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

export const useSignupQuery = async ({ name, surname, email, password, currency }: SignupQueryValueDefinition) => {
  const res = await request<SignupMutation>(queryUrl, SignupDocument, {
    user: {
      name: name,
      surname: surname,
      email: email,
      password: password,
      currency: currency,
    },
  });
  return res;
};

export const useUserByEmailQuery = async ({
  email,
  setName,
  setSurname,
  setEmail,
  setCurrency,
  setIncomeCategories,
  setExpenseCategories,
  setIncomeAmount,
  setExpenseAmount,
  setTransactions,
  setSelectedAccountId,
}: GetUserByEmailQueryValueDefinition) => {
  const res = await request<UserByEmailQuery>(queryUrl, UserByEmailDocument, {
    email: email,
  });
  setName(res.userByEmail.name);
  setSurname(res.userByEmail.surname);
  setEmail(res.userByEmail.email);

  if (res.userByEmail.accounts) {
    if (res.userByEmail.accounts[0].id) setSelectedAccountId(res.userByEmail.accounts[0].id);
    setCurrency(res.userByEmail.accounts[0].currency);
    setIncomeAmount(res.userByEmail.accounts[0].incomeAmount);
    setExpenseAmount(res.userByEmail.accounts[0].expenseAmount);
    setTransactions(res.userByEmail.accounts[0].transactions);

    let incomeCategories = res.userByEmail.accounts[0].categories.filter(
      (category) => category.categoryType === OperationType.Income
    );
    setIncomeCategories(incomeCategories);
    setExpenseCategories(
      res.userByEmail.accounts[0].categories.filter((category) => category.categoryType === OperationType.Expense)
  }

  return res;
};

export const useAddTransactionQuery = async ({
  email,
  transaction,
  accountId: accountId,
}: {
  email: string;
  transaction: TransactionModalFormValueDefinition;
  accountId: string;
}) => {
  const res = await request<AddOrUpdateTransactionMutation>(queryUrl, AddOrUpdateTransactionDocument, {
    transactionInput: {
      userEmail: email,
      accountId: accountId,
      transaction: {
        amount: parseFloat(transaction.amount.toString()),
        currency: transaction.currency,
        transactionType: transaction.operationType,
        description: transaction.description,
        dateTime: transaction.date,
        category: {
          name: transaction.selectedCategory,
          categoryType: transaction.operationType,
        },
      },
    },
  });
  return res;
};

export const useDeleteTransactionQuery = async ({
  email,
  transactionId,
  accountId,
}: 
  TransactionQueryValueDefinition
) => {
  const res = await request<DeleteTransactionMutation>(queryUrl, DeleteTransactionDocument, {
    transaction: {
      userEmail: email,
      accountId: accountId,
      transactionId: transactionId,
    },
  });
  return res;
};

export const useUpdateTransactionQuery = async ({
  email,
  transaction,
  accountId,
  transactionId,
}:   TransactionQueryValueDefinition) => {

  if (!transaction) throw new Error('Missing transaction');

  const res = await request<AddOrUpdateTransactionMutation>(queryUrl, AddOrUpdateTransactionDocument, {
    accountId: accountId,
    user: {
      email: email,
    },
    transaction: {
      id: transactionId,
      amount: parseFloat(transaction.amount.toString()),
      currency: transaction.currency,
      category: {
        name: transaction.selectedCategory,
        categoryType: transaction.operationType,
      },
      dateTime: transaction.date,
      description: transaction.description,
      transactionType: transaction.operationType,
    },
  });
  return res;
};
