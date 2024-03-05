import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { graphql } from "@/gql/generated";
import { OperationType, Transaction } from "@/gql/generated/graphql";
import { useDeleteTransactionListMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteTransactionListDialog = ({
  selectedTransactionList,
  children,
}: {
  selectedTransactionList: Transaction[];
  children: React.ReactNode;
}) => {
  const { email, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered, setSelectedTransactionList } = useTransactionTableStore();
  const [transactionIds, setTransactionIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedTransactionList !== undefined)
      setTransactionIds(selectedTransactionList.map((transaction) => transaction.id));
  }, [selectedTransactionList]);

  const deleteTransactionListMutation = graphql(`
    mutation deleteTransactionList($transactions: DeleteTransactionListInput!) {
      deleteTransactionList(transactions: $transactions) {
        user {
          accounts {
            ...accountFields
          }
        }
        errors {
          ...errorFields
        }
      }
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      useDeleteTransactionListMutation({
        email: email,
        accountId: selectedAccountId,
        transactionIds: transactionIds,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.errors) {
      manageApiCallErrors(error, data?.errors);
    }
    if (data && data.deleteTransactionList.user) {
      toast.success("Transactions deleted!");
      setSelectedTransactionList([]);
      setTransactions(data.deleteTransactionList.user.accounts[0].transactions);
      setTransactionsFiltered(data.deleteTransactionList.user.accounts[0].transactions);
      setIncomeAmount(data.deleteTransactionList.user.accounts[0].incomeAmount);
      setExpenseAmount(data.deleteTransactionList.user.accounts[0].expenseAmount);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete selected Transactions?</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedTransactionList?.map((option, index) => (
              <span key={index}>
                -{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: option.currency.toString(),
                }).format(option.amount)}{" "}
                -{" "}
                <span
                  className={` px-2 rounded-2xl text-white font-bold ${
                    option.transactionType === OperationType.Income ? "bg-teal-400" : "bg-red-400"
                  }`}
                >
                  {option.category.name}
                </span>
                - {option.description}
                <br />
              </span>
            ))}
            <br />
            Are you sure? You can't undo this action afterwards.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                <p>Please wait</p>
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionListDialog;
