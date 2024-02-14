"use client";

import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { OperationType } from "@/gql/generated/graphql";
import { TransactionsSearchValueDefinition, UserCategory } from "@/utils/definitions/typeDefinition";
import { formTransactionsSearchValidation } from "@/utils/definitions/typeValidation";
import { currencyOptions } from "@/utils/enumUtils";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  Input,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  useCheckbox,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupBase, Select, SelectInstance, StylesConfig } from "chakra-react-select";
import { format, add } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const today = new Date();

interface SelectCategory {
  name: string;
  categoryType: string;
  subCategory: UserCategory | undefined;
  colorScheme: string;
}

const TransactionsSearchbar = () => {
  const { currency, expenseCategories, incomeCategories } = useUserStore();

  const form = useForm<TransactionsSearchValueDefinition>({
    resolver: zodResolver(formTransactionsSearchValidation),
  });
  const {
    control,
    formState: { errors },
    setValue,
    register,
  } = form;
  const [selectedOperationType, setSelectedOperationType] = useState<string>("Expense");
  const selectInputRef = useRef<SelectInstance<UserCategory, false, GroupBase<UserCategory>>>();

  const [customRangeDateVisible, setCustomRangeDateVisible] = useState(false);
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

  const [filteredCategories, setFilteredCategories] = useState<SelectCategory[]>([]);

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
    const allCategoriesFormatted: SelectCategory[] = allCategories.map((cat) => {
      return {
        name: cat.name,
        categoryType: cat.categoryType,
        subCategory: cat.subCategory,
        colorScheme: cat.categoryType === OperationType.Income ? "teal" : "red",
      };
    });
    setFilteredCategories(allCategoriesFormatted);
  };

  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox();
  return (
    <Card>
      <CardBody>
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
                        setCustomRangeDateVisible(true);
                      } else {
                        setCustomRangeDateVisible(false);
                      }
                    }}
                  />
                )}
              />
              <FormErrorHelperText>{errors.dateRangeOption?.message}</FormErrorHelperText>
            </FormControl>
          </WrapItem>
          {customRangeDateVisible && (
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
            <FormControl maxW={"200px"} maxH={"50px"}>
              <Controller
                control={control}
                name="selectedCategories"
                render={() => (
                  <Select
                    isMulti
                    ref={
                      selectInputRef as React.RefObject<SelectInstance<UserCategory, false, GroupBase<UserCategory>>>
                    }
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
            </FormControl>
          </WrapItem>
          <WrapItem>
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
          </WrapItem>
          <Spacer />
          <WrapItem>
            <FormControl>
              <Button rightIcon={<LuSearch />} colorScheme="teal" size={"sm"}>
                Search
              </Button>
            </FormControl>
          </WrapItem>
        </Wrap>
      </CardBody>
    </Card>
  );
};

export default TransactionsSearchbar;
