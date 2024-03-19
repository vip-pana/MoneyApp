import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { graphql } from "@/gql/generated";
import { OperationType, SubCategory } from "@/gql/generated/graphql";
import { UseAddSubCategoryMutation } from "@/utils/definitions/useQueryDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { useUserStore } from "@/utils/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type addSubCategoryFormValueDefinition = {
  name: string;
};

const addSubCategoryMutation = graphql(`
  mutation AddSubCategory($input: AddSubCategoryInput!) {
    addSubCategory(input: $input) {
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
      errors {
        ...errorFields
      }
    }
  }
`);

const addSubCategoryFormValueDialogValidation = z.object({
  name: z.string().min(1, "Please insert a name"),
});

const AddSubCategoryDialog = ({ categoryId }: { categoryId: string }) => {
  const { userEmail, selectedAccountId, setIncomeCategories, setExpenseCategories } = useUserStore();
  const { headers } = useAccessTokenStore();

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const form = useForm<addSubCategoryFormValueDefinition>({
    resolver: zodResolver(addSubCategoryFormValueDialogValidation),
  });

  const { refetch, isLoading } = useQuery({
    queryKey: ["addSubCategory"],
    queryFn: () =>
      UseAddSubCategoryMutation({
        subCategoryName: form.getValues("name"),
        selectedAccountId,
        categoryId,
        headers,
        userEmail,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.addSubCategory.errors) {
      manageApiCallErrors(error, data?.addSubCategory.errors);
    } else if (data?.addSubCategory.category) {
      toast.success("Category added!");
      setIncomeCategories(data?.addSubCategory.category);
      setExpenseCategories(data?.addSubCategory.category);
    }
    setIsOpenAdd(false);
  };

  return (
    <Dialog open={isOpenAdd} onOpenChange={setIsOpenAdd}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add SubCategory</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add SubCategory</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full mb-3">
                  <FormLabel htmlFor="name" className="text-right">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Name"
                      {...field}
                      className="col-span-3"
                      value={field.value || ""}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubCategoryDialog;
