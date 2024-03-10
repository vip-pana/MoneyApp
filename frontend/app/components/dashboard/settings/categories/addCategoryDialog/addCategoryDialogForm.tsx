import CustomButtonSubmit from "@/components/ui/custom-button-submit";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OperationType } from "@/gql/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryDialogAddSubCategoryTable from "./CatagoryDialogAddSubCategoryTable/CategoryDialogAddSubCategoryTable";
import { Button } from "@/components/ui/button";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { AddCategoryFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { useAddCategoryMutation } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { toast } from "sonner";
import { useCategoryTableStore } from "@/utils/zustand/categoryTableStore";

const addCategoryFormValueDialogValidation = z.object({
  name: z.string().min(1, "Please insert a name"),
  operationType: z.enum([OperationType.Expense, OperationType.Income]),
});

const AddCategoryDialogForm = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { email, selectedAccountId, setIncomeCategories, setExpenseCategories } = useUserStore();
  const { categoriesFiltered, setCategoriesFiltered } = useCategoryTableStore();

  const form = useForm<AddCategoryFormValueDefinition>({
    resolver: zodResolver(addCategoryFormValueDialogValidation),
  });

  const [subcategories, setSubCategories] = useState<string[]>([]);
  const [inputSubcategory, setInputSubcategory] = useState("");

  const addCategoryMutation = graphql(`
    mutation addCategory($input: AddCategoryInput!) {
      addCategory(input: $input) {
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

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.addCategory.errors) {
      manageApiCallErrors(error, data?.addCategory.errors);
    } else if (data?.addCategory.category) {
      toast.success("Category added!");
      const incomeCategories = data.addCategory.category
        .filter((category) => category.categoryType === OperationType.Income)
        .map((category) => ({
          id: category.id,
          name: category.name,
          categoryType: category.categoryType,
          subCategories: category.subCategories || [],
        }));
      setIncomeCategories(incomeCategories);
      const expenseCategories = data.addCategory.category
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
    queryKey: ["addCategory"],
    queryFn: () =>
      useAddCategoryMutation({
        accountId: selectedAccountId,
        email: email,
        name: form.getValues("name"),
        operationType: form.getValues("operationType"),
        subcategoriesName: subcategories,
      }),
    enabled: false,
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...field}
                    value={field.value || ""} //disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <center>
            <FormField
              name="operationType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Which type of operation?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-row justify-around"
                      onValueChange={(val) => {
                        form.setValue("operationType", val as OperationType);
                      }}
                      defaultValue={field.value}
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value={OperationType.Income} />
                        </FormControl>
                        <FormLabel className="ml-2">Income</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value={OperationType.Expense} />
                        </FormControl>
                        <FormLabel className="ml-2">Expense</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </center>
          <div className="flex flex-row mt-10 gap-2">
            <Input
              placeholder="Subcategory"
              value={inputSubcategory}
              onChange={(e) => setInputSubcategory(e.target.value)}
            />
            <Button
              type="button"
              variant={"outline"}
              disabled={inputSubcategory === ""}
              onClick={() => {
                setSubCategories([...subcategories, inputSubcategory]);
                setInputSubcategory("");
              }}
            >
              Add
            </Button>
          </div>
          <CategoryDialogAddSubCategoryTable data={subcategories} setData={setSubCategories} />
          <DialogFooter>
            <div className="">
              <CustomButtonSubmit title={"Add"} isLoading={false} />
            </div>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default AddCategoryDialogForm;
