import { TransactionModalFormValueDefinition, TransactionModalProps } from "@/utils/definitions/typeDefinition";
import { formAddOrUpdateTransactionModalValidation } from "@/utils/definitions/typeValidation";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TransactionModalForm from "./transactionModalForm";

const TransactionModal = ({ isOpen, onClose, selectedTransaction }: TransactionModalProps) => {
  const form = useForm<TransactionModalFormValueDefinition>({
    resolver: zodResolver(formAddOrUpdateTransactionModalValidation),
  });
  const { clearErrors } = form;

  const clearErrorsAndClose = () => {
    clearErrors();
    return onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={clearErrorsAndClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedTransaction == null || selectedTransaction == undefined ? "Add transaction" : "Edit transaction"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TransactionModalForm
            clearErrorsAndClose={clearErrorsAndClose}
            form={form}
            selectedTransaction={selectedTransaction}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
