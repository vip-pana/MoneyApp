"use client";

import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, SlidersHorizontal, Trash2 } from "lucide-react";
import { useUserStore } from "@/utils/zustand/userStore";
import { useTransactionTableStore } from "@/utils/zustand/transactionTableStore";
import { columns } from "./columns";
import DeleteTransactionListDialog from "@/app/components/base/deleteTransactionListDialog";

const DataTableTransactionTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const { transactions } = useUserStore();
  const { transactionsFiltered, setTransactionsFiltered } = useTransactionTableStore();

  React.useEffect(() => {
    setTransactionsFiltered(transactions);
  }, []);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 6, //default page size
  });

  const table = useReactTable({
    data: transactionsFiltered,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state

    state: {
      sorting,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div>
      {table.getFilteredRowModel().rows.length > 0 && (
        <div className="flex items-center mt-2 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="ml-auto">
                <SlidersHorizontal className="w-4 h-4 mr-3" />
                View
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {table.getFilteredSelectedRowModel().rows.length >= 1 && (
            <DeleteTransactionListDialog
              selectedTransactionList={table.getFilteredSelectedRowModel().flatRows.map((t) => t.original)}
            >
              <Button variant={"destructive"}>
                <Trash2 className=" h-4 w-4" />
              </Button>
            </DeleteTransactionListDialog>
          )}
        </div>
      )}
      <div className="rounded-md border mt-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Transactions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-2">
        <Button variant={"outline"} size={"sm"} onClick={() => table.nextPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
};

export default DataTableTransactionTable;
