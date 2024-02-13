import { TransactionInput } from "@/gql/generated/graphql";
import { TransactionModalFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { formAddTransactionModalValidation } from "@/utils/definitions/typeValidation";
import { Modal, ModalOverlay, ModalContent, ModalHeader } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TransactionModalForm from "./transactionModalForm";

const TransactionModal = ({
  isOpen,
  onClose,
  selectedTransaction,
}: {
  onClose: () => void;
  isOpen: boolean;
  selectedTransaction?: TransactionInput | undefined;
}) => {
  const form = useForm<TransactionModalFormValueDefinition>({
    resolver: zodResolver(formAddTransactionModalValidation),
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
        <TransactionModalForm
          clearErrorsAndClose={clearErrorsAndClose}
          form={form}
          onClose={onClose}
          selectedTransaction={selectedTransaction}
        />
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
