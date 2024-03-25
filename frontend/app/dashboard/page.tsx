import CardsStat from "../../components/dashboard/cardsStat";
import MainCard from "../../components/dashboard/mainCard/mainCard";

const Dashboard = () => {
  return (
    <>
      <center>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">My transactions </h4>
      </center>
      <CardsStat />
      <div className="mt-5">
        <MainCard />
      </div>
    </>
  );
};

export default Dashboard;
