import request from "graphql-request";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { queryUrl } from "../queryUrl";
import { LoginDocument, LoginMutation, UserExistByEmailDocument, UserExistByEmailQuery } from "@/gql/generated/graphql";

// // for convention all methods created in this file will have at the start of the name the phrase "use" and on the end "Query"
// // that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// // here you have to insert only the request but the call are to do on the component

export const useCheckEmailExistQuery = async (
  emailFormValue: string,
  setEmailExist: Dispatch<SetStateAction<boolean>>,
  setEmailLoginFormValue: UseFormSetValue<LoginValueDefinition>
) => {
  const emailExist = request<UserExistByEmailQuery>(queryUrl, UserExistByEmailDocument, {
    email: emailFormValue,
  });
  if ((await emailExist).userExistByEmail) {
    setEmailExist(true);
    setEmailLoginFormValue("email", emailFormValue);
  } else {
  }
  return emailExist;
};

export const UseLoginQuery = async ({ email, password }: { email: string; password: string }) => {
  const token = await request<LoginMutation>(queryUrl, LoginDocument, {
    user: {
      email: email,
      password: password,
    },
  });
  if (token.login != undefined && token.login != null) {
    localStorage.setItem("token", token.login);
  }
  return token;
};
