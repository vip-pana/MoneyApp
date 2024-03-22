"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcnComponents/dialog";
import { useState } from "react";
import AddCategoryDialogForm from "./addCategoryDialogForm";

const AddCategoryDialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
        </DialogHeader>
        <AddCategoryDialogForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
