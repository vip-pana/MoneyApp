"use client";
import TransactionModalForm from "./transactionDialogForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Transaction } from "@/gql/generated/graphql";
import { useState } from "react";

const TransactionDialog = ({ selectedItem, children }: { selectedItem?: Transaction; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedItem == null || selectedItem == undefined ? "Add transaction" : "Edit transaction"}
          </DialogTitle>
        </DialogHeader>
        <TransactionModalForm setIsOpen={setIsOpen} selectedItem={selectedItem} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
