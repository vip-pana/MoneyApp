"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { graphql } from "@/gql/generated";
import { TransactionModalProps } from "@/utils/definitions/typeDefinition";
import { useDeleteTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AlertDeleteTransactionDialog = ({ selectedTransaction }: TransactionModalProps) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();

  const deleteTransactionMutation = graphql(`
    mutation deleteTransaction($transaction: DeleteTransactionInputTypeInput!) {
      deleteTransaction(input: { transaction: $transaction }) {
        user {
          accounts {
            incomeAmount
            expenseAmount
            transactions {
              ...transactionFields
            }
          }
        }
        errors {
          ...errorFields
        }
      }
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      useDeleteTransactionMutation({
        email: email,
        transactionId: selectedTransaction?.id,
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.deleteTransaction.errors) {
      manageApiCallErrors(error, data?.deleteTransaction.errors);
    } else if (data?.deleteTransaction.user?.accounts) {
      toast.success("Transaction deleted!");
      setTransactions(data?.deleteTransaction?.user?.accounts[0]?.transactions);
      setTransactionsFiltered(data?.deleteTransaction.user.accounts[0].transactions);
      setIncomeAmount(data.deleteTransaction.user.accounts[0].incomeAmount);
      setExpenseAmount(data.deleteTransaction.user.accounts[0].expenseAmount);
    }
  };

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Amount: {selectedTransaction?.amount} <br />
            Description: {selectedTransaction?.description} <br />
            Are you sure? You can't undo this action afterwards.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isLoading} className="bg-red-400 ">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};

export default AlertDeleteTransactionDialog;
