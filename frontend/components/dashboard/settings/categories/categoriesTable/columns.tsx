import { Button } from "@/components/shadcnComponents/button";
import { Category, OperationType } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Rows3, X } from "lucide-react";
import DeleteCategoryDialog from "../deleteCategoryDialog/deleteCategoryDialog";
import EditCategoryDialog from "@/components/dashboard/settings/categories/editCategoryDialog/editCategoryDialog";
import SubCategoryDialog from "@/components/dashboard/settings/categories/subCategoryDialog/subCategoryDIalog";

export const CategoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div
        className={`font-bold ${
          row.original.categoryType === OperationType.Income ? "text-teal-600" : "text-red-400"
        } `}
      >
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "subCategories",
    header: "Total sub categories",
    cell: ({ row }) => <div>{row.original.subCategories?.length}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.name !== "Other" && (
          <>
            <EditCategoryDialog selectedItem={row.original}>
              <Button variant={"ghost"} size={"icon"}>
                <Pencil className="h-4 w-4" />
              </Button>
            </EditCategoryDialog>
            <DeleteCategoryDialog selectedItem={row.original}>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </DeleteCategoryDialog>
            <SubCategoryDialog category={row.original}>
              <Button variant={"ghost"} size={"icon"}>
                <Rows3 className="h-4 w-4" />
              </Button>
            </SubCategoryDialog>
          </>
        )}
      </div>
    ),
  },
];
