// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

import { SignupInput, TransactionFiltersInput } from "@/gql/generated/graphql";

export interface GqlHeaders {
  headers: {};
}

export type Dropdown = {
  value: any;
  label: string;
};

export type SignUpValueDefinition = SignupInput & {
  confirmPassword: string;
};

export type TransactionsSearchValueDefinition = TransactionFiltersInput & {
  dateRangeOption: string;
};

// Queries types
