import TodayTransactionsPanel from "@/app/components/dashboard/mainCard/todayTransactionsPanel/todayTransactionsPanel";
import MainCard from "@/app/components/dashboard/mainCard/mainCard";
import TransactionsSearchbar from "@/app/components/dashboard/transactions/transactionsSearchbar";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import TransactionsGrid from "@/app/components/dashboard/transactions/transactionsGrid";

const TransactionPage = () => {
  return (
    <>
      <TransactionsSearchbar />
      <Box mt={"20px"}>
        <Card>
          <CardBody>
            <TransactionsGrid />
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default TransactionPage;
