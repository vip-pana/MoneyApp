"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/utils/zustand/userStore";

const TransactionCard = ({ isIncome }: { isIncome: boolean }) => {
  const { currency, expenseAmount, incomeAmount } = useUserStore();

  const getFormattedCurrency = (amount: number) => {
    if (currency != undefined)
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toString() }).format(amount);
  };
  return (
    <>
      <Card>
        <CardContent className="mt-5">
          <div className="flex flex-col items-start">
            <div className="text-lg font-medium mb-1">{isIncome ? "Income" : "Expenses"}</div>
            <div className="flex items-center">
              <div className="text-3xl font-semibold mr-3">
                {getFormattedCurrency(isIncome ? incomeAmount : expenseAmount)}
              </div>
              {isIncome ? (
                <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L11 6.414V15a1 1 0 11-2 0V6.414l-3.293 3.293a1 1 0 01-1.414-1.414l5-5A1 1 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 17a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L9 13.586V5a1 1 0 112 0v8.586l3.293-3.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Secondary text</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionCard;
