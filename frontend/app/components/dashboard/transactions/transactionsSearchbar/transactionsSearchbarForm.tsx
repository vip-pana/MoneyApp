import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { TransactionsSearchValueDefinition, UserCategory } from "@/utils/definitions/typeDefinition";
import { formTransactionsSearchValidation } from "@/utils/definitions/typeValidation";
import { currencyOptions } from "@/utils/enumUtils";
import { useUserStore } from "@/utils/zustand/userStore";
import { Wrap, WrapItem, FormControl, Spacer, Button, Input, Box } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "chakra-react-select";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { OperationType } from "@/gql/generated/graphql";
import { graphql } from "@/gql/generated";

interface SelectCategory {
  name: string;
  categoryType: string;
  subCategory: UserCategory | undefined;
  colorScheme: string;
}
const today = new Date();

const TransactionsSearchbarForm = () => {
  const { currency, expenseCategories, incomeCategories } = useUserStore();
  const [isRangeDatesVisible, setIsRangeDateVisible] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<SelectCategory[]>([]);

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

  const dateRangeOptions = [
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
    setAllCategories();
  }, []);

  const setTodayDate = () => {
    const formattedDate = format(today, "yyyy-MM-dd");
    setValue("dateStart", formattedDate);
    setValue("dateEnd", formattedDate);
  };

  const setAllCategories = () => {
    const allCategories = [...incomeCategories, ...expenseCategories];
    const allCategoriesFormatted = allCategories.map((category) => ({
      name: category.name,
      categoryType: category.categoryType,
      subCategory: category.subCategory,
      colorScheme: category.categoryType === OperationType.Income ? "teal" : "red",
    }));
    setFilteredCategories(allCategoriesFormatted);
  };

  const filterTransaction = graphql(`
    query userTransactionsFiltered($filters: TransactionFiltersInputTypeInput!) {
      userTransactionsFiltered(filters: $filters) {
        accounts {
          transactions {
            id
            amount
            description
            dateTime
            currency
            description
            transactionType
            category {
              id
              name
              categoryType
            }
          }
        }
      }
    }
  `);

  const onSubmit = () => {
    let categories = getValues("selectedCategories");
    if (categories?.length > 0) {
      categories = categories.map((category) => ({
        id: category.id,
        name: category.name,
        categoryType: category.categoryType,
        subCategory: category.subCategory,
      }));
    }
    console.log(categories);
  };

  return (
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
                  defaultValue={dateRangeOptions.find((el) => el.value === "Today")}
                  options={dateRangeOptions}
                  onChange={(el) => {
                    if (el?.onChange) el.onChange();

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
                <Input {...register("dateStart")} type="date" size={"sm"} />
              </FormControl>
            </WrapItem>
            <WrapItem>
              <FormControl>
                <Input type="date" {...register("dateEnd")} size={"sm"} />
              </FormControl>
            </WrapItem>
          </>
        )}
        <WrapItem>
          <FormControl maxW={"200px"}>
            <Controller
              control={control}
              name="selectedCategories"
              render={() => (
                <Select
                  isMulti
                  size={"sm"}
                  placeholder={"Select Category..."}
                  getOptionLabel={(category) => category.name}
                  getOptionValue={(category) => category.name}
                  options={filteredCategories}
                  onChange={(selectedCategoryList) => {
                    if (Array.isArray(selectedCategoryList)) {
                      setValue("selectedCategories", selectedCategoryList);
                    }
                  }}
                />
              )}
            />
            <FormErrorHelperText>{errors.selectedCategories?.message}</FormErrorHelperText>
          </FormControl>
        </WrapItem>
        <WrapItem>
          <FormControl maxW={"200px"}>
            <Controller
              control={control}
              name="currencies"
              defaultValue={[currencyOptions.find((c) => c.value == currency)?.label ?? ""]}
              render={() => (
                <Select
                  isMulti
                  size={"sm"}
                  defaultValue={currencyOptions.find((c) => c.value == currency)}
                  options={currencyOptions}
                  placeholder="Currency..."
                  onChange={(selectedCurrencies) => {
                    setValue(
                      "currencies",
                      selectedCurrencies.map((cur) => cur.value)
                    );
                  }}
                />
              )}
            />
            <FormErrorHelperText>{errors.currencies?.message}</FormErrorHelperText>
          </FormControl>
        </WrapItem>
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
          <FormControl>
            <Button rightIcon={<LuSearch />} type="submit" colorScheme="teal" size={"sm"}>
              Search
            </Button>
          </FormControl>
        </WrapItem>
      </Wrap>
    </form>
  );
};

export default TransactionsSearchbarForm;
