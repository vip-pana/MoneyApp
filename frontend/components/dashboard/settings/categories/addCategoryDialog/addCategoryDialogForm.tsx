import CustomButtonSubmit from "@/components/shadcnComponents/custom-button-submit";
import { DialogFooter } from "@/components/shadcnComponents/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcnComponents/form";
import { Input } from "@/components/shadcnComponents/input";
import { RadioGroup, RadioGroupItem } from "@/components/shadcnComponents/radio-group";
import { OperationType } from "@/gql/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryDialogAddSubCategoryTable from "./CatagoryDialogAddSubCategoryTable/CategoryDialogAddSubCategoryTable";
import { Button } from "@/components/shadcnComponents/button";
import { graphql } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { UseAddCategoryMutation } from "@/lib/definitions/useQueryDefinition";
import { useUserStore } from "@/lib/zustand/userStore";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { toast } from "sonner";
import { useCategoryTableStore } from "@/lib/zustand/categoryTableStore";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";

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

const addCategoryFormValueDialogValidation = z.object({
  name: z.string().min(1, "Please insert a name"),
  operationType: z.enum([OperationType.Expense, OperationType.Income]),
});

type AddCategoryFormValue = {
  name: string;
  operationType: OperationType;
};

const AddCategoryDialogForm = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const {
    userEmail,
    selectedAccountId,
    setIncomeCategories,
    setExpenseCategories,
    incomeCategories,
    expenseCategories,
  } = useUserStore();
  const { setCategoriesFiltered } = useCategoryTableStore();
  const { headers } = useAccessTokenStore();

  const form = useForm<AddCategoryFormValue>({
    resolver: zodResolver(addCategoryFormValueDialogValidation),
  });

  const [subcategoriesNames, setSubCategories] = useState<string[]>([]);
  const [inputSubcategory, setInputSubcategory] = useState("");

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.addCategory.errors) {
      manageApiCallErrors(error, data?.addCategory.errors);
    } else if (data?.addCategory.category) {
      toast.success("Category added!");
      setIncomeCategories(data.addCategory.category);
      setExpenseCategories(data.addCategory.category);
      setCategoriesFiltered([...incomeCategories, ...expenseCategories]);
    }
    setIsOpen(false);
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["addCategory"],
    queryFn: () =>
      UseAddCategoryMutation({
        selectedAccountId,
        userEmail,
        subcategoriesNames,
        headers,
        ...form.getValues(),
      }),
    enabled: false,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Name" {...field} value={field.value || ""} disabled={isLoading} />
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
                        <RadioGroupItem value={OperationType.Income} disabled={isLoading} />
                      </FormControl>
                      <FormLabel className="ml-2">Income</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value={OperationType.Expense} disabled={isLoading} />
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
            disabled={isLoading}
          />
          <Button
            type="button"
            variant={"outline"}
            disabled={inputSubcategory === "" || isLoading}
            onClick={() => {
              setSubCategories([...subcategoriesNames, inputSubcategory]);
              setInputSubcategory("");
            }}
          >
            Add
          </Button>
        </div>
        <CategoryDialogAddSubCategoryTable data={subcategoriesNames} setData={setSubCategories} />
        <DialogFooter>
          <CustomButtonSubmit title={"Add"} isLoading={isLoading} />
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddCategoryDialogForm;
