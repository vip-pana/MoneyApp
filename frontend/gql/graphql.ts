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
};

export type Account = {
  __typename?: 'Account';
  categories: Array<Category>;
  currency: Currency;
  expenseAmount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  incomeAmount: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  subUsers: Array<User>;
  transactions: Array<Transaction>;
};

export type AddCategoryError = GenericError;

export type AddCategoryInput = {
  name: Scalars['String']['input'];
  operationType: OperationType;
  selectedAccountId: Scalars['String']['input'];
  subcategoriesNames: Array<Scalars['String']['input']>;
  userEmail: Scalars['String']['input'];
};

export type AddCategoryPayload = {
  __typename?: 'AddCategoryPayload';
  category?: Maybe<Array<Category>>;
  errors?: Maybe<Array<AddCategoryError>>;
  query: Query;
};

export type AddOrUpdateTransactionError = UserNotExistError;

export type AddOrUpdateTransactionInput = {
  selectedAccountId: Scalars['String']['input'];
  transaction: TransactionInput;
  userEmail: Scalars['String']['input'];
};

export type AddOrUpdateTransactionPayload = {
  __typename?: 'AddOrUpdateTransactionPayload';
  account?: Maybe<Account>;
  errors?: Maybe<Array<AddOrUpdateTransactionError>>;
  query: Query;
};

export type AddSubCategoryError = GenericError;

