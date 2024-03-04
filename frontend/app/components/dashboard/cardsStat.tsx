import TransactionCard from "./transactionCard";
import MonthChange from "./monthChange";

const CardsStat = () => {
  return (
    <>
      <div className="flex justify-center">
        <MonthChange />
      </div>
      <div className="flex mt-5 space-x-10 w-full">
        <div className="w-full">
          <TransactionCard isIncome={true} />
        </div>
        <div className="w-full">
          <TransactionCard isIncome={false} />
        </div>
      </div>
    </>
  );
};

export default CardsStat;
