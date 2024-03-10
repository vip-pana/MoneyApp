import { Button } from "@/components/ui/button";
import { Category, OperationType } from "@/gql/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Rows3, X } from "lucide-react";
import EditCategoryDialog from "../editCategoryDialog/editCategoryDialog";
import DeleteCategoryDialog from "../deleteCategoryDialog/deleteCategoryDialog";
import SubCategoryDIalog from "../subCategoryDialog/subCategoryDIalog";

export const CategoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className={`${row.original.categoryType === OperationType.Income ? "text-teal-600" : "text-red-400"} `}>
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
        <SubCategoryDIalog selectedItem={row.original}>
          <Button variant={"ghost"} size={"icon"}>
            <Rows3 className="h-4 w-4" />
          </Button>
        </SubCategoryDIalog>
      </div>
    ),
  },
];
