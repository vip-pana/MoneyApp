"use client";

import { graphql } from "@/gql/generated";
import { TransactionInput } from "@/gql/generated/graphql";
import { useDeleteTransactionQuery } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialog,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const DeleteTransactionDialog = ({
  isOpen,
  onClose,
  selectedTransaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: TransactionInput | undefined;
}) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const deleteTransactionQueryDocument = graphql(`
    mutation deleteTransaction($user: UserInput!, $transaction: TransactionInput!, $accountId: String!) {
      deleteTransaction(user: $user, transaction: $transaction, accountId: $accountId) {
        accounts {
          incomeAmount
          expenseAmount
          transactions {
            id
            amount
            description
            dateTime
            currency
            description
            transactionType
            category {
              name
              categoryType
            }
          }
        }
      }
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      useDeleteTransactionQuery({
        email: email,
        transactionId: selectedTransaction?.id ?? "",
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast.error(error.name, {
        description: error.message,
      });
    } else {
      toast.success("Transaction deleted!");
      if (data?.deleteTransaction.accounts) {
        setTransactions(data?.deleteTransaction.accounts[0].transactions);
        setIncomeAmount(data.deleteTransaction.accounts[0].incomeAmount);
        setExpenseAmount(data.deleteTransaction.accounts[0].expenseAmount);
      }
      onClose();
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete Transaction</AlertDialogHeader>

          <AlertDialogBody>
            <Text>Amount: {selectedTransaction?.amount}</Text>
            <Text>Description: {selectedTransaction?.description}</Text>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={onSubmit} isLoading={isLoading} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;
