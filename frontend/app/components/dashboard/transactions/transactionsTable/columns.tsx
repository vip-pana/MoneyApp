"use client";
import AlertDeleteTransactionDialog from "@/app/components/base/deleteTransactionDialog";
import TransactionDialog from "@/app/components/base/transactionModal/transactionDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OperationType, Transaction } from "@/gql/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { ArrowUpDown, FileEdit, MoreHorizontal, X } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <Badge className={`${row.original.transactionType === OperationType.Income ? "bg-teal-400" : "bg-red-400"}`}>
          {row.original.category?.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <div>
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div>{formatDate(row.original.dateTime, "yyyy-MM-dd")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-center">
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency.toString(),
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        <TransactionDialog selectedTransaction={row.original}>
          <Button variant="ghost" size="icon">
            <FileEdit className="h-4 w-4" />
          </Button>
        </TransactionDialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </AlertDialogTrigger>
          <AlertDeleteTransactionDialog selectedTransaction={row.original} />
        </AlertDialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Other actions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
