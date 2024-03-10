import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";

export const CategoryDialogAddSubcategoriesColumns: ColumnDef<string>[] = [
  {
    header: "Name",
    cell: ({ row }) => <p>{row.original}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];
