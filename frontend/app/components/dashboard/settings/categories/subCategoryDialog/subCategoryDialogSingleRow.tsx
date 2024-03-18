import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { graphql } from "@/gql/generated";
import { SubCategory } from "@/gql/generated/graphql";
import { UseEditSubCategoryMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type editSubCategoryFormValueDefinition = {
  name: string;
};

const editSubCategoryMutation = graphql(`
  mutation EditSubCategory($input: EditSubCategoryInput!) {
    editSubCategory(input: $input) {
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

const editSubCategoryFormValueDialogValidation = z.object({
  name: z.string().min(1, "Please insert a name"),
});

const SubCategoryDialogSingleRow = ({
  s,
  categoryId,
  setIsOpen,
}: {
  s: SubCategory;
  categoryId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userEmail, selectedAccountId, setIncomeCategories, setExpenseCategories, setTransactions } = useUserStore();
  const { headers } = useAccessTokenStore();

  const form = useForm<editSubCategoryFormValueDefinition>({
    resolver: zodResolver(editSubCategoryFormValueDialogValidation),
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.editSubCategory.errors) {
      manageApiCallErrors(error, data?.editSubCategory.errors);
    } else if (data?.editSubCategory.user?.accounts) {
      toast.success("subcategory edited!");
      setIncomeCategories(data?.editSubCategory.user.accounts[0].categories);
      setExpenseCategories(data?.editSubCategory.user.accounts[0].categories);
      setTransactions(data?.editSubCategory.user.accounts[0].transactions);
      setIsOpen(false);
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["editSubCategory"],
    queryFn: () =>
      UseEditSubCategoryMutation({
        subCategoryName: form.getValues("name"),
        selectedAccountId,
        categoryId,
        subCategoryId: s.id,
        userEmail,
        headers,
      }),
    enabled: false,
  });

  const [showEdit, setShowEdit] = React.useState(false);

  useEffect(() => {
    form.setValue("name", s.name);
  }, [showEdit, setShowEdit]);
  return (
    <TableRow>
      <TableCell className="font-medium">
        {showEdit ? (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-1">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="name"
                            className="h-3"
                            placeholder="Name"
                            {...field}
                            value={field.value || ""}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="h-5 text-sm" type="submit" disabled={isLoading}>
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          s.name
        )}
      </TableCell>
      <TableCell className="text-right">
        {showEdit ? (
          <Button
            className="h-5 text-sm"
            variant={"destructive"}
            onClick={() => setShowEdit(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowEdit(!showEdit)}
              variant="ghost"
              size="icon"
              className="w-5 h-5 mx-3"
              type="button"
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button onClick={() => {}} variant="ghost" size="icon" className="w-5 h-5" type="button">
              <X className="h-3 w-3 text-red-600" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubCategoryDialogSingleRow;
