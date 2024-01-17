"use client";

import {
  HStack,
  Button,
  Spacer,
  Tooltip,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { SignUpModal } from "./SignUpModal";

export const SecondsActions = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.100"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <HStack w={"100%"} mt={"50"} mb={"-10"} spacing={20}>
        <Button
          variant={"ghost"}
          colorScheme="white"
          size="sm"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
          Sign Up
        </Button>

        <Spacer />
        <Button variant={"ghost"} colorScheme="white" size="sm">
          <Tooltip
            hasArrow
            label="Please, first insert email."
            aria-label="insert first email tooltip"
            placement="top"
          >
            Forgot password?
          </Tooltip>
        </Button>
      </HStack>

      <SignUpModal
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        initialRef={initialRef}
        finalRef={finalRef}
      />
    </>
  );
};
