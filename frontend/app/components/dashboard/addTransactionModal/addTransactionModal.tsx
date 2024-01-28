import { Currency, OperationType } from "@/gql/generated/graphql";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  HStack,
  useRadioGroup,
  Center,
  Select,
  VStack,
} from "@chakra-ui/react";
import RadioOperationTypeElement from "./radioOperationTypeElement";

const AddTransactionModal = ({
  isOpen,
  onClose,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { currency } = useUserStore();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"15px"}>
              <FormControl>
                <Input type="number" placeholder={`0 ${currency}`} />
              </FormControl>
              <Center>
                <HStack {...group} spacing={"50px"}>
                  {(
                    Object.keys(OperationType) as Array<
                      keyof typeof OperationType
                    >
                  ).map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioOperationTypeElement
                        key={value}
                        {...radio}
                        isIncome={value === "Income"}
                      >
                        {value}
                      </RadioOperationTypeElement>
                    );
                  })}
                </HStack>
              </Center>
              <FormControl>
                <Select placeholder={currency}>
                  {(Object.keys(Currency) as Array<keyof typeof Currency>).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value.toUpperCase()}
                      </option>
                    )
                  )}
                </Select>
              </FormControl>
              <FormControl>
                <Input placeholder="Category" />
              </FormControl>
              <FormControl>
                <Input placeholder="Description" />
              </FormControl>
              <FormControl>
                <Input type="date" placeholder="Date" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
