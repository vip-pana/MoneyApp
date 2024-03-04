"use client";

import SignupDialog from "./signupDialog/signupDialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SecondActions = () => {
  return (
    <>
      <div className="flex w-full mt-12 space-x-40">
        <SignupDialog />
        <div className="flex items-center">
          <div className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Hover</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Please, first insert email.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondActions;
