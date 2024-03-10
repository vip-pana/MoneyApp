import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Category, OperationType } from "@/gql/generated/graphql";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

const DeleteCategoryDialog = ({ selectedItem, children }: { selectedItem: Category; children: React.ReactNode }) => {
  const onSubmit = async () => {
    // const { data, isError, error } = await refetch();
    // if (isError || data?.deleteTransaction.errors) {
    //   manageApiCallErrors(error, data?.deleteTransaction.errors);
    // } else if (data?.deleteTransaction.account) {
    //   toast.success("Transaction deleted!");
    //   setTransactions(data.deleteTransaction.account.transactions);
    //   setTransactionsFiltered(data.deleteTransaction.account.transactions);
    //   setIncomeAmount(data.deleteTransaction.account.incomeAmount);
    //   setExpenseAmount(data.deleteTransaction.account.expenseAmount);
    // }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex flex-row">
              <p>Delete</p>
              <div
                className={`${
                  selectedItem.categoryType === OperationType.Income ? "text-teal-400" : "text-red-400"
                } text-md mx-1`}
              >
                {selectedItem?.name}
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure about deleting this category? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            className="bg-red-400" // disabled={isLoading}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
