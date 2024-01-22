import request from "graphql-request";
import { queryUrl } from "../queryUrl";
import {
  checkEmailExistQueryDocument,
  getUsersQueryDocument,
} from "./queryDocumentDefinition";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

// for convention all methods created in this file will have at the start of the name the phrase "use" and on the end "Query"
// that's because all query have to use a query call, so they have to use the query method in queryDefinition.ts
// here you have to insert only the request but the call are to do on the component

export const useCheckEmailExistQuery = async (
  emailFormValue: string,
  setEmailExist: Dispatch<SetStateAction<boolean>>,
  setEmailLoginFormValue: UseFormSetValue<LoginValueDefinition>
) => {
  const emailExist = request(queryUrl, checkEmailExistQueryDocument, {
    email: emailFormValue,
  });
  if ((await emailExist).userExistByEmail) {
    setEmailExist(true);
    setEmailLoginFormValue("email", emailFormValue);
  } else {
  }
  return emailExist;
};

export const useGetUsersQuery = () => {
  return request(queryUrl, getUsersQueryDocument);
};

export const useLoginQuery = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // return request(
  //   queryUrl,
  //   loginQueryDocument
  //   //    ,{
  //   //   email: email,
  //   //   password: password,
  //   // }
  // );
};
