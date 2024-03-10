import TransactionsSearchbar from "@/app/components/dashboard/transactions/transactionsSearchbar/transactionsSearchbar";
import TransactionDataTable from "@/app/components/dashboard/transactions/transactionsTable/dataTable";

const TransactionPage = () => {
  return (
    <>
      <TransactionsSearchbar />
      <TransactionDataTable />
    </>
  );
};

export default TransactionPage;
