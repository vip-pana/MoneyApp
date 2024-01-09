import { HStack, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const ThirdPartAuthentications = () => {
  return (
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
  );
};
