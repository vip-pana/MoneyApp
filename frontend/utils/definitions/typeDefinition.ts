// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

import { Currency, OperationType } from "@/gql/generated/graphql";

export type CheckMailValueDefinition = {
  email: string;
};

export type LoginValueDefinition = {
  email: string;
  password: string;
};

export type SignUpValueDefinition = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency: string;
};

export type UserCategory = {
  name: string;
  categoryType: string;
  subCategory?: UserCategory;
};

export type TransactionModalFormValueDefinition = {
  amount: number | string;
  operationType: OperationType;
  currency: Currency;
  selectedCategory: string;
  description: string;
  date: Date | string;
};
