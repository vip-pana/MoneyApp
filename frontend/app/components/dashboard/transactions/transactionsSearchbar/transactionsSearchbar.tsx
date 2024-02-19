"use client";

import { Card, CardBody } from "@chakra-ui/react";
import TransactionsSearchbarForm from "./transactionsSearchbarForm";

const TransactionsSearchbar = () => {
  return (
    <Card>
      <CardBody>
        <TransactionsSearchbarForm />
      </CardBody>
    </Card>
  );
};

export default TransactionsSearchbar;
