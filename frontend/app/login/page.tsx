import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { Logo } from "@/components/base/Logo";
import { FormLogin } from "@/components/login/FormLogin";
import { ThirdPartAuthentications } from "@/components/authentication/ThirdPartAuthentications";
import { SecondActions } from "@/components/login/SecondsActions";

const Login = () => {
  return (
    <center>
      <Box mt={"18vh"}>
        <Logo />
      </Box>
      <VStack w="350px" mt={"20"}>
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
      </VStack>
    </center>
  );
};

export default Login;
