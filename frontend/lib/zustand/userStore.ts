import { Category, Currency, OperationType, Transaction } from "@/gql/graphql";
import { create } from "zustand";

type User = {
  emailExist: boolean;
  setEmailExist: (value: boolean) => void;
  userEmail: string;
  setUserEmail: (value: string) => void;
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
  incomeCategories: Category[];
  setIncomeCategories: (categories: Category[]) => void;
  expenseCategories: Category[];
  setExpenseCategories: (categories: Category[]) => void;
  transactions: Transaction[];
  setTransactions: (value: Transaction[]) => void;
  selectedAccountId: string;
  setSelectedAccountId: (value: string) => void;
};

export const useUserStore = create<User>((set) => ({
  emailExist: false,
  setEmailExist: (value: boolean) => set(() => ({ emailExist: value })),
  userEmail: "",
  setUserEmail: (value: string) => set(() => ({ userEmail: value })),
  selectedAccountId: "",
  setSelectedAccountId: (value: string) => set(() => ({ selectedAccountId: value })),
  name: "",
  setName: (value: string) => set(() => ({ name: value })),
  surname: "",
  setSurname: (value: string) => set(() => ({ surname: value })),
  currency: Currency.Eur,
  setCurrency: (value: Currency) => set(() => ({ currency: value })),
  incomeAmount: 0,
  setIncomeAmount: (value: number) => set(() => ({ incomeAmount: value })),
  expenseAmount: 0,
  setExpenseAmount: (value: number) => set(() => ({ expenseAmount: value })),
  incomeCategories: [],
  setIncomeCategories: (categories: Category[]) =>
    set(() => {
      const incomeCategories = categories.filter((category) => category.categoryType === OperationType.Income);
      return { incomeCategories: incomeCategories };
    }),
  expenseCategories: [],
  setExpenseCategories: (categories: Category[]) =>
    set(() => {
      const expenseCategories = categories.filter((category) => category.categoryType === OperationType.Expense);
      return { expenseCategories: expenseCategories };
    }),
  transactions: [],
  setTransactions: (values: Transaction[]) => set(() => ({ transactions: values })),
}));
