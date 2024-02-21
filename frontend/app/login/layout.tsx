import { Box, Center, VStack } from "@chakra-ui/react";
import Logo from "../ui/login/Logo";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Center>
        <Box mt={"20vh"}>
          <Logo />
        </Box>
      </Center>
      <Center>
        <VStack mt={"15vh"}>{children}</VStack>
      </Center>
    </>
  );
};

export default LoginLayout;
