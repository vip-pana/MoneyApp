import { Button } from "./button";
import { Loader } from "lucide-react";
const CustomButtonSubmit = ({
  title,
  isLoading,
  isDistructive = false,
}: {
  title: string;
  isLoading: boolean;
  isDistructive?: boolean;
}) => {
  return (
    <>
      <Button type="submit" className="w-full" variant={isDistructive ? "destructive" : "default"}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </>
        ) : (
          <>{title}</>
        )}
      </Button>
    </>
  );
};

export default CustomButtonSubmit;
