import { Box, Center, HStack } from "@chakra-ui/react";
import TransactionCard from "./transactionCard";
import MonthChange from "./monthChange";

const CardsStat = () => {
  return (
    <>
      <Center>
        <MonthChange />
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
