import { Box, Center, HStack, Heading, IconButton } from "@chakra-ui/react";
import { IoChevronBack, IoChevronForwardSharp } from "react-icons/io5";
import TransactionCard from "../ui/dashboard/transactionCard/transactionCard";

const page = () => {
  return (
    <Box>
      <Center>
        <Heading as="h2" size="md">
          My transactions
        </Heading>
      </Center>

      <Center>
        <HStack mt={"10px"}>
          <IconButton
            aria-label="Previous month"
            icon={<IoChevronBack />}
            variant={"ghost"}
            size={"sm"}
            // onClick={() => setCollapse(!collapse)}
          />
          <Heading as="h3" size="sm">
            January
          </Heading>
          <IconButton
            aria-label="Previous month"
            icon={<IoChevronForwardSharp />}
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
    </Box>
  );
};

export default page;
