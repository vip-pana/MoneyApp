import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { CategoryInput, Currency, TransactionInputTypeInput } from "@/gql/generated/graphql";
import { TransactionModalFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { currencyOptions } from "@/utils/enumUtils";
import { VStack, HStack, FormControl, ModalFooter, Button, Input } from "@chakra-ui/react";
import { Select, SelectInstance, GroupBase } from "chakra-react-select";
import { Controller, UseFormReturn } from "react-hook-form";
import RadioOperationTypes from "./radioOperationTypes";
import { graphql } from "@/gql/generated";
import { useAddOrUpdateTransactionMutation } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { manageApiCallErrors } from "@/utils/errorUtils";

interface TransactionModalFormProps {
  selectedTransaction?: TransactionInputTypeInput | undefined;
  form: UseFormReturn<TransactionModalFormValueDefinition>;
  clearErrorsAndClose: () => void;
}

const TransactionModalForm = (props: TransactionModalFormProps) => {
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

  const { setTransactionsFiltered } = useTransactionTableStore();

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = props.form;

  const [selectedOperationType, setSelectedOperationType] = useState<string>("");
  const selectInputRef = useRef<SelectInstance<CategoryInput, false, GroupBase<CategoryInput>>>();

  useEffect(() => {
    if (props.selectedTransaction) {
      setValuesBySelectedTransaction(props.selectedTransaction);
    } else {
      setDateValueOnTransaction();
    }
  }, [props.selectedTransaction]);

  const setValuesBySelectedTransaction = (transaction: TransactionInputTypeInput) => {
    setValue("amount", transaction.amount.toString());
    setValue("currency", transaction.currency);
    setValue("description", transaction.description);
    setValue("category", transaction.category);
    setValue("operationType", transaction.transactionType);
    setSelectedOperationType(transaction.transactionType.toString());
    setDateValueOnTransaction(transaction.dateTime);
  };

  const setDateValueOnTransaction = (datetime?: any) => {
    const date = datetime ? new Date(datetime) : new Date();
    const formattedDate = format(date, "yyyy-MM-dd");
    setValue("date", formattedDate);
  };

  const addOrUpdateTransactionMutation = graphql(`
    mutation addOrUpdateTransaction($transactionInput: AddOrUpdateTransactionInputTypeInput!) {
      addOrUpdateTransaction(input: { transactionInput: $transactionInput }) {
        user {
          accounts {
            ...accountFields
          }
        }
        errors {
          ...errorFields
        }
      }
    }
  `);

  const { refetch: addOrUpdateTransactionRefetch, isLoading: addOrUpdateTransactionIsLoading } = useQuery({
    queryKey: ["addOrUpdateTransaction"],
    queryFn: () =>
      useAddOrUpdateTransactionMutation({
        accountId: selectedAccountId,
        email: email,
        transaction: getValues(),
        transactionId: props.selectedTransaction?.id ?? undefined,
      }),
    enabled: false,
  });

  const onSubmitAddOrUpdateTransaction = async () => {
    const { data, isError, error } = await addOrUpdateTransactionRefetch();
    if (isError || data?.addOrUpdateTransaction.errors) {
      manageApiCallErrors(error, data?.addOrUpdateTransaction.errors);
    } else if (data?.addOrUpdateTransaction.user?.accounts) {
      toast.success(props.selectedTransaction?.id ? "Transaction updated!" : "Transaction added!");
      updateTransactionsData(data.addOrUpdateTransaction.user.accounts);

      reset();
      props.clearErrorsAndClose();
    }
  };

  const updateTransactionsData = (accounts: any) => {
    setTransactions(accounts[0].transactions);
    setTransactionsFiltered(accounts[0].transactions);
    setExpenseAmount(accounts[0].expenseAmount);
    setIncomeAmount(accounts[0].incomeAmount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAddOrUpdateTransaction)}>
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
            getValues={getValues}
            control={control}
            register={register}
            selectInputRef={selectInputRef}
            setValue={setValue}
            setSelectedOperationType={setSelectedOperationType}
          />
          <FormErrorHelperText centered>{errors.operationType?.message}</FormErrorHelperText>
        </FormControl>
        <FormControl>
          <FormControl>
            <Controller
              control={control}
              name="category"
              defaultValue={props.selectedTransaction?.category}
              render={() => (
                <Select
                  ref={
                    selectInputRef as React.RefObject<SelectInstance<CategoryInput, false, GroupBase<CategoryInput>>>
                  }
                  defaultValue={props.selectedTransaction?.category}
                  isDisabled={addOrUpdateTransactionIsLoading || selectedOperationType == ""}
                  placeholder={"Select Category..."}
                  getOptionLabel={(category) => category.name}
                  getOptionValue={(category) => category.name}
                  options={selectedOperationType === "Expense" ? expenseCategories : incomeCategories}
                  onChange={(option) => {
                    if (option) setValue("category", option);
                  }}
                />
              )}
            />
          </FormControl>
          <FormErrorHelperText>{errors.category?.message}</FormErrorHelperText>
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
      <ModalFooter>
        <Button colorScheme="teal" type="submit" isLoading={addOrUpdateTransactionIsLoading}>
          {props.selectedTransaction ? "Edit" : "Add"}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default TransactionModalForm;
