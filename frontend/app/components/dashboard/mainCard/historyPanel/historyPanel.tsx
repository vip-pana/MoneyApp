"use client";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  HStack,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuInfo, LuTrash } from "react-icons/lu";
import DeleteTransactionDialog from "./deleteTransactionDialog";
import { TransactionInput } from "@/gql/generated/graphql";

const HistoryPanel = () => {
  const { transactions } = useUserStore();
  const {
    isOpen: isOpenDeleteTransactionDialog,
    onOpen: onOpenDeleteTransactionDialog,
    onClose: onCloseDeleteTransactionDialog,
  } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInput>();
  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"200px"}>
        <Table variant={"striped"} size={"sm"}>
          <Thead>
            <Tr>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Datetime</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>
                  {transaction.amount} {transaction.currency}
                </Td>
                <Td>{transaction.category.name}</Td>
                <Td>{transaction.dateTime.split("T")[0] as string}</Td>
                <Td>
                  <HStack>
                    <IconButton aria-label={"info"} icon={<LuInfo />} isRound variant={"outline"} size={"sm"} />
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

export default HistoryPanel;
