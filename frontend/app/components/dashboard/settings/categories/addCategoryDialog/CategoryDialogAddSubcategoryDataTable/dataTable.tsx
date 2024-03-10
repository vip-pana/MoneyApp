import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CategoryDialogAddSubcategoriesColumns } from "./columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoriesColumns } from "../../categoriesTable/columns";

const CategoryDialogAddSubCategoryDataTable = () => {
  const table = useReactTable({
    data: [],
    columns: CategoryDialogAddSubcategoriesColumns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    // onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(),

    // state: {
    //   pagination,
    //   columnFilters,
    // },
  });

  return (
    <div className="rounded-md border mt-5">
      <Table>
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
                No Subcategories
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryDialogAddSubCategoryDataTable;
