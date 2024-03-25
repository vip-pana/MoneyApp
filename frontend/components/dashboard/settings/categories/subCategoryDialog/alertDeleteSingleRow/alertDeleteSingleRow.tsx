import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/shadcnComponents/alert-dialog";
import { graphql } from "@/gql";
import { Category, SubCategory } from "@/gql/graphql";
import { UseDeleteSubCategoryMutation } from "@/lib/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";
import { useTransactionTableStore } from "@/lib/zustand/transactionTableStore";
import { useUserStore } from "@/lib/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteSubCategoryMutation = graphql(`
  mutation DeleteSubCategory($input: DeleteSubCategoryInput!) {
    deleteSubCategory(input: $input) {
      user {
        accounts {
          categories {
            id
            name
            categoryType
            subCategories {
              name
              categoryType
              id
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
      }
      errors {
        ...errorFields
      }
    }
  }
`);

const AlertDeleteSingleRow = ({
  selectedItem,
  categoryId,
  children,
  setIsOpen,
}: {
  selectedItem: SubCategory;
  categoryId: string;
  children: JSX.Element;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userEmail, selectedAccountId, setTransactions } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();
  const { headers } = useAccessTokenStore();

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.deleteSubCategory.errors) {
      manageApiCallErrors(error, data?.deleteSubCategory.errors);
    } else if (data?.deleteSubCategory.user?.accounts[0]) {
      toast.success("Subcategory deleted!");
      setTransactions(data?.deleteSubCategory.user?.accounts[0].transactions);
      setTransactionsFiltered(data?.deleteSubCategory.user?.accounts[0].transactions);
    }
    setIsOpen(false);
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["deleteSubCategory"],
    queryFn: () =>
      UseDeleteSubCategoryMutation({
        subCategoryId: selectedItem.id,
        categoryId: categoryId,
        selectedAccountId,
        userEmail,
        headers,
      }),
    enabled: false,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? Deleting {selectedItem.name} All transactions related are moved on Other category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isLoading} className="bg-red-400 ">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteSingleRow;
