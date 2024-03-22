"use client";

import { Button } from "@/components/shadcnComponents/button";
import { OperationType } from "@/gql/graphql";
import { months } from "@/lib/utils/utils";
import { useCurrentDateStore } from "@/lib/zustand/currentMonthStore";
import { useUserStore } from "@/lib/zustand/userStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const MonthChange = () => {
  const { currentDate, setCurrentDate } = useCurrentDateStore();
  const { setExpenseAmount, setIncomeAmount, transactions } = useUserStore();
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const checkCanNextMonth = () => {
    return currentDate.getMonth() >= new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const setAmount = (operationType: OperationType): number => {
    const transactionsByMonth = transactions.filter((x) => new Date(x.dateTime).getMonth() == currentDate.getMonth());
    const amountTransactions = transactionsByMonth.filter((x) => x.transactionType == operationType);
    return amountTransactions.map((x) => x.amount).reduce((acc, value) => acc + value, 0);
  };

  useEffect(() => {
    setExpenseAmount(setAmount(OperationType.Expense));
    setIncomeAmount(setAmount(OperationType.Income));
  }, [currentDate, transactions]);

  return (
    <div className="flex items-center mt-2 gap-3">
      <Button variant={"ghost"} size={"icon"} onClick={previousMonth}>
        <ChevronLeft />
      </Button>
      <p className="leading-7">
        {monthName} {year}
      </p>
      <Button variant={"ghost"} size={"icon"} onClick={nextMonth} disabled={checkCanNextMonth()}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthChange;