export type AddSubCategoryInput = {
  categoryId: Scalars['String']['input'];
  selectedAccountId: Scalars['String']['input'];
  subCategoryName: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type AddSubCategoryPayload = {
  __typename?: 'AddSubCategoryPayload';
  category?: Maybe<Array<Category>>;
  errors?: Maybe<Array<AddSubCategoryError>>;
  query: Query;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Category = {
  __typename?: 'Category';
  categoryType: OperationType;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<SubCategory>;
};

export type CategoryInput = {
  categoryType: OperationType;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subCategories?: InputMaybe<Array<SubCategoryInput>>;
};

export enum Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

export type DeleteCategoryError = GenericError;

export type DeleteCategoryInput = {
  categoryId: Scalars['String']['input'];
  selectedAccountId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  errors?: Maybe<Array<DeleteCategoryError>>;
  query: Query;
  user?: Maybe<User>;
};

export type DeleteSubCategoryError = GenericError;

export type DeleteSubCategoryInput = {
  categoryId: Scalars['String']['input'];
  selectedAccountId: Scalars['String']['input'];
  subCategoryId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type DeleteSubCategoryPayload = {
  __typename?: 'DeleteSubCategoryPayload';
  errors?: Maybe<Array<DeleteSubCategoryError>>;
  query: Query;
  user?: Maybe<User>;
};

export type DeleteTransactionError = FieldIdNotExistError | UserNotExistError;

export type DeleteTransactionInput = {
  selectedAccountId: Scalars['String']['input'];
  transactionId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type DeleteTransactionListError = UserNotExistError;

export type DeleteTransactionListInput = {
  selectedAccountId: Scalars['String']['input'];
  transactionIds: Array<Scalars['String']['input']>;
  userEmail: Scalars['String']['input'];
};

export type DeleteTransactionListPayload = {
  __typename?: 'DeleteTransactionListPayload';
  account?: Maybe<Account>;
  errors?: Maybe<Array<DeleteTransactionListError>>;
  query: Query;
};

export type DeleteTransactionPayload = {
  __typename?: 'DeleteTransactionPayload';
  account?: Maybe<Account>;
  errors?: Maybe<Array<DeleteTransactionError>>;
  query: Query;
};

export type EditCategoryError = GenericError;

export type EditCategoryInput = {
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  selectedAccountId: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type EditCategoryPayload = {
  __typename?: 'EditCategoryPayload';
  errors?: Maybe<Array<EditCategoryError>>;
  query: Query;
  user?: Maybe<User>;
};

export type EditSubCategoryError = GenericError;

export type EditSubCategoryInput = {
  categoryId: Scalars['String']['input'];
  selectedAccountId: Scalars['String']['input'];
  subCategoryId: Scalars['String']['input'];
  subCategoryName: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type EditSubCategoryPayload = {
  __typename?: 'EditSubCategoryPayload';
  errors?: Maybe<Array<EditSubCategoryError>>;
  query: Query;
  user?: Maybe<User>;
};

export type Error = {
  message: Scalars['String']['output'];
};

export type FieldIdNotExistError = Error & {
  __typename?: 'FieldIdNotExistError';
  message: Scalars['String']['output'];
};

export type FilterTransactionListInput = {
  selectedAccountId: Scalars['String']['input'];
  transactionFilters: TransactionFiltersInput;
  userEmail: Scalars['String']['input'];
};

export type GenericError = Error & {
  __typename?: 'GenericError';
  message: Scalars['String']['output'];
};

export type LoginError = GenericError | UserNotExistError | WrongPasswordError;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  errors?: Maybe<Array<LoginError>>;
  query: Query;
  tokenResponse?: Maybe<TokenResponse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: AddCategoryPayload;
  addOrUpdateTransaction: AddOrUpdateTransactionPayload;
  addSubCategory: AddSubCategoryPayload;
  deleteCategory: DeleteCategoryPayload;
  deleteSubCategory: DeleteSubCategoryPayload;
  deleteTransaction: DeleteTransactionPayload;
  deleteTransactionList: DeleteTransactionListPayload;
  editCategory: EditCategoryPayload;
  editSubCategory: EditSubCategoryPayload;
  login: LoginPayload;
  refreshToken: RefreshTokenPayload;
  signup: SignupPayload;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddOrUpdateTransactionArgs = {
  input: AddOrUpdateTransactionInput;
};


export type MutationAddSubCategoryArgs = {
  input: AddSubCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteSubCategoryArgs = {
  input: DeleteSubCategoryInput;
};


export type MutationDeleteTransactionArgs = {
  input: DeleteTransactionInput;
};


export type MutationDeleteTransactionListArgs = {
  input: DeleteTransactionListInput;
};


export type MutationEditCategoryArgs = {
  input: EditCategoryInput;
};


export type MutationEditSubCategoryArgs = {
  input: EditSubCategoryInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export enum OperationType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type Query = {
  __typename?: 'Query';
  userByEmail: User;
  userExistByEmail: Scalars['Boolean']['output'];
  userTransactionsFiltered: User;
  users: Array<User>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserExistByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserTransactionsFilteredArgs = {
  input: FilterTransactionListInput;
};

export type RefreshTokenError = GenericError;

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  errors?: Maybe<Array<RefreshTokenError>>;
  query: Query;
  tokenResponse?: Maybe<TokenResponse>;
};

export type SignupError = GenericError | UserAlreadyExistError;

export type SignupInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  selectedCurrency: Currency;
  surname: Scalars['String']['input'];
};

export type SignupPayload = {
  __typename?: 'SignupPayload';
  errors?: Maybe<Array<SignupError>>;
  query: Query;
  tokenResponse?: Maybe<TokenResponse>;
};

export type SubCategory = {
  __typename?: 'SubCategory';
  categoryType: OperationType;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SubCategoryInput = {
  categoryType: OperationType;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  category: Category;
  currency: Currency;
  dateTime: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  subCategory?: Maybe<SubCategory>;
  transactionType: OperationType;
};

export type TransactionFiltersInput = {
  categoriesIds?: InputMaybe<Array<Scalars['String']['input']>>;
  currencies?: InputMaybe<Array<Currency>>;
  dateEnd: Scalars['DateTime']['input'];
  dateStart: Scalars['DateTime']['input'];
  operationTypes?: InputMaybe<Array<OperationType>>;
};

export type TransactionInput = {
  amount: Scalars['Float']['input'];
  category: CategoryInput;
  currency: Currency;
  dateTime: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  selectedSubCategory?: InputMaybe<SubCategoryInput>;
  transactionType: OperationType;
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  surname: Scalars['String']['output'];
  tokenVersion: Scalars['Int']['output'];
};

export type UserAlreadyExistError = Error & {
  __typename?: 'UserAlreadyExistError';
  message: Scalars['String']['output'];
};

export type UserNotExistError = Error & {
  __typename?: 'UserNotExistError';
  message: Scalars['String']['output'];
};

export type WrongPasswordError = Error & {
  __typename?: 'WrongPasswordError';
  message: Scalars['String']['output'];
};

type ErrorFields_FieldIdNotExistError_Fragment = { __typename: 'FieldIdNotExistError', message: string } & { ' $fragmentName'?: 'ErrorFields_FieldIdNotExistError_Fragment' };

type ErrorFields_GenericError_Fragment = { __typename: 'GenericError', message: string } & { ' $fragmentName'?: 'ErrorFields_GenericError_Fragment' };

type ErrorFields_UserAlreadyExistError_Fragment = { __typename: 'UserAlreadyExistError', message: string } & { ' $fragmentName'?: 'ErrorFields_UserAlreadyExistError_Fragment' };

type ErrorFields_UserNotExistError_Fragment = { __typename: 'UserNotExistError', message: string } & { ' $fragmentName'?: 'ErrorFields_UserNotExistError_Fragment' };

type ErrorFields_WrongPasswordError_Fragment = { __typename: 'WrongPasswordError', message: string } & { ' $fragmentName'?: 'ErrorFields_WrongPasswordError_Fragment' };

export type ErrorFieldsFragment = ErrorFields_FieldIdNotExistError_Fragment | ErrorFields_GenericError_Fragment | ErrorFields_UserAlreadyExistError_Fragment | ErrorFields_UserNotExistError_Fragment | ErrorFields_WrongPasswordError_Fragment;

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } & { ' $fragmentName'?: 'CategoryFieldsFragment' };

export type SubcategoryFieldsFragment = { __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType } & { ' $fragmentName'?: 'SubcategoryFieldsFragment' };

export type TransactionFieldsFragment = { __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, category: (
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  ) } & { ' $fragmentName'?: 'TransactionFieldsFragment' };

export type AccountFieldsFragment = { __typename?: 'Account', currency: Currency, incomeAmount: number, expenseAmount: number, categories: Array<(
    { __typename?: 'Category' }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  )>, transactions: Array<(
    { __typename?: 'Transaction' }
    & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
  )> } & { ' $fragmentName'?: 'AccountFieldsFragment' };

export type AccountBaseDetailsFragment = { __typename?: 'Account', id: string, name: string, currency: Currency, incomeAmount: number, expenseAmount: number } & { ' $fragmentName'?: 'AccountBaseDetailsFragment' };

export type AddOrUpdateTransactionMutationVariables = Exact<{
  input: AddOrUpdateTransactionInput;
}>;


export type AddOrUpdateTransactionMutation = { __typename?: 'Mutation', addOrUpdateTransaction: { __typename?: 'AddOrUpdateTransactionPayload', account?: { __typename?: 'Account', currency: Currency, incomeAmount: number, expenseAmount: number, categories: Array<(
        { __typename?: 'Category' }
        & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
      )>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }> } | null, errors?: Array<(
      { __typename?: 'UserNotExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_UserNotExistError_Fragment': ErrorFields_UserNotExistError_Fragment } }
    )> | null } };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', name: string, surname: string, email: string, accounts: Array<{ __typename?: 'Account', id: string, name: string, currency: Currency, incomeAmount: number, expenseAmount: number, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }>, categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> }> }> } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenPayload', tokenResponse?: { __typename?: 'TokenResponse', accessToken?: string | null, refreshToken?: string | null } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type AddCategoryMutationVariables = Exact<{
  input: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'AddCategoryPayload', category?: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> }> | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type DeleteCategoryMutationVariables = Exact<{
  input: DeleteCategoryInput;
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'DeleteCategoryPayload', user?: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, description: string, transactionType: OperationType, currency: Currency, dateTime: any, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }>, categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> }> }> } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type EditCategoryMutationVariables = Exact<{
  input: EditCategoryInput;
}>;


export type EditCategoryMutation = { __typename?: 'Mutation', editCategory: { __typename?: 'EditCategoryPayload', user?: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, description: string, transactionType: OperationType, currency: Currency, dateTime: any, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }>, categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> }> }> } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type AddSubCategoryMutationVariables = Exact<{
  input: AddSubCategoryInput;
}>;


