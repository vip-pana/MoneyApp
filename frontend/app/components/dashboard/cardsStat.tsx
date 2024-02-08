import { Box, Center, HStack, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import TransactionCard from "./transactionCard";

const CardsStat = () => {
  return (
    <>
      <Center>
        <HStack mt={"10px"}>
          <IconButton
            aria-label="Previous month"
            icon={<LuChevronLeft />}
            variant={"ghost"}
            size={"sm"}
          />
          <Heading as="h3" size="sm">
            January
          </Heading>
          <IconButton
            aria-label="Previous month"
            icon={<LuChevronRight />}
            variant={"ghost"}
            size={"sm"}
          />
        </HStack>
      </Center>
      <HStack mt={"20px"} spacing={"50px"} w="100%">
        <Box w={"100%"}>
          <TransactionCard isIncome={true} />
        </Box>
        <Box w={"100%"}>
          <TransactionCard isIncome={false} />
        </Box>
      </HStack>
    </>
  );
};

export default CardsStat;
