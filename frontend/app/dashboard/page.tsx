"use client";

import { Box, Center, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import CardsStat from "../components/dashboard/cardsStat";
import { LuPlus } from "react-icons/lu";
import AddTransactionModal from "../components/dashboard/addTransactionModal/addTransactionModal";
import MainCard from "../components/dashboard/mainCard/mainCard";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center>
        <Heading size="md">My transactions</Heading>
      </Center>
      <CardsStat />
      <Box mt={"20px"}>
        <MainCard />
      </Box>
      <IconButton
        icon={<LuPlus />}
        position={"absolute"}
        size={"lg"}
        rounded="100%"
        bottom={"20px"}
        right={"20px"}
        aria-label="add transaction"
        onClick={onOpen}
      />
      <AddTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
