"use client";

import { Button, HStack, Spacer, Tooltip, useDisclosure } from "@chakra-ui/react";
import SignupModal from "./signUpModal";

const SecondActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack w={"100%"} mt={"50"} mb={"-10"} spacing={20}>
        <Button
          variant={"ghost"}
          colorScheme="white"
          size="sm"
          onClick={() => {
            onOpen();
          }}
        >
          Sign Up
        </Button>

        <Spacer />
        <Button variant={"ghost"} colorScheme="white" size="sm">
          <Tooltip hasArrow label="Please, first insert email." aria-label="insert first email tooltip" placement="top">
            Forgot password?
          </Tooltip>
        </Button>
      </HStack>
      <SignupModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SecondActions;
