import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { TransactionModalFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { formAddTransactionModalValidation as formTransactionModalValidation } from "@/utils/definitions/typeValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "@/gql/generated";
import { useUserStore } from "@/utils/zustand/userStore";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import RadioOperationTypeElement from "../../addTransactionModal/radioOperationTypeElement";
import { useQuery } from "@tanstack/react-query";
import { getEnum } from "@/utils/enumUtils";
import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";
import { useUpdateTransactionQuery } from "@/utils/definitions/useQueryDefinition";
import { format } from "date-fns";

const UpdateTransactionModal = ({
  isOpen,
  onClose,
  selectedTransaction,
}: {
  onClose: () => void;
  isOpen: boolean;
  selectedTransaction: TransactionInput | undefined;
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

  const form = useForm<TransactionModalFormValueDefinition>({
    resolver: zodResolver(formTransactionModalValidation),
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
    setValuesBySelectedTransaction();
  }, []);

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

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    } else {
      toast({
        title: "Transaction updated!",
        status: "success",
      });
      reset();
      if (data?.updateTransaction.accounts) {
        setTransactions(data?.updateTransaction.accounts[0].transactions);
        setExpenseAmount(data?.updateTransaction.accounts[0].expenseAmount);
        setIncomeAmount(data?.updateTransaction.accounts[0].incomeAmount);
      }
      onClose();
    }
  };

  const { refetch, isLoading } = useQuery({
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
          operationType: getEnum(selectedOperationType, OperationType),
          currency: getEnum(getValues("currency"), Currency),
        },
        transactionId: selectedTransaction?.id ?? "",
      }),
    enabled: false,
  });

  const getDefaultValueRadioGroup = (): string => {
    // TO-DO: sistemare radio element selezione iniziale che va a membro di segugio
    return selectedTransaction?.transactionType == OperationType.Expense ? "Expense" : "Income";
  };

  const [selectedOperationType, setSelectedOperationType] = useState<string>("");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Operation Type",
    onChange: (value) => {
      setValue("operationType", getEnum(value, OperationType));
      setValue("selectedCategory", "");
      setSelectedOperationType(value);
    },
    defaultValue: getDefaultValueRadioGroup(),
  });
  const group = getRootProps();

  const clearErrorsAndClose = (onClose: () => void) => {
    clearErrors();
    return onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => clearErrorsAndClose(onClose)}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"15px"}>
              <HStack>
                <FormControl>
                  <Input
                    type="number"
                    step={"0.01"}
                    disabled={isLoading}
                    placeholder={`Amount`}
                    {...register("amount")}
                    defaultValue={currency.toString()}
                  />
                  <FormErrorHelperText>{errors.amount?.message}</FormErrorHelperText>
                </FormControl>
                <FormControl>
                  <Select placeholder={"Currency"} disabled={isLoading} {...register("currency")}>
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
                          {OperationType[value]}
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
                  <Select disabled={isLoading} placeholder={"Category"} {...register("selectedCategory")}>
                    {expenseCategories?.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                ) : (
                  <Select disabled={isLoading} placeholder={"Category"} {...register("selectedCategory")}>
                    {incomeCategories?.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                )}
                <FormErrorHelperText>{errors.selectedCategory?.message}</FormErrorHelperText>
              </FormControl>
              <FormControl>
                <Input disabled={isLoading} placeholder="Description" {...register("description")} />
                <FormErrorHelperText>{errors.description?.message}</FormErrorHelperText>
              </FormControl>
              <FormControl>
                <Input disabled={isLoading} type="date" placeholder="Date" {...register("date")} />
                <FormErrorHelperText>{errors.date?.message}</FormErrorHelperText>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTransactionModal;
