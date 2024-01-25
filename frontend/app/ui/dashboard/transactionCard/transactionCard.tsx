import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Text } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import React from "react";

const TransactionCard = ({ isIncome }: { isIncome: boolean }) => {
  return (
    <Card>
      <CardHeader>
        <Heading
          textAlign={"center"}
          color={isIncome ? "green.400" : "red.400"}
        >
          {isIncome ? "+" : "-"} 000 EUR
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size={"md"} textAlign={"center"}>
          {isIncome ? "Income" : "Expense"}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default TransactionCard;
