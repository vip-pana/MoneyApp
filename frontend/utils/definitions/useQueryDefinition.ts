// // for convention all methods created in this file will have at the start of the name the phrase "use" and on the end "Query"
// // that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// // here you have to insert only the request but the call are to do on the component

import { UseFormSetValue } from "react-hook-form";
import request from "graphql-request";
import { queryUrl } from "../queryUrl";
import {
  Currency,
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
import { LoginValueDefinition, UserCategory } from "./typeDefinition";

export const useCheckEmailExistQuery = async (
  emailFormValue: string,
  setEmailExist: (value: boolean) => void,
  setEmailLoginFormValue: UseFormSetValue<LoginValueDefinition>
) => {
  const res = request<UserExistByEmailQuery>(
    queryUrl,
    UserExistByEmailDocument,
    {
      email: emailFormValue,
    }
  );
  return res;
};

export const useLoginQuery = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await request<LoginMutation>(queryUrl, LoginDocument, {
    user: {
      email: email,
      password: password,
    },
  });
  return res;
};

export const useSignupQuery = async ({
  name,
  surname,
  email,
  password,
  currency,
}: {
  name: string;
  surname: string;
  email: string;
  password: string;
  currency: string;
}) => {
  // todo: capire come passare l'enum a graphql

  const res = await request<SignupMutation>(queryUrl, SignupDocument, {
    user: {
      name: name,
      surname: surname,
      email: email,
      password: password,
    },
    currency: currency,
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
}: {
  email: string;
  setName: (value: string) => void;
  setSurname: (value: string) => void;
  setEmail: (value: string) => void;
  setCurrency: (value: Currency) => void;
  setIncomeCategories: (categories: UserCategory[]) => void;
  setExpenseCategories: (categories: UserCategory[]) => void;
}) => {
  const res = await request<UserByEmailQuery>(queryUrl, UserByEmailDocument, {
    email: email,
  });
  setName(res.userByEmail.name ?? "");
  setSurname(res.userByEmail.surname ?? "");
  setEmail(res.userByEmail.email ?? "");
  if (res.userByEmail.accounts) {
    setCurrency(res.userByEmail.accounts[0].currency ?? Currency.Undefined);
    setIncomeCategories(
      res.userByEmail.accounts[0].categories.filter(
        (category) => category.type === OperationType.Income
      )
    );
    setExpenseCategories(
      res.userByEmail.accounts[0].categories.filter(
        (category) => category.type === OperationType.Expense
      )
    );
  }
  return res;
};
