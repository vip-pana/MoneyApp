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
import { UseDeleteTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AlertDeleteTransactionDialog = ({ selectedTransaction }: TransactionModalProps) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();
  const { accessToken } = useAccessTokenStore();

  const deleteTransactionMutation = graphql(`
    mutation deleteTransaction($input: DeleteTransactionInput!) {
      deleteTransaction(input: $input) {
        account {
          incomeAmount
          expenseAmount
          transactions {
            id
            amount
            currency
            dateTime
            description
            transactionType
            category {
              id
              name
              categoryType
              subCategories {
                id
                name
                categoryType
              }
            }
          }
        }
        errors {
          ...errorFields
        }
      }
    }
  `);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      UseDeleteTransactionMutation({
        email: email,
        transactionId: selectedTransaction?.id,
        accountId: selectedAccountId,
        headers,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.deleteTransaction.errors) {
      manageApiCallErrors(error, data?.deleteTransaction.errors);
    } else if (data?.deleteTransaction.account) {
      toast.success("Transaction deleted!");
      setTransactions(data?.deleteTransaction?.account.transactions);
      setTransactionsFiltered(data?.deleteTransaction.account.transactions);
      setIncomeAmount(data.deleteTransaction.account.incomeAmount);
      setExpenseAmount(data.deleteTransaction.account.expenseAmount);
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
