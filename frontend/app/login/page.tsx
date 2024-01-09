"use client";

import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Divider } from "@chakra-ui/react";
import { Logo } from "@/components/base/Logo";
import { FormLogin } from "@/components/login/FormLogin";
import { ThirdPartAuthentications } from "@/components/authentication/ThirdPartAuthentications";
import { SecondsActions } from "@/components/login/SecondsActions";

const Login = () => {
  return (
    <center>
      <Box mt={"18vh"}>
        <Logo />
      </Box>
      <VStack w="350px" mt="10vh">
        <FormLogin />
        <SecondsActions />
        <Divider />
        <ThirdPartAuthentications />
      </VStack>
    </center>
  );
};

export default Login;
