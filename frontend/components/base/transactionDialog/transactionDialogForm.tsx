"use client";

import { Category, Currency, OperationType, Transaction, TransactionInput } from "@/gql/graphql";
import { currencyOptions, getEnumValue } from "@/lib/utils/enumUtils";
import { useForm } from "react-hook-form";
import { graphql } from "@/gql";
import { useUserStore } from "@/lib/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useTransactionTableStore } from "@/lib/zustand/transactionTableStore";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcnComponents/form";
import { Button } from "@/components/shadcnComponents/button";
import { Input } from "@/components/shadcnComponents/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcnComponents/popover";
import { cn } from "@/lib/utils/utils";
import { Calendar as CalendarInput } from "@/components/shadcnComponents/calendar";
import { DialogFooter } from "@/components/shadcnComponents/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { formAddOrUpdateTransactionDialogValidation } from "@/lib/definitions/typeValidation";
import { RadioGroup, RadioGroupItem } from "@/components/shadcnComponents/radio-group";
import CustomButtonSubmit from "@/components/shadcnComponents/custom-button-submit";
import { Calendar, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/shadcnComponents/command";
import { UseAddOrUpdateTransactionMutation } from "@/lib/definitions/useQueryDefinition";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";

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
      errors {
        ...errorFields
      }
    }
  }
`);

const TransactionModalForm = ({
  selectedItem,
  setIsOpen,
}: {
  selectedItem?: Transaction;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    userEmail,
    selectedAccountId,
    expenseCategories,
    incomeCategories,
    setTransactions,
    setIncomeAmount,
    setExpenseAmount,
    currency,
  } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore(); // for update if i'm in modal inside transaction page
  const { headers } = useAccessTokenStore();

  const form = useForm<TransactionInput>({
    resolver: zodResolver(formAddOrUpdateTransactionDialogValidation),
  });

  const [selectedOperationType, setSelectedOperationType] = useState<OperationType>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    if (selectedItem) {
      setValuesBySelectedTransaction(selectedItem);
    } else {
      setDateValueOnTransaction();
      form.setValue("currency", currency);
    }
  }, [selectedItem]);

  const setValuesBySelectedTransaction = (transaction: Transaction) => {
    form.setValue("amount", transaction.amount);
    form.setValue("currency", transaction.currency);
    form.setValue("description", transaction.description);
    form.setValue("category", transaction.category);
    form.setValue("transactionType", transaction.transactionType);
    form.setValue("selectedSubCategory", transaction.subCategory);
    setSelectedCategory(transaction.category);
    setDateValueOnTransaction(transaction.dateTime);
    setSelectedOperationType(transaction.transactionType);
  };

  const setDateValueOnTransaction = (datetime?: any) => {
    const date = datetime ? new Date(datetime) : new Date();
    const formattedDate = format(date, "yyyy-MM-dd");
    form.setValue("dateTime", formattedDate);
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["addOrUpdateTransaction"],
    queryFn: () =>
      UseAddOrUpdateTransactionMutation({
        transaction: {
          id: selectedItem?.id,
          amount: parseFloat(form.getValues("amount").toString()),
          description: form.getValues("description"),
          dateTime: form.getValues("dateTime"),
          transactionType: form.getValues("transactionType"),
          category: form.getValues("category"),
          currency: form.getValues("currency"),
          selectedSubCategory: form.getValues("selectedSubCategory"),
        },
        selectedAccountId,
        userEmail,
        headers,
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
              name="transactionType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which type of operation?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-row justify-around"
                      onValueChange={(val) => {
                        form.setValue("transactionType", val as OperationType);
                        setSelectedOperationType(val as OperationType);
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
                        disabled={isLoading || form.getValues("transactionType") === undefined}
                      >
                        {field.value
                          ? (selectedOperationType === OperationType.Expense
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
                        {(form.getValues("transactionType") === OperationType.Expense
                          ? expenseCategories
                          : incomeCategories
                        ).map((option) => (
                          <CommandItem
                            key={option.id}
                            value={option.id}
                            onSelect={(currentValue) => {
                              let val = (
                                selectedOperationType === OperationType.Expense ? expenseCategories : incomeCategories
                              ).find((option) => option.id === currentValue);
                              if (val != undefined) {
                                form.setValue("category", val);
                                setSelectedCategory(val);
                              }
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
          {selectedCategory != undefined && selectedCategory?.subCategories.length > 0 && (
            <FormField
              name={"selectedSubCategory"}
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
                          disabled={isLoading || form.getValues("transactionType") === undefined}
                        >
                          {field.value != undefined || field.value != null
                            ? selectedCategory.subCategories.find((option) => option.id === field.value?.id)?.name
                            : "Select a subcategory..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder={"Search a category..."} />
                        <CommandEmpty>{"No category found."}</CommandEmpty>
                        <CommandGroup>
                          {selectedCategory.subCategories.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.id}
                              onSelect={(currentValue) => {
                                let val = selectedCategory.subCategories.find((option) => option.id === currentValue);
                                if (val != undefined) form.setValue("selectedSubCategory", val);
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
          )}
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
            name="dateTime"
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
          <CustomButtonSubmit title={selectedItem ? "Edit" : "Add"} isLoading={isLoading} />
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TransactionModalForm;
