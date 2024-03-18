"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/utils/zustand/userStore";
import { ArrowDown, ArrowUp } from "lucide-react";

const TransactionCard = ({ isIncome }: { isIncome: boolean }) => {
  const { currency, expenseAmount, incomeAmount } = useUserStore();

  const getFormattedCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toString() }).format(amount);
  };
  return (
    <Card>
      <CardContent className="mt-5">
        <div className="flex flex-col items-start">
          <div className="text-lg font-medium mb-1">{isIncome ? "Income" : "Expenses"}</div>
          <div className="flex items-center">
            <div className="text-3xl font-semibold mr-3">
              {getFormattedCurrency(isIncome ? incomeAmount : expenseAmount)}
            </div>
            {isIncome ? <ArrowUp className="text-teal-500" /> : <ArrowDown className="text-red-500" />}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Secondary text</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
