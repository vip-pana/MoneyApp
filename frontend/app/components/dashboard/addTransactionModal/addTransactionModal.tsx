import { Currency, OperationType } from "@/gql/generated/graphql";
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
import { getEnum } from "@/utils/getEnum";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useAddTransactionQuery } from "@/utils/definitions/useQueryDefinition";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const AddTransactionModal = ({ isOpen, onClose }: { onClose: () => void; isOpen: boolean }) => {
  const form = useForm<TransactionModalFormValueDefinition>({
    resolver: zodResolver(formAddTransactionModalValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    resetField,
    clearErrors,
  } = form;
  const toast = useToast();

  useEffect(() => {
    const date = new Date();
    const formattedDate = format(date, "yyyy-MM-dd");
    setValue("date", formattedDate);
  });

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
      setValue("operationType", getEnum(value, OperationType));
      setValue("selectedCategory", "");
      setSelectedOperationType(value);
    },
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

  const { refetch, isLoading } = useQuery({
    queryKey: ["addTransaction"],
    queryFn: () =>
      useAddTransactionQuery({
        email: email,
        transaction: {
          amount: getValues("amount"),
          currency: getEnum(formatEnum(getValues("currency")), Currency),
          date: getValues("date"),
          description: getValues("description"),
          selectedCategory: getValues("selectedCategory"),
          operationType: getEnum(selectedOperationType, OperationType),
        },
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const formatEnum = (enumToFormat: string) => {
    let value = enumToFormat.toLowerCase();
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  };

  const onSubmit = async () => {
    console.log(getEnum(getValues("currency"), Currency));
    const { data, isError, error } = await refetch();
    if (isError) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    } else {
      toast({
        title: "Transaction saved!",
        status: "success",
      });
      resetAllFormFields();
      if (data?.addTransaction.accounts) {
        setTransactions(data?.addTransaction.accounts[0].transactions);
        setExpenseAmount(data?.addTransaction.accounts[0].expenseAmount);
        setIncomeAmount(data?.addTransaction.accounts[0].incomeAmount);
      }
      onClose();
    }
  };

  const resetAllFormFields = () => {
    resetField("amount");
    resetField("currency");
    resetField("date");
    resetField("description");
    resetField("operationType");
    resetField("selectedCategory");
  };

  const clearErrorsAndClose = () => {
    clearErrors();
    return onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={clearErrorsAndClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add transaction</ModalHeader>
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
                  />
                  <FormErrorHelperText>{errors.amount?.message}</FormErrorHelperText>
                </FormControl>
                <FormControl>
                  <Select
                    placeholder={"Currency"}
                    disabled={isLoading}
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
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTransactionModal;
