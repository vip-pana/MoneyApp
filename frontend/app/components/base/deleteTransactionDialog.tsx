"use client";

import { graphql } from "@/gql/generated";
import { TransactionModalProps } from "@/utils/definitions/typeDefinition";
import { useDeleteTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
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

const DeleteTransactionDialog = ({ isOpen, onClose, selectedTransaction }: TransactionModalProps) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const deleteTransactionQueryDocument = graphql(`
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
        transactionId: selectedTransaction.id,
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
      if (data?.deleteTransaction.user?.accounts) {
        setTransactions(data?.deleteTransaction.user?.accounts[0].transactions);
        setTransactionsFiltered(data?.deleteTransaction.user?.accounts[0].transactions);
        setIncomeAmount(data.deleteTransaction.user?.accounts[0].incomeAmount);
        setExpenseAmount(data.deleteTransaction.user?.accounts[0].expenseAmount);
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
            <Button onClick={onClose} variant={"outline"}>
              Cancel
            </Button>
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
