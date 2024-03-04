import { CategoryInput, Currency, Transaction } from "@/gql/generated/graphql";
import { create } from "zustand";

type User = {
  emailExist: boolean;
  setEmailExist: (value: boolean) => void;

  email: string;
  setEmail: (value: string) => void;

  temporaryEmail: string;
  setTemporaryEmail: (value: string) => void;

  name: string;
  setName: (value: string) => void;

  surname: string;
  setSurname: (value: string) => void;

  currency: Currency;
  setCurrency: (value: Currency) => void;

  incomeAmount: number;
  setIncomeAmount: (value: number) => void;

  expenseAmount: number;
  setExpenseAmount: (value: number) => void;

  incomeCategories: CategoryInput[];
  setIncomeCategories: (categories: CategoryInput[]) => void;

  expenseCategories: CategoryInput[];
  setExpenseCategories: (categories: CategoryInput[]) => void;

  transactions: Transaction[];
  setTransactions: (value: Transaction[]) => void;

  selectedAccountId: string;
  setSelectedAccountId: (value: string) => void;
};

export const useUserStore = create<User>((set) => ({
  emailExist: false,
  setEmailExist: (value: boolean) => set((state) => ({ emailExist: value })),
  email: "",
  setEmail: (value: string) => set((state) => ({ email: value })),
  temporaryEmail: "",
  setTemporaryEmail: (value: string) => set((state) => ({ email: value })),
  name: "",
  setName: (value: string) => set((state) => ({ name: value })),
  surname: "",
  setSurname: (value: string) => set((state) => ({ surname: value })),
  currency: Currency.Eur,
  setCurrency: (value: Currency) => set((state) => ({ currency: value })),
  incomeAmount: 0,
  setIncomeAmount: (value: number) => set((state) => ({ incomeAmount: value })),
  expenseAmount: 0,
  setExpenseAmount: (value: number) => set((state) => ({ expenseAmount: value })),
  incomeCategories: [],
  setIncomeCategories: (categories: CategoryInput[]) => set((state) => ({ incomeCategories: categories })),
  expenseCategories: [],
  setExpenseCategories: (categories: CategoryInput[]) => set((state) => ({ expenseCategories: categories })),
  transactions: [],
  setTransactions: (values: Transaction[]) => set((state) => ({ transactions: values })),
  selectedAccountId: "",
  setSelectedAccountId: (value: string) => set((state) => ({ selectedAccountId: value })),
}));
