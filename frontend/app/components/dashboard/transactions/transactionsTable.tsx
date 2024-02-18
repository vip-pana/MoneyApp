"use client";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Checkbox,
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
import React, { useEffect, useState } from "react";
import { LuFileEdit, LuTrash } from "react-icons/lu";
import DeleteTransactionDialog from "../../base/deleteTransactionDialog";
import { OperationType, TransactionInput } from "@/gql/generated/graphql";
import TransactionModal from "../../base/transactionModal/transactionModal";
import { format } from "date-fns";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";

const TransactionsTable = () => {
  const { transactions } = useUserStore();
  const { transactionsFiltered, setTransactionsFiltered, selectedTransactionList, setSelectedTransactionList } =
    useTransactionTableStore();
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

  const formatDate = (dateTime: string): string => {
    const date = new Date(dateTime);
    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate;
  };

  useEffect(() => {
    setTransactionsFiltered(transactions);
  }, []);

  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"300px"}>
        <Table variant={"striped"} size={"sm"}>
          <Thead>
            <Tr>
              <Th>Select</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionsFiltered.map((transaction, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    colorScheme="red"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTransactionList([...selectedTransactionList, transaction]);
                      } else {
                        setSelectedTransactionList(selectedTransactionList.filter((t) => t !== transaction));
                      }
                    }}
                  />
                </Td>
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
                <Td>{formatDate(transaction.dateTime)}</Td>
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
      <TransactionModal
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

export default TransactionsTable;
