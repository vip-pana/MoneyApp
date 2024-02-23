import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { TransactionsSearchValueDefinition } from "@/utils/definitions/typeDefinition";
import { formTransactionsSearchValidation } from "@/utils/definitions/typeValidation";
import { CurrencyDropdown, currencyOptions } from "@/utils/enumUtils";
import { useUserStore } from "@/utils/zustand/userStore";
import { Wrap, WrapItem, FormControl, Spacer, Button, Input, IconButton, useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "chakra-react-select";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuSearch, LuTrash2 } from "react-icons/lu";
import { Currency, OperationType } from "@/gql/generated/graphql";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useTransactionsFilteredQuery } from "@/utils/definitions/useQueryDefinition";
import { toast } from "sonner";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import DeleteTransactionListDialog from "@/app/components/base/deleteTransactionListDialog";

interface SelectCategory {
  id: string;
  name: string;
  categoryType: string;
  colorScheme: string;
}

interface DateRangeOption {
  label: string;
  value: string;
  onChange?: () => void;
}
const today = new Date();

const TransactionsSearchbarForm = () => {
  const { selectedAccountId, email, expenseCategories, incomeCategories } = useUserStore();
  const { setTransactionsFiltered, selectedTransactionList } = useTransactionTableStore();
  const [isRangeDatesVisible, setIsRangeDateVisible] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<SelectCategory[]>([]);

  const {
    isOpen: isOpenDeleteTransactionListModal,
    onOpen: onOpenDeleteTransactionListModal,
    onClose: onCloseDeleteTransactionListModal,
  } = useDisclosure();

  const form = useForm<TransactionsSearchValueDefinition>({
    resolver: zodResolver(formTransactionsSearchValidation),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    register,
  } = form;

  const dateRangeOptions: DateRangeOption[] = [
    {
      label: "Today",
      value: "Today",
      onChange: () => {
        const formattedDate = format(today, "yyyy-MM-dd");
        setValue("dateStart", formattedDate);
        setValue("dateEnd", formattedDate);
      },
    },
    {
      label: "This week",
      value: "This week",
      onChange: () => {
        const newStartDate = add(today, { days: -7 });
        const formatDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formatDate);
        const formattedDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedDate);
      },
    },
    {
      label: "This month",
      value: "This month",
      onChange: () => {
        const newStartDate = add(today, { months: -1 });
        const formatDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formatDate);
        const formattedDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedDate);
      },
    },
    {
      label: "This year",
      value: "This year",
      onChange: () => {
        const newStartDate = add(today, { years: -1 });
        const formatDate = format(newStartDate, "yyyy-MM-dd");
        setValue("dateStart", formatDate);
        const formattedDate = format(today, "yyyy-MM-dd");
        setValue("dateEnd", formattedDate);
      },
    },
    {
      label: "Custom range",
      value: "Custom range",
    },
  ];

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
  const [selectedDateRangeOption, setselectedDateRangeOption] = useState<DateRangeOption>(dateRangeOptions[0]);

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

  const filterTransaction = graphql(`
    query userTransactionsFiltered($filters: TransactionFiltersInputTypeInput!) {
      userTransactionsFiltered(filters: $filters) {
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
        currencies: getValues("currencies") ?? [],
        dateStart: getValues("dateStart"),
        dateEnd: getValues("dateEnd"),
        categoriesIds: getValues("selectedCategoriesIds") ?? [],
      }),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast.error(error.name, {
        description: error.message,
      });
    } else if (data?.userTransactionsFiltered) {
      setTransactionsFiltered(data.userTransactionsFiltered.accounts[0].transactions);
    }
  };

  const resetForm = () => {
    setTodayDate();
    setselectedDateRangeOption(dateRangeOptions[0]);
    setFilteredSelectedCategories([]);
    setSelectedCurrencies([]);
    setIsRangeDateVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrap>
          <WrapItem>
            <FormControl>
              <Controller
                control={control}
                name="dateRangeOption"
                defaultValue={dateRangeOptions.find((el) => el.value === "Today")?.value}
                render={() => (
                  <Select
                    size={"sm"}
                    value={selectedDateRangeOption}
                    defaultValue={dateRangeOptions.find((el) => el.value === "Today")}
                    options={dateRangeOptions}
                    isLoading={isLoading}
                    onChange={(el) => {
                      if (el?.onChange) el.onChange();

                      if (el != null) setselectedDateRangeOption(el);
                      setValue("dateRangeOption", el?.value ?? "");
                      if (el?.value === "Custom range") {
                        setIsRangeDateVisible(true);
                      } else {
                        setIsRangeDateVisible(false);
                      }
                    }}
                  />
                )}
              />
              <FormErrorHelperText>{errors.dateRangeOption?.message}</FormErrorHelperText>
              <FormErrorHelperText>{errors.dateStart?.message}</FormErrorHelperText>
              <FormErrorHelperText>{errors.dateEnd?.message}</FormErrorHelperText>
            </FormControl>
          </WrapItem>
          {isRangeDatesVisible && (
            <>
              <WrapItem>
                <FormControl>
                  <Input {...register("dateStart")} type="date" size={"sm"} disabled={isLoading} />
                </FormControl>
              </WrapItem>
              <WrapItem>
                <FormControl>
                  <Input type="date" {...register("dateEnd")} size={"sm"} disabled={isLoading} />
                </FormControl>
              </WrapItem>
            </>
          )}
          <WrapItem>
            <FormControl maxW={"200px"}>
              <Controller
                control={control}
                name="selectedCategoriesIds"
                render={() => (
                  <Select
                    isMulti
                    size={"sm"}
                    isLoading={isLoading}
                    value={filtereSelectedCategories}
                    placeholder={"Select Category..."}
                    getOptionLabel={(category) => category.name}
                    getOptionValue={(category) => category.name}
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
                )}
              />
              <FormErrorHelperText>{errors.selectedCategoriesIds?.message}</FormErrorHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl maxW={"200px"}>
              <Controller
                control={control}
                name="currencies"
                render={() => (
                  <Select
                    isMulti
                    size={"sm"}
                    value={selectedCurrencies}
                    options={currencyOptions}
                    isDisabled={isLoading}
                    placeholder="Currency..."
                    onChange={(selectedCurrencies) => {
                      if (Array.isArray(selectedCurrencies)) {
                        setSelectedCurrencies(selectedCurrencies);
                        let selectedCurrenciesValue: Currency[] = selectedCurrencies.map((curr) => curr.value);
                        setValue("currencies", selectedCurrenciesValue);
                      }
                    }}
                  />
                )}
              />
              <FormErrorHelperText>{errors.currencies?.message}</FormErrorHelperText>
            </FormControl>
          </WrapItem>
          {/* <WrapItem>
          <CheckboxOperationTypeElement isChecked={true} setIsChecked={setIsChecked} />
        </WrapItem> */}
          {/* <WrapItem>
          <FormControl>
            <Box
              cursor="pointer"
              borderRadius={"lg"}
              borderWidth={"1px"}
              boxShadow={"md"}
              borderColor={"teal.600"}
              px={5}
              py={1}
            >
              <input {...getInputProps()} hidden />
              <Text {...getLabelProps()} textAlign={"center"}>
                Income
              </Text>
            </Box>
          </FormControl>
          <FormControl>
            <Box
              cursor="pointer"
              borderRadius={"lg"}
              borderWidth={"1px"}
              boxShadow={"md"}
              borderColor={"red.600"}
              px={5}
              py={1}
              {...htmlProps}
            >
              <Box {...getCheckboxProps()}>
                <input {...getInputProps()} hidden />
                <Text {...getLabelProps()} textAlign={"center"}>
                  {state.isChecked ? "clicked" : "Expense"}
                </Text>
              </Box>
            </Box>
          </FormControl>
        </WrapItem> */}
          <Spacer />
          <WrapItem>
            <Button rightIcon={<LuSearch />} type="submit" colorScheme="teal" size={"sm"} isLoading={isLoading}>
              Search
            </Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="yellow" size={"sm"} isLoading={isLoading} onClick={resetForm}>
              Clear
            </Button>
          </WrapItem>
          {selectedTransactionList.length > 0 && (
            <WrapItem>
              <IconButton
                colorScheme="red"
                size={"sm"}
                aria-label="Delete selected transactions"
                icon={<LuTrash2 />}
                onClick={onOpenDeleteTransactionListModal}
              />
            </WrapItem>
          )}
        </Wrap>
      </form>
      <DeleteTransactionListDialog
        isOpen={isOpenDeleteTransactionListModal}
        onClose={onCloseDeleteTransactionListModal}
        selectedTransactionList={selectedTransactionList}
      />
    </>
  );
};

export default TransactionsSearchbarForm;
