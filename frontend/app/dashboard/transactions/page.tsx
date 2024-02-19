import TransactionsSearchbar from "@/app/components/dashboard/transactions/transactionsSearchbar/transactionsSearchbar";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import TransactionsTable from "@/app/components/dashboard/transactions/transactionsTable";

const TransactionPage = () => {
  return (
    <>
      <TransactionsSearchbar />
      <Box mt={"20px"}>
        <Card>
          <CardBody>
            <TransactionsTable />
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default TransactionPage;
