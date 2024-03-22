import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcnComponents/alert-dialog";
import { graphql } from "@/gql";
import { Category, OperationType } from "@/gql/graphql";
import { UseDeleteCategoryMutation } from "@/lib/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";
import { useCategoryTableStore } from "@/lib/zustand/categoryTableStore";
import { useUserStore } from "@/lib/zustand/userStore";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteCategoryDocument = graphql(`
  mutation DeleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      user {
        accounts {
          transactions {
            id
            amount
            description
            transactionType
            currency
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
            dateTime
          }
          categories {
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

const DeleteCategoryDialog = ({ selectedItem, children }: { selectedItem: Category; children: React.ReactNode }) => {
  const { userEmail, selectedAccountId, setIncomeCategories, setExpenseCategories, setTransactions } = useUserStore();
  const { headers } = useAccessTokenStore();

  const { setCategoriesFiltered } = useCategoryTableStore();

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.deleteCategory.errors) {
      manageApiCallErrors(error, data?.deleteCategory.errors);
    } else if (data?.deleteCategory.user?.accounts) {
      toast.success("Category deleted!");
      setTransactions(data.deleteCategory.user?.accounts[0].transactions);
      const incomeCategories = data.deleteCategory.user.accounts[0].categories
        .filter((category) => category.categoryType === OperationType.Income)
        .map((category) => ({
          id: category.id,
          name: category.name,
          categoryType: category.categoryType,
          subCategories: category.subCategories || [],
        }));
      setIncomeCategories(incomeCategories);
      const expenseCategories = data.deleteCategory.user?.accounts[0].categories
        .filter((c) => c.categoryType === OperationType.Expense)
        .map((c) => ({
          id: c.id,
          name: c.name,
          categoryType: c.categoryType,
          subCategories: c.subCategories || [],
        }));
      setExpenseCategories(expenseCategories);
      setCategoriesFiltered([...incomeCategories, ...expenseCategories]);
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["addCategory"],
    queryFn: () =>
      UseDeleteCategoryMutation({
        selectedAccountId,
        userEmail,
        categoryId: selectedItem.id,
        headers,
      }),
    enabled: false,
  });

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
            Are you sure about deleting this category? <br /> If there are transactions which use this category they
            were moved to use the category <span className="font-bold">Other</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className="bg-red-400" disabled={isLoading}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
