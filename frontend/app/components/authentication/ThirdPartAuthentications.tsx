import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";

export const ThirdPartAuthentications = () => {
  return (
    <div className="flex w-full justify-between">
      <div>
        <Button variant={"outline"}>
          <Apple />
        </Button>
      </div>
      <div>
        <Button variant={"outline"}>G</Button>
      </div>
    </div>
  );
};
