import { DollarSign } from "lucide-react";

const SidebarLogo = ({ collapse }: { collapse: boolean }) => {
  return (
    <div className="flex w-full items-center justify-between flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2">
        <DollarSign className={`text-2xl text-center ${collapse ? "ml-0" : "ml-3"}`} />
        {collapse && <p className="font-bold text-lg">MoneyApp</p>}
      </div>
    </div>
  );
};

export default SidebarLogo;
