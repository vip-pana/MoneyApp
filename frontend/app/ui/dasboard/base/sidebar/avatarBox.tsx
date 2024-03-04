"use client";

import { useUserStore } from "@/utils/zustand/userStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const AvatarBox = ({ collapse }: { collapse: boolean }) => {
  const { setTheme, theme } = useTheme();
  const profilePath = "/dashboard/settings/profile";
  const { name, surname } = useUserStore();

  return (
    <div
      className={`flex w-full ${collapse ? "flex-row" : "flex-col-reverse"} items-center justify-between ${
        collapse ? "border" : ""
      } ${collapse ? "rounded-full" : ""} ${collapse ? "shadow-lg" : ""} p-2 ${collapse ? "gap-2" : ""}`}
    >
      <Link href={profilePath}>
        <Avatar>
          <AvatarImage src="" alt={`${name} ${surname}`} />
          <AvatarFallback>{`${name.charAt(0)} ${surname.charAt(0)}`}</AvatarFallback>
        </Avatar>
      </Link>
      {collapse && (
        <div className="flex w-full flex-col justify-center items-start">
          <Link href={profilePath}>
            <small className="text-sm font-medium leading-none m-0">{`${name.charAt(0)}. ${surname}`}</small>
          </Link>
        </div>
      )}
      {!collapse ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={!collapse ? "mb-3" : ""} variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <Switch
              onCheckedChange={() => {
                var changeTheme = theme === "light" ? "dark" : "light";
                setTheme(changeTheme);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarBox;
