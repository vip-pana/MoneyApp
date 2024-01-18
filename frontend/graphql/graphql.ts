/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  categories: Array<Category>;
  currency: Currency;
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subUsers: Array<User>;
  transactions: Array<Transaction>;
};

export type AccountInput = {
  categories: Array<CategoryInput>;
  currency: Currency;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subUsers: Array<UserInput>;
  transactions: Array<TransactionInput>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subcategories?: Maybe<Array<Category>>;
  type: OperationType;
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subcategories?: InputMaybe<Array<CategoryInput>>;
  type: OperationType;
};

export enum Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  login?: Maybe<Scalars['String']['output']>;
  removeProduct: Scalars['Boolean']['output'];
  signup?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationLoginArgs = {
  user: UserInput;
};


export type MutationRemoveProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  currency: Currency;
  user: UserInput;
};

export enum OperationType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type Product = {
  __typename?: 'Product';
  category: ProductCategory;
  categoryId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  quantity: Scalars['Int']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  description: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
};

export type ProductInput = {
  categoryId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  quantity: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  productById: Product;
  products: Array<Product>;
  users: Array<User>;
};


export type QueryProductByIdArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreate: Product;
  onRemove: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  category: Category;
  currency: Currency;
  dateTime: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: OperationType;
  value: Scalars['Float']['output'];
};

export type TransactionInput = {
  category: CategoryInput;
  currency: Currency;
  dateTime: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: OperationType;
  value: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  accounts?: Maybe<Array<Account>>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  surname?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  accounts?: InputMaybe<Array<AccountInput>>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name?: string | null, surname?: string | null }> };


export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;