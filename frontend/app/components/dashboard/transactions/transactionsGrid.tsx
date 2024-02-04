"use client";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  HStack,
  IconButton,
  Stat,
  StatArrow,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuFileEdit, LuTrash } from "react-icons/lu";
import DeleteTransactionDialog from "../../base/deleteTransactionDialog";
import { OperationType, TransactionInput } from "@/gql/generated/graphql";
import EditTransactionModal from "./editTransactionModal/editTransactionModal";

const TransactionsGrid = () => {
  const { transactions } = useUserStore();
  const {
    isOpen: isOpenDeleteTransactionDialog,
    onOpen: onOpenDeleteTransactionDialog,
    onClose: onCloseDeleteTransactionDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenEditTransactionModal,
    onOpen: onOpenEditTransactionModal,
    onClose: onCloseEditTransactionModal,
  } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInput>();

  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"400px"}>
        <Table variant={"striped"} size={"sm"}>
          <Thead>
            <Tr>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>
                  <Stat>
                    <Text>
                      <StatArrow
                        type={transaction.transactionType === OperationType.Income ? "increase" : "decrease"}
                      />
                      {transaction.amount} {transaction.currency}
                    </Text>
                  </Stat>
                </Td>
                <Td>{transaction.category?.name}</Td>
                <Td>{transaction.description}</Td>
                <Td>{transaction.dateTime}</Td>
                <Td>
                  <HStack>
                    <IconButton
                      aria-label={"info"}
                      icon={<LuFileEdit />}
                      isRound
                      colorScheme="blue"
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        onOpenEditTransactionModal();
                      }}
                    />
                    <IconButton
                      aria-label={"delete"}
                      icon={<LuTrash />}
                      isRound
                      variant={"outline"}
                      colorScheme="red"
                      size={"sm"}
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        onOpenDeleteTransactionDialog();
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <EditTransactionModal
        isOpen={isOpenEditTransactionModal}
        onClose={onCloseEditTransactionModal}
        selectedTransaction={selectedTransaction}
      />
      <DeleteTransactionDialog
        isOpen={isOpenDeleteTransactionDialog}
        onClose={onCloseDeleteTransactionDialog}
        selectedTransaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionsGrid;
