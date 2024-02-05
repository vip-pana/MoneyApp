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
import React, { useEffect, useState } from "react";
import { LuTrash } from "react-icons/lu";
import DeleteTransactionDialog from "../../../base/deleteTransactionDialog";
import { OperationType, TransactionInput } from "@/gql/generated/graphql";

const TodayTransactionsPanel = () => {
  const { transactions } = useUserStore();
  const {
    isOpen: isOpenDeleteTransactionDialog,
    onOpen: onOpenDeleteTransactionDialog,
    onClose: onCloseDeleteTransactionDialog,
  } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInput>();
  const [todayTransactions, setTodayTransactions] = useState<TransactionInput[]>([]);
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    const tmp = today;
    tmp.setMinutes(tmp.getMinutes() + tmp.getTimezoneOffset());

    tmp.setUTCHours(0, 0, 0, 0);
    setToday(tmp);
    setTodayTransactions(transactions.filter(filterHours));
  }, []);

  const filterHours = (transaction: TransactionInput) => {
    const transactionDate = new Date(transaction.dateTime);
    transactionDate.setMinutes(transactionDate.getMinutes() + transactionDate.getTimezoneOffset());
    transactionDate.setUTCHours(0, 0, 0, 0);

    return transactionDate.getTime() === today.getTime();
  };
  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"200px"}>
        <Table variant={"striped"} size={"sm"}>
          <Thead>
            <Tr>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todayTransactions.map((transaction, index) => (
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
                <Td>
                  <HStack>
                    <IconButton
                      aria-label={"info"}
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
      <DeleteTransactionDialog
        isOpen={isOpenDeleteTransactionDialog}
        onClose={onCloseDeleteTransactionDialog}
        selectedTransaction={selectedTransaction}
      />
    </>
  );
};

export default TodayTransactionsPanel;
