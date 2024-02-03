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
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DeleteTransactionDialog = ({
  isOpen,
  onClose,
  selectedTransaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: TransactionInput | undefined;
}) => {
  const { email, selectedAccountId, setTransactions } = useUserStore();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const deleteTransactionQueryDocument = graphql(`
    mutation deleteTransaction($user: UserInput!, $transaction: TransactionInput!, $accountId: String!) {
      deleteTransaction(user: $user, transaction: $transaction, accountId: $accountId) {
        accounts {
          transactions {
            id
            amount
            description
            dateTime
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
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    } else {
      toast({
        title: "Transaction saved!",
        status: "success",
      });
      if (data?.deleteTransaction.accounts) {
        setTransactions(data?.deleteTransaction.accounts[0].transactions);
      }
      onClose();
    }
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>

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
    </>
  );
};

export default DeleteTransactionDialog;
