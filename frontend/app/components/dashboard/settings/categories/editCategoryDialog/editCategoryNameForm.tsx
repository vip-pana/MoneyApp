import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { graphql } from "@/gql/generated";
import { Category, OperationType } from "@/gql/generated/graphql";
import { UseEditCategoryMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { useCategoryTableStore } from "@/utils/zustand/categoryTableStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type EditCategoryNameFormValueDefinition = {
  name: string;
};

const editCategoryMutation = graphql(`
  mutation editCategory($input: EditCategoryInput!) {
    editCategory(input: $input) {
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

const editCategoryNameDialogValidation = z.object({
  name: z.string().min(1, "Please insert a name"),
});

const EditCategoryNameForm = ({
  selectedItem,
  setIsOpen,
}: {
  selectedItem: Category;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { userEmail, selectedAccountId, setIncomeCategories, setExpenseCategories, setTransactions } = useUserStore();
  const { setCategoriesFiltered } = useCategoryTableStore();
  const { headers } = useAccessTokenStore();

  const form = useForm<EditCategoryNameFormValueDefinition>({
    resolver: zodResolver(editCategoryNameDialogValidation),
  });

  useEffect(() => {
    form.setValue("name", selectedItem.name);
  }, [selectedItem]);

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.editCategory.errors) {
      manageApiCallErrors(error, data?.editCategory.errors);
    } else if (data?.editCategory.user?.accounts[0]) {
      toast.success(selectedItem?.id ? "Transaction updated!" : "Transaction added!");
      setTransactions(data.editCategory.user.accounts[0].transactions);
      const incomeCategories = data.editCategory.user.accounts[0].categories
        .filter((category) => category.categoryType === OperationType.Income)
        .map((category) => ({
          id: category.id,
          name: category.name,
          categoryType: category.categoryType,
          subCategories: category.subCategories || [],
        }));
      setIncomeCategories(incomeCategories);
      const expenseCategories = data.editCategory.user.accounts[0].categories
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
    setIsOpen(false);
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["editCategory"],
    queryFn: () =>
      UseEditCategoryMutation({
        selectedAccountId,
        userEmail,
        name: form.getValues("name"),
        categoryId: selectedItem.id,
        headers,
      }),
    enabled: false,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full mt-2">
              <FormControl>
                <Input id="name" placeholder="Name" {...field} value={field.value || ""} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-3">
          <Button>Edit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditCategoryNameForm;
