import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@/gql/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EditCategoryNameFormValueDefinition = {
  name: string;
};

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
  const form = useForm<EditCategoryNameFormValueDefinition>({
    resolver: zodResolver(editCategoryNameDialogValidation),
  });

  useEffect(() => {
    form.setValue("name", selectedItem.name);
  }, [selectedItem]);

  const onSubmit = async () => {
    // const { data, isError, error } = await refetch();
    // if (isError || data?.addOrUpdateTransaction.errors) {
    //   manageApiCallErrors(error, data?.addOrUpdateTransaction.errors);
    // } else if (data?.addOrUpdateTransaction.account) {
    //   toast.success(selectedItem?.id ? "Transaction updated!" : "Transaction added!");
    //   setTransactions(data.addOrUpdateTransaction.account.transactions);
    //   setTransactionsFiltered(data.addOrUpdateTransaction.account.transactions);
    //   setExpenseAmount(data.addOrUpdateTransaction.account.expenseAmount);
    //   setIncomeAmount(data.addOrUpdateTransaction.account.incomeAmount);
    // }
    // setIsOpen(false);
  };

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
        <DialogFooter className="mt-3">
          <Button>Edit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditCategoryNameForm;
