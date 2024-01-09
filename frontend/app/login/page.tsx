"use client";

import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Tooltip,
  VStack,
  Button,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Divider } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Logo } from "@/components/base/Logo";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const previousInputValue = useRef<string>();
  useEffect(() => {
    previousInputValue.current = email;
  }, [email]);

  const [password, setPassword] = useState<string>();
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOnEnter = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((e as React.MouseEvent<HTMLButtonElement>).button === 0) {
      console.log("hello");
    } else {
      if (e as React.KeyboardEvent<HTMLInputElement>) {
        if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
          console.log("bella");
        }
      }
    }
  };

  //
  //
  //
  //
  //
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  //
  //
  //
  //
  //

  return (
    <center>
      <Box mt={"15vh"}>
        <Logo></Logo>
      </Box>
      <VStack w="300px" mt="15vh" spacing={10}>
        <InputGroup>
          <Input
            placeholder="Mail"
            value={email || ""}
            type="email"
            onChange={handleInputEmail}
            onKeyDown={handleOnEnter}
            isRequired={true}
            focusBorderColor="black"
          />
          <InputRightElement>
            <IconButton
              aria-label="confirm email"
              variant={"ghost"}
              colorScheme="white"
              icon={<ArrowForwardIcon />}
              onClick={handleOnEnter}
            ></IconButton>
          </InputRightElement>
        </InputGroup>

        <InputGroup>
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputPassword}
            focusBorderColor="black"
          />
          <InputRightElement>
            <IconButton
              h="1.75rem"
              aria-label="confirm email"
              variant={"ghost"}
              colorScheme="white"
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>

        <Button w={"100%"} variant={"ghost"} mb={-5}>
          Login
        </Button>
        <Spacer />
        <HStack w={"100%"} mb={-5}>
          {/* 


 */}

          <Button
            variant={"ghost"}
            colorScheme="white"
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          >
            Sign Up
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            {overlay}
            <ModalOverlay />
            <ModalContent>
              <ModalHeader w={"100%"}>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="First Name"
                    focusBorderColor="black"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Last Name" focusBorderColor="black" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Mail</FormLabel>
                  <Input placeholder="Mail" focusBorderColor="black" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder="Password" focusBorderColor="black" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    placeholder="Confirm Password"
                    focusBorderColor="black"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Currency</FormLabel>
                  <Select placeholder="Currency" focusBorderColor="black">
                    <option value="option1">EUR €</option>
                    <option value="option2">USD $</option>
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant={"ghost"} mr={3}>
                  Sign Up
                </Button>
                {/* <Button
                  variant={"ghost"}
                  color="red"
                  colorScheme="white"
                  onClick={onClose}
                >
                  Cancel
                </Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* 


 */}

          <Spacer />
          <Text>
            <Tooltip
              hasArrow
              label="Please, first insert email."
              aria-label="insert first email tooltip"
              placement="top"
            >
              Forgot password ?
            </Tooltip>
          </Text>
        </HStack>
        <Divider orientation="horizontal" />
        <HStack w={"90%"}>
          <IconButton
            variant="outline"
            aria-label="Apple authentication"
            fontSize="33px"
            isRound
            size={"lg"}
            icon={<FaApple />}
          />
          <Spacer />
          <IconButton
            variant="outline"
            aria-label="Google authentication"
            fontSize="35px"
            size={"lg"}
            isRound
            icon={<FcGoogle />}
          />
        </HStack>
      </VStack>
    </center>
  );
};

export default Login;
