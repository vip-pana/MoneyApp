"use client";

import { IconButton, useDisclosure } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import TransactionModal from "../components/base/transactionModal/transactionModal";

const InsertOperationComponent = () => {
  const {
    isOpen: isOpenAddTransactionModal,
    onOpen: onOpenAddTransactionModal,
    onClose: onCloseAddTransactionModal,
  } = useDisclosure();
  return (
    <>
      <IconButton
        icon={<LuPlus />}
        position={"absolute"}
        size={"lg"}
        isRound
        bottom={"50px"}
        right={"50px"}
        aria-label="add transaction"
        onClick={onOpenAddTransactionModal}
      />
      <TransactionModal isOpen={isOpenAddTransactionModal} onClose={onCloseAddTransactionModal} />
    </>
  );
};

export default InsertOperationComponent;
