import TransactionsSearchbarForm from "./transactionsSearchbarForm";
import { Card, CardContent } from "@/components/shadcnComponents/card";

const TransactionsSearchbar = () => {
  return (
    <Card>
      <div className="mt-5"></div>
      <CardContent>
        <TransactionsSearchbarForm />
      </CardContent>
    </Card>
  );
};

export default TransactionsSearchbar;
