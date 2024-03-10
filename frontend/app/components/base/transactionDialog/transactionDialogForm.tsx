"use client";

import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";
import { TransactionDialogFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { currencyOptions, getEnumValue } from "@/utils/enumUtils";
import { useForm } from "react-hook-form";
import { graphql } from "@/gql/generated";
import { useAddOrUpdateTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarInput } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { formAddOrUpdateTransactionDialogValidation } from "@/utils/definitions/typeValidation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomButtonSubmit from "@/components/ui/custom-button-submit";
import { Calendar, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

const TransactionModalForm = ({
  selectedItem,
  setIsOpen,
}: {
  selectedItem?: TransactionInput | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    email,
    selectedAccountId,
    expenseCategories,
    incomeCategories,
    setTransactions,
    setIncomeAmount,
    setExpenseAmount,
    currency,
  } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore(); // for update if i'm in modal inside transaction page

  const form = useForm<TransactionDialogFormValueDefinition>({
    resolver: zodResolver(formAddOrUpdateTransactionDialogValidation),
  });

  const [isSelectedOperationType, setIsSelectedOperationType] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setValuesBySelectedTransaction(selectedItem);
    } else {
      setDateValueOnTransaction();
      form.setValue("currency", currency);
    }
  }, [selectedItem]);

  const setValuesBySelectedTransaction = (transaction: TransactionInput) => {
    form.setValue("amount", transaction.amount.toString());
    form.setValue("currency", transaction.currency);
    form.setValue("description", transaction.description);
    form.setValue("category", transaction.category);
    form.setValue("operationType", transaction.transactionType);
    setDateValueOnTransaction(transaction.dateTime);
    setIsSelectedOperationType(true);
  };

  const setDateValueOnTransaction = (datetime?: any) => {
    const date = datetime ? new Date(datetime) : new Date();
    const formattedDate = format(date, "yyyy-MM-dd");
    form.setValue("date", formattedDate);
  };

  const addOrUpdateTransactionMutation = graphql(`
    mutation addOrUpdateTransaction($input: AddOrUpdateTransactionInput!) {
      addOrUpdateTransaction(input: $input) {
        account {
          currency
          incomeAmount
          expenseAmount
          categories {
            ...categoryFields
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
        errors {
          ...errorFields
        }
      }
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["addOrUpdateTransaction"],
    queryFn: () =>
      useAddOrUpdateTransactionMutation({
        accountId: selectedAccountId,
        email: email,
        transaction: form.getValues(),
        transactionId: selectedItem?.id ?? undefined,
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    if (form.getValues("category") == null) {
      toast.error("Please select a category for this transaction");
      return;
    }

    const { data, isError, error } = await refetch();

    if (isError || data?.addOrUpdateTransaction.errors) {
      manageApiCallErrors(error, data?.addOrUpdateTransaction.errors);
    } else if (data?.addOrUpdateTransaction.account) {
      toast.success(selectedItem?.id ? "Transaction updated!" : "Transaction added!");

      setTransactions(data.addOrUpdateTransaction.account.transactions);
      setTransactionsFiltered(data.addOrUpdateTransaction.account.transactions);
      setExpenseAmount(data.addOrUpdateTransaction.account.expenseAmount);
      setIncomeAmount(data.addOrUpdateTransaction.account.incomeAmount);
    }
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-9 my-3">
          <div className="flex flex-row justify-around gap-4">
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="0.01"
                      type="number"
                      step={"0.01"}
                      {...field}
                      value={field.value || ""}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="currency"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className="w-full justify-between">
                          {field.value
                            ? currencyOptions.find((option) => option.value === field.value)?.label
                            : "Select a currency..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder={"Search a currency..."} />
                        <CommandEmpty>{"No currency found."}</CommandEmpty>
                        <CommandGroup>
                          {currencyOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={(currentValue) => {
                                form.setValue(
                                  "currency",
                                  getEnumValue(currentValue.charAt(0).toUpperCase() + currentValue.slice(1), Currency)
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  option.value === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <center>
            <FormField
              name="operationType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which type of operation?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-row justify-around"
                      onValueChange={(val) => {
                        form.setValue("operationType", val as OperationType);
                        setIsSelectedOperationType(true);
                      }}
                      defaultValue={field.value}
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem checked={field.value === OperationType.Income} value={OperationType.Income} />
                        </FormControl>
                        <FormLabel className="ml-2">Income</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            checked={field.value === OperationType.Expense}
                            value={OperationType.Expense}
                          />
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
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                        disabled={isLoading || form.getValues("operationType") === undefined}
                      >
                        {field.value
                          ? (form.getValues("operationType") === OperationType.Expense
                              ? expenseCategories
                              : incomeCategories
                            ).find((option) => option.id === field.value.id)?.name
                          : "Select a category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder={"Search a category..."} />
                      <CommandEmpty>{"No category found."}</CommandEmpty>
                      <CommandGroup>
                        {(form.getValues("operationType") === OperationType.Expense
                          ? expenseCategories
                          : incomeCategories
                        ).map((option) => (
                          <CommandItem
                            key={option.id}
                            value={option.id}
                            onSelect={(currentValue) => {
                              let val = (
                                form.getValues("operationType") === OperationType.Expense
                                  ? expenseCategories
                                  : incomeCategories
                              ).find((option) => option.id === currentValue);
                              if (val != undefined) form.setValue("category", val);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.name === field.value?.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {option.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description" {...field} value={field.value || ""} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormItem className="w-full">
                        <Button
                          variant={"outline"}
                          type="button"
                          className={cn(
                            "min-w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormItem>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarInput
                        mode="single"
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <div className="">
            <CustomButtonSubmit title={selectedItem ? "Edit" : "Add"} isLoading={isLoading} />
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TransactionModalForm;
