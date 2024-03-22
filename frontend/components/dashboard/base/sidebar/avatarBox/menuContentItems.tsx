import {
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
} from "@/components/shadcnComponents/dropdown-menu";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import CustomDialog from "./customDialog";
import Link from "next/link";

const MenuContentItems = ({ setIsEditDialogOpen }: { setIsEditDialogOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { setTheme } = useTheme();
  const profilePath = "/dashboard/settings/profile";
  const settingsPath = "/dashboard/settings";
  const [position, setPosition] = React.useState("right");
  const router = useRouter();

  const executeLogout = () => {
    router.push("/login");
  };

  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href={profilePath}>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <Link href={settingsPath}>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Account</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="account1">Account 1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="account2">Account 2</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="account3">Account 3</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <CustomDialog setIsEditDialogOpen={setIsEditDialogOpen} />
                  </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Support
        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={executeLogout}>
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );
};

export default MenuContentItems;
