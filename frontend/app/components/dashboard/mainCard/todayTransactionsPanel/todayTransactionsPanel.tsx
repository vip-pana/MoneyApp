"use client";

import { useUserStore } from "@/utils/zustand/userStore";
import { Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DeleteTransactionDialog from "../../../base/deleteTransactionDialog";
import { Transaction } from "@/gql/generated/graphql";
import TransactionElement from "./transactionElement";

const TodayTransactionsPanel = () => {
  const { transactions } = useUserStore();
  const {
    isOpen: isOpenDeleteTransactionDialog,
    onOpen: onOpenDeleteTransactionDialog,
    onClose: onCloseDeleteTransactionDialog,
  } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
  const [todayTransactions, setTodayTransactions] = useState<Transaction[]>([]);
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    setTodayDate();
    setTodayTransactions(transactions.filter(filterHours));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTodayDate = () => {
    const tmp = today;
    tmp.setMinutes(tmp.getMinutes() + tmp.getTimezoneOffset());
    tmp.setUTCHours(0, 0, 0, 0);
    setToday(tmp);
  };

  const filterHours = (transaction: Transaction) => {
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
              <TransactionElement
                transaction={transaction}
                index={index}
                key={index}
                setSelectedTransaction={setSelectedTransaction}
                onOpenDeleteTransactionDialog={onOpenDeleteTransactionDialog}
              />
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
