"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { graphql } from "@/gql/generated";
import { Transaction } from "@/gql/generated/graphql";
import { UseDeleteTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteTransactionMutation = graphql(`
  mutation deleteTransaction($input: DeleteTransactionInput!) {
    deleteTransaction(input: $input) {
      account {
        currency
        incomeAmount
        expenseAmount
        categories {
          id
          name
          categoryType
          subCategories {
            ...subcategoryFields
          }
        }
        transactions {
          id
          amount
          currency
          dateTime
          description
          transactionType
          subCategory {
            id
            categoryType
            name
          }
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

const AlertDeleteTransactionDialog = ({
  selectedItem,
  children,
}: {
  selectedItem: Transaction;
  children: JSX.Element;
}) => {
  const { userEmail, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();
  const { headers } = useAccessTokenStore();

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      UseDeleteTransactionMutation({
        transactionId: selectedItem?.id,
        userEmail,
        selectedAccountId,
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
      setTransactions(data?.deleteTransaction.account.transactions);
      setTransactionsFiltered(data?.deleteTransaction.account.transactions);
      setIncomeAmount(data.deleteTransaction.account.incomeAmount);
      setExpenseAmount(data.deleteTransaction.account.expenseAmount);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Amount: {selectedItem?.amount} <br />
            Description: {selectedItem?.description} <br />
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
    </AlertDialog>
  );
};

export default AlertDeleteTransactionDialog;
