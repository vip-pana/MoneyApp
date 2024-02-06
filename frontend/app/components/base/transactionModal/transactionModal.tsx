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
  Select,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import RadioOperationTypeElement from "./radioOperationTypeElement";
import { useForm } from "react-hook-form";
import { TransactionModalFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { zodResolver } from "@hookform/resolvers/zod";
import { formAddTransactionModalValidation } from "@/utils/definitions/typeValidation";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { formatEnumValue, getEnumValue } from "@/utils/enumUtils";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import {
  useAddTransactionQuery as UseAddTransactionQuery,
  useUpdateTransactionQuery as UseUpdateTransactionQuery,
} from "@/utils/definitions/useQueryDefinition";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
    } else {
      const date = new Date();
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("date", formattedDate);
    }
  });

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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Operation Type",
    onChange: (value) => {
      setValue("operationType", getEnumValue(value, OperationType));
      setValue("selectedCategory", "");
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
      UseAddTransactionQuery({
        email: email,
        transaction: {
          amount: getValues("amount"),
          date: getValues("date"),
          description: getValues("description"),
          selectedCategory: getValues("selectedCategory"),
          operationType: getEnumValue(selectedOperationType, OperationType),
          currency: getEnumValue(formatEnumValue(getValues("currency")), Currency),
        },
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const { refetch: updateTransactionRefetch, isLoading: updateTransactionIsLoading } = useQuery({
    queryKey: ["updateTransaction"],
    queryFn: () =>
      UseUpdateTransactionQuery({
        accountId: selectedAccountId,
        email: email,
        transaction: {
          amount: getValues("amount"),
          date: getValues("date"),
          description: getValues("description"),
          selectedCategory: getValues("selectedCategory"),
          operationType: getEnumValue(selectedOperationType, OperationType),
          currency: getEnumValue(getValues("currency"), Currency),
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
                  <Select
                    placeholder={"Currency"}
                    disabled={addTransactionIsLoading || updateTransactionIsLoading}
                    {...register("currency")}
                    defaultValue={currency.toString()}
                  >
                    {(Object.keys(Currency) as Array<keyof typeof Currency>).map((value) => (
                      <option key={value} value={Currency[value]}>
                        {Currency[value].toUpperCase()}
                      </option>
                    ))}
                  </Select>
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
                {selectedOperationType === "Expense" ? (
                  <Select
                    disabled={addTransactionIsLoading || updateTransactionIsLoading}
                    placeholder={"Category"}
                    {...register("selectedCategory")}
                  >
                    {expenseCategories?.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    disabled={addTransactionIsLoading || updateTransactionIsLoading}
                    placeholder={"Category"}
                    {...register("selectedCategory")}
                  >
                    {incomeCategories?.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                )}
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
                  placeholder="Date"
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
