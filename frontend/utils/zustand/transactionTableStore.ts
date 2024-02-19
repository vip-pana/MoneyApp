import { TransactionInput } from "@/gql/generated/graphql";
import { create } from "zustand";

type TransactionTable = {
  transactionsFiltered: TransactionInput[];
  setTransactionsFiltered: (filtered: TransactionInput[]) => void;
  selectedTransactionList: TransactionInput[];
  setSelectedTransactionList: (filtered: TransactionInput[]) => void;
};

export const useTransactionTableStore = create<TransactionTable>((set) => ({
  transactionsFiltered: [],
  setTransactionsFiltered: (filtered: TransactionInput[]) => set((state) => ({ transactionsFiltered: filtered })),
  selectedTransactionList: [],
  setSelectedTransactionList: (selectedTransactions: TransactionInput[]) =>
    set((state) => ({ selectedTransactionList: selectedTransactions })),
}));
