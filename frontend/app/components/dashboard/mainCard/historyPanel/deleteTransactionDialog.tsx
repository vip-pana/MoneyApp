import { graphql } from "@/gql/generated";
import { TransactionInput } from "@/gql/generated/graphql";
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
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const deleteTransactionQueryDocument = graphql(``);

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
              <Button colorScheme="red" onClick={onClose} ml={3}>
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
