import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import SignUpModalForm from "./signUpModalForm";

const SignupModal = ({ isOpen, onClose }: { onClose: () => void; isOpen: boolean }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SignUpModalForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
