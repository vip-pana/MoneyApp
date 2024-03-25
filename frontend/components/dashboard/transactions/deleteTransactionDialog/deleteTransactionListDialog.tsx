import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcnComponents/alert-dialog";
import { Button } from "@/components/shadcnComponents/button";
import { graphql } from "@/gql";
import { OperationType, Transaction } from "@/gql/graphql";
import { UseDeleteTransactionListMutation } from "@/lib/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";
import { useTransactionTableStore } from "@/lib/zustand/transactionTableStore";
import { useUserStore } from "@/lib/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const deleteTransactionListMutation = graphql(`
  mutation deleteTransactionList($input: DeleteTransactionListInput!) {
    deleteTransactionList(input: $input) {
      account {
        currency
        incomeAmount
        expenseAmount
        categories {
          id
          name
          categoryType
          subCategories {
            ...subcategoryFields
          }
        }
        transactions {
          id
          amount
          currency
          dateTime
          description
          transactionType
          subCategory {
            id
            categoryType
            name
          }
          category {
            id
            name
            categoryType
            subCategories {
              id
              name
              categoryType
            }
          }
        }
      }
      errors {
        ...errorFields
      }
    }
  }
`);

const DeleteTransactionListDialog = ({
  selectedTransactionList,
  children,
}: {
  selectedTransactionList: Transaction[];
  children: React.ReactNode;
}) => {
  const { userEmail, selectedAccountId, setTransactions, setExpenseAmount, setIncomeAmount } = useUserStore();
  const { setTransactionsFiltered, setSelectedTransactionList } = useTransactionTableStore();
  const { headers } = useAccessTokenStore();
  const [transactionIds, setTransactionIds] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedTransactionList !== undefined)
      setTransactionIds(selectedTransactionList.map((transaction) => transaction.id));
  }, [selectedTransactionList]);

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteTransaction"],
    queryFn: () =>
      UseDeleteTransactionListMutation({
        transactionIds: transactionIds,
        userEmail,
        selectedAccountId,
        headers,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.deleteTransactionList.errors) {
      manageApiCallErrors(error, data?.deleteTransactionList.errors);
    } else if (data && data.deleteTransactionList.account) {
      toast.success("Transactions deleted!");
      setSelectedTransactionList([]);
      setTransactions(data.deleteTransactionList.account.transactions);
      setTransactionsFiltered(data.deleteTransactionList.account.transactions);
      setIncomeAmount(data.deleteTransactionList.account.incomeAmount);
      setExpenseAmount(data.deleteTransactionList.account.expenseAmount);
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