export type AddSubCategoryMutation = { __typename?: 'Mutation', addSubCategory: { __typename?: 'AddSubCategoryPayload', category?: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> }> | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type DeleteSubCategoryMutationVariables = Exact<{
  input: DeleteSubCategoryInput;
}>;


export type DeleteSubCategoryMutation = { __typename?: 'Mutation', deleteSubCategory: { __typename?: 'DeleteSubCategoryPayload', user?: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', name: string, categoryType: OperationType, id: string }> }>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }> }> } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type EditSubCategoryMutationVariables = Exact<{
  input: EditSubCategoryInput;
}>;


export type EditSubCategoryMutation = { __typename?: 'Mutation', editSubCategory: { __typename?: 'EditSubCategoryPayload', user?: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', name: string, categoryType: OperationType, id: string }> }>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }> }> } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    )> | null } };

export type DeleteTransactionMutationVariables = Exact<{
  input: DeleteTransactionInput;
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: { __typename?: 'DeleteTransactionPayload', account?: { __typename?: 'Account', currency: Currency, incomeAmount: number, expenseAmount: number, categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<(
          { __typename?: 'SubCategory' }
          & { ' $fragmentRefs'?: { 'SubcategoryFieldsFragment': SubcategoryFieldsFragment } }
        )> }>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }> } | null, errors?: Array<(
      { __typename?: 'FieldIdNotExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_FieldIdNotExistError_Fragment': ErrorFields_FieldIdNotExistError_Fragment } }
    ) | (
      { __typename?: 'UserNotExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_UserNotExistError_Fragment': ErrorFields_UserNotExistError_Fragment } }
    )> | null } };

