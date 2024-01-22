import { Logo } from "@/app/ui/login/Logo";
import { Box, Center, VStack } from "@chakra-ui/react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Center>
        <Box mt={"18vh"}>
          <Logo />
        </Box>
      </Center>
      <Center>
        <VStack mt={"20"}>{children}</VStack>
      </Center>
    </>
  );
};

export default layout;
