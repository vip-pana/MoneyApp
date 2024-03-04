import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MonthChange = () => {
  return (
    <div className="flex items-center mt-2">
      <Button variant={"ghost"}>
        <ChevronLeft />
      </Button>
      <p className="leading-7">January</p>
      <Button variant={"ghost"}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthChange;
