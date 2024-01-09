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
          />
          <InputRightElement>
            <IconButton
              aria-label="confirm email"
              variant="ghost"
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
          />
          <InputRightElement>
            <IconButton
              h="1.75rem"
              aria-label="confirm email"
              variant="ghost"
              colorScheme="white"
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>

        <Button w={"100%"} variant={"outline"} mb={-5}>
          Login
        </Button>
        <Spacer />
        <HStack w={"100%"} mb={-5}>
          <Text>Sign Up</Text>
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
