import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";

export const SignUpModal = (props: {
  onClose: () => void;
  isOpen: boolean;
  overlay: React.JSX.Element;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
}) => {
  const [password, setPassword] = useState<string>();
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState<string>();
  const handleInputConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={props.initialRef}
        finalFocusRef={props.finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        isCentered
      >
        {props.overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={5}>
              <FormControl>
                <Input
                  ref={props.initialRef}
                  placeholder="First Name"
                  focusBorderColor="black"
                />
              </FormControl>

              <FormControl>
                <Input placeholder="Last Name" focusBorderColor="black" />
              </FormControl>

              <FormControl>
                <Input
                  placeholder="Mail"
                  type="mail"
                  focusBorderColor="black"
                />
              </FormControl>

              <FormControl>
                <PasswordInput handleInputPassword={handleInputPassword} />
                <FormHelperText fontSize={10}>
                  Must have 8 characters, one uppercase and one lowercase
                  letter, and one number.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <PasswordInput
                  handleInputPassword={handleInputConfirmPassword}
                />
              </FormControl>

              <FormControl>
                <Select placeholder="Currency" focusBorderColor="black">
                  <option value="option1">EUR €</option>
                  <option value="option2">USD $</option>
                </Select>
              </FormControl>
              <Button colorScheme="gray">Gray</Button>
            </Stack>
          </ModalBody>

          {/* <ModalFooter>
            <Button variant={"ghost"} mr={3}>
            Sign Up
            </Button>
            
        </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
