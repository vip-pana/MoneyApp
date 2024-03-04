import { OperationType, Transaction } from "@/gql/generated/graphql";
import { Tr, Td, Stat, StatArrow, HStack, IconButton, Text } from "@chakra-ui/react";
import { Trash } from "lucide-react";

const TransactionElement = ({
  transaction,
  index,
  setSelectedTransaction,
}: {
  transaction: Transaction;
  index: number;
  setSelectedTransaction: (value: React.SetStateAction<Transaction | undefined>) => void;
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
            icon={<Trash />}
            isRound
            variant={"outline"}
            colorScheme="red"
            size={"sm"}
            onClick={() => {
              setSelectedTransaction(transaction);
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default TransactionElement;
