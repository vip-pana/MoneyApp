import { Transaction } from "@/gql/graphql";
import { create } from "zustand";

type TransactionTable = {
  transactionsFiltered: Transaction[];
  setTransactionsFiltered: (filtered: Transaction[]) => void;
  selectedTransactionList: Transaction[];
  setSelectedTransactionList: (filtered: Transaction[]) => void;
};

export const useTransactionTableStore = create<TransactionTable>((set) => ({
  transactionsFiltered: [],
  setTransactionsFiltered: (filtered: Transaction[]) => set((state) => ({ transactionsFiltered: filtered })),
  selectedTransactionList: [],
  setSelectedTransactionList: (selectedTransactions: Transaction[]) =>
    set((state) => ({ selectedTransactionList: selectedTransactions })),
}));
