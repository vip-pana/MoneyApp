"use client";

import { useUserStore } from "@/lib/zustand/userStore";
import { Button } from "@/components/shadcnComponents/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/shadcnComponents/dropdown-menu";
import { User } from "lucide-react";
import { Separator } from "@/components/shadcnComponents/separator";
import { useState } from "react";
import MenuContentItems from "./avatarBox/menuContentItems";

const AvatarBox = ({ collapse }: { collapse: boolean }) => {
  const { name, surname } = useUserStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Separator className="flex w-full col-span-1 items-center justify-center mb-7" />
      {collapse ? (
        <DropdownMenu open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="focus:border-hidden hover:bg-transparent items-center justify-center dark:bg-transparent font-light capitalize"
            >
              {`${name} ${surname}`}
              <User className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <MenuContentItems setIsEditDialogOpen={setIsEditDialogOpen} />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent items-center justify-center dark:bg-transparent font-light"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mb-14" side="right">
            <MenuContentItems setIsEditDialogOpen={setIsEditDialogOpen} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AvatarBox;
