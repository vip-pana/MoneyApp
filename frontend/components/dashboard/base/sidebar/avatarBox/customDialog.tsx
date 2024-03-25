import { Button } from "@/components/shadcnComponents/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcnComponents/dialog";
import { Input } from "@/components/shadcnComponents/input";
import { Label } from "@/components/shadcnComponents/label";
import { Dispatch, SetStateAction } from "react";

const CustomDialog = ({ setIsEditDialogOpen }: { setIsEditDialogOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-start justify-start cursor-default">Edit...</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
