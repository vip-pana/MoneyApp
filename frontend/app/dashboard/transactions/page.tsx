import TransactionsSearchbar from "@/app/components/dashboard/transactions/transactionsSearchbar/transactionsSearchbar";
import DataTableTransactionTable from "@/app/components/dashboard/transactions/transactionsTable/dataTable";

const TransactionPage = () => {
  return (
    <>
      <TransactionsSearchbar />
      <DataTableTransactionTable />
    </>
  );
};

export default TransactionPage;
