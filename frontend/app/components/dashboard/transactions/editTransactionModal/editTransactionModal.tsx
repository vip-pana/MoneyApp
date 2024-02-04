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
import { getEnum } from "@/utils/getEnum";
import { Currency, OperationType, TransactionInput } from "@/gql/generated/graphql";
import { useAddTransactionQuery } from "@/utils/definitions/useQueryDefinition";

const EditTransactionModal = ({
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
    resetField,
  } = form;
  const toast = useToast();

  useEffect(() => {
    setValue("amount", selectedTransaction?.amount ?? 0);
    setValue("currency", selectedTransaction?.currency ?? currency);
    setValue("description", selectedTransaction?.description ?? "");
    setValue("selectedCategory", selectedTransaction?.category?.name ?? "");
    // setValue("date", new Date(selectedTransaction?.dateTime));
  });

  const editTransactionQueryDocument = graphql(``);

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
      resetAllFormFields();
      if (data?.addTransaction.accounts) {
        setTransactions(data?.addTransaction.accounts[0].transactions);
        setExpenseAmount(data?.addTransaction.accounts[0].expenseAmount);
        setIncomeAmount(data?.addTransaction.accounts[0].incomeAmount);
      }
      onClose();
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["addTransaction"],
    queryFn: () =>
      useAddTransactionQuery({
        email: email,
        transaction: {
          amount: getValues("amount"),
          currency: getEnum(getValues("currency"), Currency),
          date: getValues("date"),
          description: getValues("description"),
          selectedCategory: getValues("selectedCategory"),
          operationType: getEnum(selectedOperationType, OperationType),
        },
        accountId: selectedAccountId,
      }),
    enabled: false,
  });

  const resetAllFormFields = () => {
    resetField("amount");
    resetField("currency");
    resetField("date");
    resetField("description");
    resetField("operationType");
    resetField("selectedCategory");
  };

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditTransactionModal;
