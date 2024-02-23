import { graphql } from "@/gql/generated";
import { TransactionModalProps } from "@/utils/definitions/typeDefinition";
import { useDeleteTransactionListMutation } from "@/utils/definitions/useQueryDefinition";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Button,
  Text,
  ListItem,
  UnorderedList,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteTransactionListDialog = ({ isOpen, onClose, selectedTransactionList }: TransactionModalProps) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered, setSelectedTransactionList } = useTransactionTableStore();
  const [transactionIds, setTransactionIds] = useState<string[]>([]);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedTransactionList !== undefined)
      setTransactionIds(selectedTransactionList.map((transaction) => transaction.id));
  }, [selectedTransactionList]);

  const deleteTransactionListQueryDocument = graphql(`
    mutation deleteTransactionList($transactions: DeleteTransactionListInputTypeInput!) {
      deleteTransactionList(input: { transactions: $transactions }) {
        user {
          accounts {
            ...accountFields
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
      useDeleteTransactionListMutation({
        email: email,
        accountId: selectedAccountId,
        transactionIds: transactionIds,
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
      toast.success("Transactions deleted!");
      if (data?.user?.accounts) {
        setSelectedTransactionList([]);
        setTransactions(data?.user?.accounts[0].transactions);
        setTransactionsFiltered(data?.user?.accounts[0].transactions);
        setIncomeAmount(data.user?.accounts[0].incomeAmount);
        setExpenseAmount(data.user?.accounts[0].expenseAmount);
      }
      onClose();
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete transaction list</AlertDialogHeader>
        <AlertDialogBody>
          <Text as={"b"}>Delete this selected transactions?</Text>
          <UnorderedList>
            {selectedTransactionList?.map((option, index) => (
              <ListItem key={index}>
                {option.amount} {option.currency} - {option.category.name} - {option.description}
              </ListItem>
            ))}
          </UnorderedList>
          <Text>Are you sure? You can't undo this action afterwards.</Text>
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
    </AlertDialog>
  );
};

export default DeleteTransactionListDialog;
