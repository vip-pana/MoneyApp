import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";
import { TransactionModalFormValueDefinition, UserCategory } from "@/utils/definitions/typeDefinition";
import { currencyOptions, formatEnumValueByString, getEnumValue } from "@/utils/enumUtils";
import {
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  FormControl,
  ModalFooter,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { Select, SelectInstance, GroupBase } from "chakra-react-select";
import { Controller, UseFormReturn } from "react-hook-form";
import RadioOperationTypes from "./radioOperationTypes";
import { graphql } from "@/gql/generated";
import { useAddTransactionQuery, useUpdateTransactionQuery } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

const TransactionModalForm = ({
  selectedTransaction,
  clearErrorsAndClose,
  form,
}: {
  selectedTransaction?: TransactionInput | undefined;
  clearErrorsAndClose: () => void;
  form: UseFormReturn<TransactionModalFormValueDefinition, any, undefined>;
}) => {
  const {
    email,
    currency,
    selectedAccountId,
    expenseCategories,
    incomeCategories,
    setTransactions,
    setIncomeAmount,
    setExpenseAmount,
  } = useUserStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = form;

  const [selectedOperationType, setSelectedOperationType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>();
  const selectInputRef = useRef<SelectInstance<UserCategory, false, GroupBase<UserCategory>>>();

  useEffect(() => {
    if (selectedTransaction != undefined) {
      setValuesBySelectedTransaction();
      setSelectedCategoryBySelectedTransaction();
    } else {
      setDateValueOnTransaction();
    }
  }, [selectedTransaction]);

  const setValuesBySelectedTransaction = () => {
    setValue("amount", (selectedTransaction?.amount ?? 0).toString());
    setValue("currency", selectedTransaction?.currency ?? currency);
    setValue("description", selectedTransaction?.description ?? "");
    setValue("selectedCategory", selectedTransaction?.category?.name ?? "");
    setValue("operationType", selectedTransaction?.transactionType ?? OperationType.Expense);

    const operationTypeValue = getDefaultValueRadioGroup();
    setSelectedOperationType(operationTypeValue);

    if (selectedTransaction?.dateTime) {
      setDateValueOnTransaction(selectedTransaction?.dateTime);
    }
  };

  const setSelectedCategoryBySelectedTransaction = () => {
    let res: UserCategory | undefined;
    if (selectedTransaction != null && selectedTransaction != undefined) {
      if (selectedTransaction.transactionType == OperationType.Income) {
        res = incomeCategories.find((c) => c.name == selectedTransaction?.category?.name);
      } else {
        res = expenseCategories.find((c) => c.name == selectedTransaction?.category?.name);
      }
    }
    if (res != undefined) {
      setSelectedCategory(res);
    }
  };

  const setDateValueOnTransaction = (datetime?: any) => {
    const date = datetime ? new Date(datetime) : new Date();
    const formattedDate = format(date, "yyyy-MM-dd");
    setValue("date", formattedDate);
  };

  const getDefaultValueRadioGroup = (): string => {
    let res = "";
    if (selectedTransaction != undefined && selectedTransaction.transactionType) {
      res = selectedTransaction.transactionType.toString();
    } else {
      res = "Expense";
    }
    return res;
    // TO-DO: sistemare radio element selezione iniziale che va a membro di segugio
    // return selectedTransaction?.transactionType == OperationType.Expense ? "Expense" : "Income";
  };

  const addOrUpdateTransaction = graphql(`
    mutation addOrUpdateTransaction($user: UserInput!, $transaction: TransactionInput!, $accountId: String!) {
      addOrUpdateTransaction(user: $user, transaction: $transaction, accountId: $accountId) {
        accounts {
          incomeAmount
          expenseAmount
          transactions {
            id
            amount
            description
            dateTime
            currency
            description
            transactionType
            category {
              name
              categoryType
            }
          }
        }
      }
    }
  `);

  const { refetch: addOrUpdateTransactionRefetch, isLoading: addOrUpdateTransactionIsLoading } = useQuery({
    queryKey: ["addOrUpdateTransaction"],
    queryFn: () =>
      selectedTransaction?.id
        ? useUpdateTransactionQuery({
            accountId: selectedAccountId,
            email: email,
            transaction: {
              amount: getValues("amount"),
              date: getValues("date"),
              description: getValues("description"),
              selectedCategory: getValues("selectedCategory"),
              operationType: getEnumValue(selectedOperationType, OperationType),
              currency: getEnumValue(formatEnumValueByString(getValues("currency")), Currency),
            },
            transactionId: selectedTransaction?.id ?? "",
          })
        : useAddTransactionQuery({
            accountId: selectedAccountId,
            email: email,
            transaction: {
              amount: getValues("amount"),
              date: getValues("date"),
              description: getValues("description"),
              selectedCategory: getValues("selectedCategory"),
              operationType: getEnumValue(selectedOperationType, OperationType),
              currency: getEnumValue(formatEnumValueByString(getValues("currency")), Currency),
            },
          }),
    enabled: false,
  });

  const onSubmitAddOrUpdateTransaction = async () => {
    const { data, isError, error } = await addOrUpdateTransactionRefetch();
    if (isError) {
      toast.error(error.name, {
        description: error.message,
      });
    } else {
      toast.success(selectedTransaction?.id ? "Transaction updated!" : "Transaction added!");
      if (data?.addOrUpdateTransaction.accounts) {
        updateTransactionsData(data?.addOrUpdateTransaction.accounts);
      }
      reset();
      clearErrorsAndClose();
    }
  };

  const updateTransactionsData = (accounts: any) => {
    setTransactions(accounts[0].transactions);
    setExpenseAmount(accounts[0].expenseAmount);
    setIncomeAmount(accounts[0].incomeAmount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAddOrUpdateTransaction)}>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={"15px"}>
          <HStack>
            <FormControl>
              <Input
                type="number"
                step={"0.01"}
                disabled={addOrUpdateTransactionIsLoading}
                placeholder={`Amount`}
                {...register("amount")}
              />
              <FormErrorHelperText>{errors.amount?.message}</FormErrorHelperText>
            </FormControl>
            <FormControl>
              <Controller
                control={control}
                name="currency"
                defaultValue={currencyOptions.find((c) => c.value == currency)?.value}
                render={() => (
                  <Select
                    defaultValue={currencyOptions.find((c) => c.value == currency)}
                    options={currencyOptions}
                    isDisabled={addOrUpdateTransactionIsLoading}
                    onChange={(selectedCurrency) => {
                      setValue("currency", selectedCurrency?.value ?? Currency.Undefined);
                    }}
                  />
                )}
              />
              <FormErrorHelperText>{errors.currency?.message}</FormErrorHelperText>
            </FormControl>
          </HStack>
          <FormControl>
            <RadioOperationTypes
              selectInputRef={selectInputRef}
              setValue={setValue}
              setSelectedOperationType={setSelectedOperationType}
            />
            <FormErrorHelperText>
              <Text textAlign={"center"}>{errors.operationType?.message}</Text>
            </FormErrorHelperText>
          </FormControl>
          <FormControl>
            <FormControl>
              <Controller
                control={control}
                name="selectedCategory"
                defaultValue={selectedCategory?.name}
                render={() => (
                  <Select
                    ref={
                      selectInputRef as React.RefObject<SelectInstance<UserCategory, false, GroupBase<UserCategory>>>
                    }
                    defaultValue={selectedCategory}
                    isDisabled={addOrUpdateTransactionIsLoading || selectedOperationType == ""}
                    placeholder={"Select Category..."}
                    getOptionLabel={(category) => category.name}
                    getOptionValue={(category) => category.name}
                    options={selectedOperationType === "Expense" ? expenseCategories : incomeCategories}
                    onChange={(option) => {
                      setValue("selectedCategory", option?.name ?? "");
                    }}
                  />
                )}
              />
            </FormControl>
            <FormErrorHelperText>{errors.selectedCategory?.message}</FormErrorHelperText>
          </FormControl>
          <FormControl>
            <Input disabled={addOrUpdateTransactionIsLoading} placeholder="Description" {...register("description")} />
            <FormErrorHelperText>{errors.description?.message}</FormErrorHelperText>
          </FormControl>
          <FormControl>
            <Input disabled={addOrUpdateTransactionIsLoading} type="date" {...register("date")} />
            <FormErrorHelperText>{errors.date?.message}</FormErrorHelperText>
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="teal" type="submit" isLoading={addOrUpdateTransactionIsLoading}>
          {selectedTransaction == undefined ? "Add" : "Edit"}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default TransactionModalForm;
