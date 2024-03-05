"use client";

import { TransactionsSearchValueDefinition } from "@/utils/definitions/typeDefinition";
import { formTransactionsSearchValidation } from "@/utils/definitions/typeValidation";
import { CurrencyDropdown, currencyOptions } from "@/utils/enumUtils";
import { useUserStore } from "@/utils/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, format } from "date-fns";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Currency, OperationType } from "@/gql/generated/graphql";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useTransactionsFilteredQuery } from "@/utils/definitions/useQueryDefinition";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarInput } from "@/components/ui/calendar";
import Select, { CSSObjectWithLabel, ControlProps, GroupBase } from "react-select";
import { useTheme } from "next-themes";
import { Calendar, Search } from "lucide-react";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { Checkbox } from "@/components/ui/checkbox";

interface SelectCategory {
  id: string;
  name: string;
  categoryType: string;
  colorScheme: string;
}

interface DateRangeOption {
  label: string;
  value: string;
}
const today = new Date();

const TransactionsSearchbarForm = () => {
  const { selectedAccountId, email, expenseCategories, incomeCategories, transactions } = useUserStore();
  const { setTransactionsFiltered } = useTransactionTableStore();
  const [isRangeDatesVisible, setIsRangeDateVisible] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<SelectCategory[]>([]);
  const { theme } = useTheme();

  const form = useForm<TransactionsSearchValueDefinition>({
    resolver: zodResolver(formTransactionsSearchValidation),
  });
  const { setValue } = form;

  const dateRangeOptions: DateRangeOption[] = [
    {
      label: "Today",
      value: "Today",
    },
    {
      label: "This week",
      value: "This week",
    },
    {
      label: "This month",
      value: "This month",
    },
    {
      label: "This year",
      value: "This year",
    },
    {
      label: "Custom range",
      value: "Custom range",
    },
  ];

  const updateDateValue = (date: string) => {
    let formattedEndDate = "";
    let formattedStartDate = "";
    let newStartDate: Date;
    switch (date) {
      case "Today":
        formattedEndDate = format(today, "yyyy-MM-dd");
        setValue("dateStart", formattedEndDate);
        setValue("dateEnd", formattedEndDate);
        break;
      case "This week":
        newStartDate = add(today, { days: -7 });
        formattedStartDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formattedStartDate);
        formattedEndDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedEndDate);
        break;
      case "This month":
        newStartDate = add(today, { months: -1 });
        formattedStartDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formattedStartDate);
        formattedEndDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedEndDate);
        break;
      case "This year":
        newStartDate = add(today, { years: -1 });
        formattedStartDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formattedStartDate);
        formattedEndDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedEndDate);
        break;
    }
  };

  useEffect(() => {
    setTodayDate();
    setFilteredCategories(formatCategories());
  }, []);

  const setTodayDate = () => {
    const formattedDate = format(today, "yyyy-MM-dd");
    setValue("dateStart", formattedDate);
    setValue("dateEnd", formattedDate);
  };

  const [filtereSelectedCategories, setFilteredSelectedCategories] = useState<SelectCategory[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyDropdown[]>([]);

  const formatCategories = () => {
    const allCategories = [...incomeCategories, ...expenseCategories];
    const allCategoriesFormatted: SelectCategory[] = allCategories.map((category) => ({
      id: category.id,
      name: category.name,
      categoryType: category.categoryType,
      subCategory: category.subCategories,
      colorScheme: category.categoryType === OperationType.Income ? "teal" : "red",
    }));
    return allCategoriesFormatted;
  };

  const transactionFilteredQuery = graphql(`
    query userTransactionsFiltered($input: FilterTransactionListInput!!) {
      userTransactionsFiltered(filters: $input) {
        accounts {
          transactions {
            ...transactionFields
          }
        }
      }
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["filterTransactions"],
    queryFn: () =>
      useTransactionsFilteredQuery({
        accountId: selectedAccountId,
        email: email,
        currencies: form.getValues("currencies") ?? [],
        dateStart: form.getValues("dateStart"),
        dateEnd: form.getValues("dateEnd"),
        categoriesIds: form.getValues("selectedCategoriesIds") ?? [],
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      manageApiCallErrors(null, error);
    } else if (data?.userTransactionsFiltered) {
      setTransactionsFiltered(data.userTransactionsFiltered.accounts[0].transactions);
    }
  };

  const resetForm = () => {
    setTodayDate();
    setFilteredSelectedCategories([]);
    setSelectedCurrencies([]);
    setIsRangeDateVisible(false);
    setTransactionsFiltered(transactions);
  };

  const selectStyles = {
    control: (provided: CSSObjectWithLabel, state: ControlProps<any, true, GroupBase<any>>) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: "",
      borderWidth: "1px",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : "none",
      minHeight: "40px",
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderRadius: "4px",
      border: "1px solid gray",
      marginTop: "2px",
      backgroundColor: theme === "light" ? "white" : "#09090b",
    }),
    singleValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: theme === "light" ? "black" : "white",
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: theme === "light" ? "black" : "white",
      fontFamily: "inherit",
      fontSize: "0.875rem",
    }),
    option: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? (theme === "light" ? "#f1f5f9" : "#27272a") : provided.backgroundColor,
      fontSize: "0.875rem",
    }),
    multiValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor: theme === "light" ? "#18181b" : "#27272a",
      borderRadius: "4px",
      color: theme === "light" ? "#f1f5f9" : "light",
    }),
    multiValueLabel: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: theme === "light" ? "#f1f5f9" : "light",
    }),
    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: theme === "light" ? "black" : "white", // Cambia il colore del testo durante la digitazione
    }),
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
          <FormField
            name="dateRangeOption"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <ShadcnSelect
                  onValueChange={(e) => {
                    updateDateValue(e);
                    setValue("dateRangeOption", e);
                    if (e === "Custom range") {
                      setIsRangeDateVisible(true);
                    } else {
                      setIsRangeDateVisible(false);
                    }
                  }}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Date options</SelectLabel>
                      {dateRangeOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </ShadcnSelect>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRangeDatesVisible && (
            <>
              <FormField
                name="dateStart"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger>
                        <FormItem>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[180px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="dateEnd"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger>
                        <FormItem>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[180px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormItem>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarInput
                          mode="single"
                          // selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            name="selectedCategoriesIds"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select
                  instanceId={useId()}
                  styles={selectStyles}
                  isMulti
                  isLoading={isLoading}
                  value={filtereSelectedCategories}
                  placeholder="Select Category..."
                  getOptionLabel={(category) => category.name}
                  getOptionValue={(category) => String(category.id)}
                  options={filteredCategories}
                  onChange={(selectedCategoryList) => {
                    if (Array.isArray(selectedCategoryList)) {
                      setFilteredSelectedCategories(selectedCategoryList);
                    }
                    setValue(
                      "selectedCategoriesIds",
                      selectedCategoryList.map((category) => category.id)
                    );
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currencies"
            control={form.control}
            render={() => (
              <FormItem>
                <Select
                  isLoading={isLoading}
                  instanceId={useId()}
                  styles={selectStyles}
                  isMulti
                  placeholder="Currency..."
                  value={selectedCurrencies}
                  options={currencyOptions}
                  isDisabled={isLoading}
                  onChange={(selectedCurrencies) => {
                    if (Array.isArray(selectedCurrencies)) {
                      setSelectedCurrencies(selectedCurrencies);
                      let selectedCurrenciesValue: Currency[] = selectedCurrencies.map((curr) => curr.value);
                      setValue("currencies", selectedCurrenciesValue);
                    }
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="operationTypes"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-5">
                <div className="mt-2">
                  <FormLabel className="mr-2">Income</FormLabel>
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                </div>
                <div>
                  <FormLabel className="mr-2">Expense</FormLabel>
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <div className="flex-grow" />
          <div className="flex items-center space-x-4">
            <Button disabled={isLoading} type="submit">
              <Search className=" h-4 w-4" />
            </Button>
            <Button variant={"secondary"} disabled={isLoading} onClick={resetForm}>
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TransactionsSearchbarForm;
