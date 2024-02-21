"use client";

import { useUserStore } from "@/utils/zustand/userStore";
import { Card, CardBody, Stat, StatArrow, StatLabel, StatNumber } from "@chakra-ui/react";

const TransactionCard = ({ isIncome }: { isIncome: boolean }) => {
  const { currency, expenseAmount, incomeAmount } = useUserStore();

  return (
    <>
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>{isIncome ? "Income" : "Expenses"}</StatLabel>
            <StatNumber>
              <StatArrow type={isIncome ? "increase" : "decrease"} />
              {`${isIncome ? incomeAmount : expenseAmount} ${currency}`}
            </StatNumber>
          </Stat>
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionCard;
