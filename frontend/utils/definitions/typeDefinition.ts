// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

import { CategoryInput, Currency, OperationType, Transaction } from "@/gql/generated/graphql";

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
  currency: Currency;
};

export type TransactionDialogFormValueDefinition = {
  amount: number | string;
  currency: Currency;
  operationType: OperationType;
  description: string;
  date: Date | string;
  category: CategoryInput;
};

export type TransactionsSearchValueDefinition = {
  dateRangeOption: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  selectedCategoriesIds: string[];
  currencies: Currency[];
  operationTypes: OperationType[];
};

export type GetUserByEmailQueryValueDefinition = {
  email: string;
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
  accountId: string;
  transactionId: string | undefined;
  transaction?: TransactionDialogFormValueDefinition;
};

export type DeleteCategoryQueryValueDefinition = {
  email: string;
  accountId: string;
  categoryId: string;
};

export type AddCategoryFormValueDefinition = {
  email: string;
  accountId: string;
  name: string;
  operationType: OperationType;
  subcategoriesName: string[];
};

export type TransactionListQueryValueDefinition = {
  email: string;
  transactionIds: string[]; // only for deleteTransactionList
  accountId: string;
};

export type TransactionsSearchQueryValueDefinition = {
  email: string;
  accountId: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  categoriesIds: string[];
  currencies: string[];
};

export type TransactionModalProps = {
  selectedTransaction?: Transaction;
};