export type DeleteTransactionListMutationVariables = Exact<{
  input: DeleteTransactionListInput;
}>;


export type DeleteTransactionListMutation = { __typename?: 'Mutation', deleteTransactionList: { __typename?: 'DeleteTransactionListPayload', account?: { __typename?: 'Account', currency: Currency, incomeAmount: number, expenseAmount: number, categories: Array<{ __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<(
          { __typename?: 'SubCategory' }
          & { ' $fragmentRefs'?: { 'SubcategoryFieldsFragment': SubcategoryFieldsFragment } }
        )> }>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, currency: Currency, dateTime: any, description: string, transactionType: OperationType, subCategory?: { __typename?: 'SubCategory', id: string, categoryType: OperationType, name: string } | null, category: { __typename?: 'Category', id: string, name: string, categoryType: OperationType, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryType: OperationType }> } }> } | null, errors?: Array<(
      { __typename?: 'UserNotExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_UserNotExistError_Fragment': ErrorFields_UserNotExistError_Fragment } }
    )> | null } };

export type UserTransactionsFilteredQueryVariables = Exact<{
  input: FilterTransactionListInput;
}>;


export type UserTransactionsFilteredQuery = { __typename?: 'Query', userTransactionsFiltered: { __typename?: 'User', accounts: Array<{ __typename?: 'Account', transactions: Array<(
        { __typename?: 'Transaction' }
        & { ' $fragmentRefs'?: { 'TransactionFieldsFragment': TransactionFieldsFragment } }
      )> }> } };

export type UserExistByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserExistByEmailQuery = { __typename?: 'Query', userExistByEmail: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', tokenResponse?: { __typename?: 'TokenResponse', accessToken?: string | null, refreshToken?: string | null } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    ) | (
      { __typename?: 'UserNotExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_UserNotExistError_Fragment': ErrorFields_UserNotExistError_Fragment } }
    ) | (
      { __typename?: 'WrongPasswordError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_WrongPasswordError_Fragment': ErrorFields_WrongPasswordError_Fragment } }
    )> | null } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupPayload', tokenResponse?: { __typename?: 'TokenResponse', accessToken?: string | null, refreshToken?: string | null } | null, errors?: Array<(
      { __typename?: 'GenericError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_GenericError_Fragment': ErrorFields_GenericError_Fragment } }
    ) | (
      { __typename?: 'UserAlreadyExistError' }
      & { ' $fragmentRefs'?: { 'ErrorFields_UserAlreadyExistError_Fragment': ErrorFields_UserAlreadyExistError_Fragment } }
    )> | null } };

export const ErrorFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<ErrorFieldsFragment, unknown>;
export const SubcategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"subcategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]} as unknown as DocumentNode<SubcategoryFieldsFragment, unknown>;
export const CategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]} as unknown as DocumentNode<CategoryFieldsFragment, unknown>;
export const TransactionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]} as unknown as DocumentNode<TransactionFieldsFragment, unknown>;
export const AccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"accountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryFields"}}]}}]}}]} as unknown as DocumentNode<AccountFieldsFragment, unknown>;
export const AccountBaseDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"accountBaseDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}}]}}]} as unknown as DocumentNode<AccountBaseDetailsFragment, unknown>;
export const AddOrUpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addOrUpdateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddOrUpdateTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrUpdateTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<AddOrUpdateTransactionMutation, AddOrUpdateTransactionMutationVariables>;
export const UserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserByEmailQuery, UserByEmailQueryVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const EditCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<EditCategoryMutation, EditCategoryMutationVariables>;
export const AddSubCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSubCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddSubCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSubCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<AddSubCategoryMutation, AddSubCategoryMutationVariables>;
export const DeleteSubCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSubCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSubCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>;
export const EditSubCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditSubCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditSubCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editSubCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<EditSubCategoryMutation, EditSubCategoryMutationVariables>;
export const DeleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"subcategoryFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"subcategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const DeleteTransactionListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTransactionList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTransactionListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransactionList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"subcategoryFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"subcategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DeleteTransactionListMutation, DeleteTransactionListMutationVariables>;
export const UserTransactionsFilteredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userTransactionsFiltered"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterTransactionListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userTransactionsFiltered"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transactionFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}},{"kind":"Field","name":{"kind":"Name","value":"subCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryType"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dateTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryFields"}}]}}]}}]} as unknown as DocumentNode<UserTransactionsFilteredQuery, UserTransactionsFilteredQueryVariables>;
export const UserExistByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userExistByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userExistByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<UserExistByEmailQuery, UserExistByEmailQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"errorFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"errorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;