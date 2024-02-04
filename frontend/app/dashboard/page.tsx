"use client";

import { Box, Center, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import CardsStat from "../components/dashboard/cardsStat";
import MainCard from "../components/dashboard/mainCard/mainCard";

const Dashboard = () => {
  return (
    <>
      <Center>
        <Heading size="md">My transactions</Heading>
      </Center>
      <CardsStat />
      <Box mt={"20px"}>
        <MainCard />
      </Box>
    </>
  );
};

export default Dashboard;
