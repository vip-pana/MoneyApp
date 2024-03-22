"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CategoriesColumns } from "./columns";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcnComponents/table";
import { Button } from "@/components/shadcnComponents/button";
import { Input } from "@/components/shadcnComponents/input";
import { useUserStore } from "@/lib/zustand/userStore";
import { useCategoryTableStore } from "@/lib/zustand/categoryTableStore";
import AddCategoryDialog from "../addCategoryDialog/addCategoryDialog";

const CategoriesDataTable = () => {
  const { incomeCategories, expenseCategories } = useUserStore();
  const { categoriesFiltered, setCategoriesFiltered } = useCategoryTableStore();

  useEffect(() => {
    setCategoriesFiltered([...incomeCategories, ...expenseCategories]);
  }, [incomeCategories, expenseCategories]);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 5, //default page size
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: categoriesFiltered,
    columns: CategoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex justify-between items-end my-4 gap-4">
        <div className="flex items-center ">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <AddCategoryDialog>
          <Button>Add Category</Button>
        </AddCategoryDialog>
      </div>
      <div className="rounded-md border mt-2">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={CategoriesColumns.length} className="h-24 text-center">
                  No Categories
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button variant={"outline"} size={"sm"}>
          {table.getState().pagination.pageIndex + 1}
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">Total rows: {table.getFilteredRowModel().rows.length}.</div>
    </>
  );
};

export default CategoriesDataTable;
