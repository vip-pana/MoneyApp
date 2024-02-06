"use client";

import { Currency } from "@/gql/generated/graphql";
import { useUserStore } from "@/utils/zustand/userStore";
import { Card, CardBody, Skeleton, Stat, StatArrow, StatLabel, StatNumber } from "@chakra-ui/react";

const TransactionCard = ({ isIncome }: { isIncome: boolean }) => {
  const { currency, expenseAmount, incomeAmount } = useUserStore();

  return (
    <>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>{isIncome ? "Income" : "Expenses"}</StatLabel>
            <Skeleton isLoaded={currency != Currency.Undefined}>
              <StatNumber>
                <StatArrow type={isIncome ? "increase" : "decrease"} />
                {`${isIncome ? incomeAmount : expenseAmount} ${currency}`}
              </StatNumber>
            </Skeleton>
          </Stat>
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionCard;
