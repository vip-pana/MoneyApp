"use client";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { ThirdPartAuthentications } from "./../components/authentication/ThirdPartAuthentications";
import { SecondActions } from "./../components/login/secondsActions";
import { FormLogin } from "../components/login/formLogin";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/reactQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Login = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormLogin />
        <SecondActions />
        <Flex align="center" w={"100%"} mb={"-10"}>
          <Divider />
          <Text position="relative" padding="10">
            or
          </Text>
          <Divider />
        </Flex>
        <ThirdPartAuthentications />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Login;
