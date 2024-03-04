import MainContent from "../components/dashboard/mainContent";
import TransactionDialog from "../components/base/transactionModal/transactionDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboardlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-screen p-10">
      <MainContent>{children}</MainContent>
      <TransactionDialog>
        <div className="absolute bottom-16 right-12 ">
          <Button size={"icon"}>
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </TransactionDialog>
    </div>
  );
};

export default Dashboardlayout;
