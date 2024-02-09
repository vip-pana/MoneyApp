import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  HStack,
  useRadioGroup,
  Center,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import RadioOperationTypeElement from "./radioOperationTypeElement";
import { Controller, useForm } from "react-hook-form";
import { TransactionModalFormValueDefinition, UserCategory } from "@/utils/definitions/typeDefinition";
import { zodResolver } from "@hookform/resolvers/zod";
import { formAddTransactionModalValidation } from "@/utils/definitions/typeValidation";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { formatEnumValueByString, getEnumValue } from "@/utils/enumUtils";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useAddTransactionQuery, useUpdateTransactionQuery } from "@/utils/definitions/useQueryDefinition";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { GroupBase, Select, SelectInstance } from "chakra-react-select";

const TransactionModal = ({
  isOpen,
  onClose,
  selectedTransaction,
}: {
  onClose: () => void;
  isOpen: boolean;
  selectedTransaction?: TransactionInput | undefined;
}) => {
  const form = useForm<TransactionModalFormValueDefinition>({
    resolver: zodResolver(formAddTransactionModalValidation),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    reset,
  } = form;
  const toast = useToast();

  useEffect(() => {
    if (selectedTransaction != null && selectedTransaction != undefined) {
      setValuesBySelectedTransaction();
      setSelectedCategoryBySelectedTransaction();
    } else {
      const date = new Date();
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("date", formattedDate);
    }
  }, [selectedTransaction]);

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
      setSelecteCategory(res);
    }
  };

  const setValuesBySelectedTransaction = () => {
    setValue("amount", (selectedTransaction?.amount ?? 0).toString());
    setValue("currency", selectedTransaction?.currency ?? currency);
    setValue("description", selectedTransaction?.description ?? "");
    setValue("selectedCategory", selectedTransaction?.category?.name ?? "");

    const operationTypeValue = getDefaultValueRadioGroup();
    setValue("operationType", selectedTransaction?.transactionType ?? OperationType.Expense);
    setSelectedOperationType(operationTypeValue);

    if (selectedTransaction?.dateTime) {
      const date = new Date(selectedTransaction?.dateTime ?? "");
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("date", formattedDate);
    }
  };

  const getDefaultValueRadioGroup = (): string => {
    // TO-DO: sistemare radio element selezione iniziale che va a membro di segugio
    return selectedTransaction?.transactionType == OperationType.Expense ? "Expense" : "Income";
  };

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
  const [selectedOperationType, setSelectedOperationType] = useState<string>("");
  const [selectedCategory, setSelecteCategory] = useState<UserCategory>();
  const selectInputRef = useRef<SelectInstance<UserCategory, false, GroupBase<UserCategory>>>();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Operation Type",
    onChange: (value) => {
      setValue("operationType", getEnumValue(value, OperationType));
      setValue("selectedCategory", "");
      if (selectInputRef.current) {
        selectInputRef.current.clearValue();
      }
      setSelectedOperationType(value);
    },
    defaultValue: getDefaultValueRadioGroup(),
  });
  const group = getRootProps();

  const addTransactionQueryDocument = graphql(`
    mutation addTransaction($user: UserInput!, $transaction: TransactionInput!, $accountId: String!) {
      addTransaction(user: $user, transaction: $transaction, accountId: $accountId) {
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

  const updateTransactionQueryDocument = graphql(`
    mutation updateTransaction($user: UserInput!, $transaction: TransactionInput!, $accountId: String!) {
      updateTransaction(user: $user, transaction: $transaction, accountId: $accountId) {
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

  const { refetch: addTransactionRefetch, isLoading: addTransactionIsLoading } = useQuery({
    queryKey: ["addTransaction"],
    queryFn: () =>
      useAddTransactionQuery({
        email: email,
        transaction: {
          amount: getValues("amount"),
          date: getValues("date"),
          description: getValues("description"),
          selectedCategory: getValues("selectedCategory"),
          operationType: getEnumValue(selectedOperationType, OperationType),
          currency: getEnumValue(formatEnumValueByString(getValues("currency")), Currency),
        },
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const { refetch: updateTransactionRefetch, isLoading: updateTransactionIsLoading } = useQuery({
    queryKey: ["updateTransaction"],
    queryFn: () =>
      useUpdateTransactionQuery({
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
      }),
    enabled: false,
  });

  const onSubmitAddTransaction = async () => {
    const { data, isError, error } = await addTransactionRefetch();
    if (isError) {
      showToast(undefined, error);
    } else {
      showToast("Transaction added!");
      if (data?.addTransaction.accounts) {
        updateTransactionsData(data?.addTransaction.accounts);
      }
      reset();
      clearErrorsAndClose();
    }
  };

  const onSubmitUpdateTransaction = async () => {
    const { data, isError, error } = await updateTransactionRefetch();
    if (isError) {
      showToast(undefined, error);
    } else {
      showToast("Transaction updated!");
      if (data?.updateTransaction.accounts) {
        updateTransactionsData(data?.updateTransaction.accounts);
      }
      reset();
      onClose();
    }
  };

  const showToast = (title?: string, error?: Error) => {
    if (error) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    } else {
      toast({
        title: title,
        status: "success",
      });
    }
  };

  const updateTransactionsData = (accounts: any) => {
    setTransactions(accounts[0].transactions);
    setExpenseAmount(accounts[0].expenseAmount);
    setIncomeAmount(accounts[0].incomeAmount);
  };

  const clearErrorsAndClose = () => {
    clearErrors();
    return onClose();
  };

  const currencyOptions = Object.keys(Currency).map((key) => ({
    value: Currency[key as keyof typeof Currency],
    label: Currency[key as keyof typeof Currency].toUpperCase(),
  }));

  return (
    <Modal isOpen={isOpen} onClose={clearErrorsAndClose}>
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={handleSubmit(
            selectedTransaction == null || selectedTransaction == undefined
              ? onSubmitAddTransaction
              : onSubmitUpdateTransaction
          )}
        >
          <ModalHeader>
            {selectedTransaction == null || selectedTransaction == undefined ? "Add transaction" : "Edit transaction"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"15px"}>
              <HStack>
                <FormControl>
                  <Input
                    type="number"
                    step={"0.01"}
                    disabled={addTransactionIsLoading || updateTransactionIsLoading}
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
                        isDisabled={addTransactionIsLoading || updateTransactionIsLoading}
                        placeholder="Currency..."
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
                <Center>
                  <HStack {...group}>
                    {(Object.keys(OperationType) as Array<keyof typeof OperationType>).map((value) => {
                      const radio = getRadioProps({ value });
                      return (
                        <RadioOperationTypeElement key={value} {...radio} isIncome={value === "Income"}>
                          {value}
                        </RadioOperationTypeElement>
                      );
                    })}
                  </HStack>
                </Center>
                <FormErrorHelperText>
                  <Text textAlign={"center"}>{errors.operationType?.message}</Text>
                </FormErrorHelperText>
              </FormControl>
              <FormControl>
                <FormControl>
                  <Controller
                    control={control}
                    name="selectedCategory"
                    render={() => (
                      <Select
                        ref={
                          selectInputRef as React.RefObject<
                            SelectInstance<UserCategory, false, GroupBase<UserCategory>>
                          >
                        }
                        defaultValue={selectedCategory}
                        isDisabled={addTransactionIsLoading || updateTransactionIsLoading}
                        placeholder={"Select Category..."}
                        getOptionLabel={(category) => category.name}
                        getOptionValue={(category) => category.name}
                        options={selectedOperationType === "Expense" ? expenseCategories : incomeCategories}
                        onChange={(selectedCategory) => {
                          setValue("selectedCategory", selectedCategory?.name ?? "");
                        }}
                        // value={}
                        // defaultInputValue={selectedCategory?.name}
                      />
                    )}
                  />
                </FormControl>
                <FormErrorHelperText>{errors.selectedCategory?.message}</FormErrorHelperText>
              </FormControl>
              <FormControl>
                <Input
                  disabled={addTransactionIsLoading || updateTransactionIsLoading}
                  placeholder="Description"
                  {...register("description")}
                />
                <FormErrorHelperText>{errors.description?.message}</FormErrorHelperText>
              </FormControl>
              <FormControl>
                <Input
                  disabled={addTransactionIsLoading || updateTransactionIsLoading}
                  type="date"
                  {...register("date")}
                />
                <FormErrorHelperText>{errors.date?.message}</FormErrorHelperText>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" isLoading={addTransactionIsLoading || updateTransactionIsLoading}>
              {selectedTransaction == null || selectedTransaction == undefined ? "Add" : "Edit"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
