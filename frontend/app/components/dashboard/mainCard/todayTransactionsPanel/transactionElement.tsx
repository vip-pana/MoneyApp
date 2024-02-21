import { OperationType, Transaction } from "@/gql/generated/graphql";
import { Tr, Td, Stat, StatArrow, HStack, IconButton, Text } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";

const TransactionElement = ({
  transaction,
  index,
  setSelectedTransaction,
  onOpenDeleteTransactionDialog,
}: {
  transaction: Transaction;
  index: number;
  setSelectedTransaction: (value: React.SetStateAction<Transaction | undefined>) => void;
  onOpenDeleteTransactionDialog: () => void;
}) => {
  return (
    <Tr key={index}>
      <Td>
        <Stat>
          <Text>
            <StatArrow type={transaction.transactionType === OperationType.Income ? "increase" : "decrease"} />
            {transaction.amount} {transaction.currency}
          </Text>
        </Stat>
      </Td>
      <Td>{transaction.category?.name}</Td>
      <Td>{transaction.description}</Td>
      <Td>
        <HStack>
          <IconButton
            aria-label={"info"}
            icon={<LuTrash />}
            isRound
            variant={"outline"}
            colorScheme="red"
            size={"sm"}
            onClick={() => {
              setSelectedTransaction(transaction);
              onOpenDeleteTransactionDialog();
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default TransactionElement;
