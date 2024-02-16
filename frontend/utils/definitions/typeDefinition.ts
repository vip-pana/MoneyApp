// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";

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
  id: string | null | undefined;
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

export type TransactionsSearchValueDefinition = {
  dateRangeOption: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  selectedCategories: UserCategory[];
  currencies: string[];
};

export type GetUserByEmailQueryValueDefinition = {
  email: string;
  setName: (value: string) => void;
  setSurname: (value: string) => void;
  setEmail: (value: string) => void;
  setCurrency: (value: Currency) => void;
  setIncomeCategories: (categories: UserCategory[]) => void;
  setExpenseCategories: (categories: UserCategory[]) => void;
  setIncomeAmount: (value: number) => void;
  setExpenseAmount: (value: number) => void;
  setTransactions: (value: TransactionInput[]) => void;
  setSelectedAccountId: (value: string) => void;
};

export type SignupQueryValueDefinition = {
  name: string;
  surname: string;
  email: string;
  password: string;
  currency: string;
};

export type LoginQueryValueDefinition = {
  email: string;
  password: string;
};

export type TransactionQueryValueDefinition = {
  email: string;
  transactionId: string;
  accountId: string;
  transaction?: TransactionModalFormValueDefinition;
};
