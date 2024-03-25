import TransactionsSearchbar from "@/components/dashboard/transactions/transactionsSearchbar/transactionsSearchbar";
import TransactionDataTable from "@/components/dashboard/transactions/transactionsTable/dataTable";

const TransactionPage = () => {
  return (
    <>
      <TransactionsSearchbar />
      <TransactionDataTable />
    </>
  );
};

export default TransactionPage;
