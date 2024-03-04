import TodayTransactionsPanel from "./todayTransactionsPanel/todayTransactionsPanel";
import { Card, CardContent } from "@/components/ui/card";

const MainCard = () => {
  return (
    <Card>
      <CardContent className="mt-5">
        <TodayTransactionsPanel />
      </CardContent>
    </Card>
  );
};

export default MainCard;
