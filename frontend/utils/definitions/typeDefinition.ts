// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

import { CategoryInput, Currency, OperationType, Transaction } from "@/gql/generated/graphql";

interface GqlHeaders {
  headers: {};
}

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

export type TransactionModalFormValueDefinition = {
  amount: number | string;
  currency: Currency;
  operationType: OperationType;
  description: string;
  date: Date | string;
  category: CategoryInput;
} & GqlHeaders;

export type TransactionsSearchValueDefinition = {
  dateRangeOption: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  selectedCategoriesIds: string[];
  currencies: Currency[];
  operationTypes: OperationType[];
} & GqlHeaders;

export type GetUserByEmailQueryValueDefinition = {
  email: string;
} & GqlHeaders;

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
  transactionId: string | undefined;
  accountId: string;
  transaction?: TransactionModalFormValueDefinition;
} & GqlHeaders;

export type TransactionListQueryValueDefinition = {
  email: string;
  transactionIds: string[]; // only for deleteTransactionList
  accountId: string;
} & GqlHeaders;

export type TransactionsSearchQueryValueDefinition = {
  email: string;
  accountId: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  categoriesIds: string[];
  currencies: string[];
} & GqlHeaders;

export type TransactionModalProps = {
  selectedTransaction?: Transaction;
};
