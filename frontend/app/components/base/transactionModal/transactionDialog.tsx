"use client";
import TransactionModalForm from "./transactionDialogForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Transaction } from "@/gql/generated/graphql";
import { useState } from "react";

const TransactionDialog = ({
  selectedTransaction,
  children,
}: {
  selectedTransaction?: Transaction;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedTransaction == null || selectedTransaction == undefined ? "Add transaction" : "Edit transaction"}
          </DialogTitle>
        </DialogHeader>
        <TransactionModalForm setIsOpen={setIsOpen} selectedTransaction={selectedTransaction} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
