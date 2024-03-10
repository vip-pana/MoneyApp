import { Button } from "@/components/ui/button";
import { TableRow, TableBody, TableCell, Table } from "@/components/ui/table";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const CategoryDialogAddSubCategoryTable = ({
  data,
  setData,
}: {
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <Table className="mb-4">
      <TableBody className="overflow-y-auto max-h-4">
        {data.map((s, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{s}</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => {
                  setData(data.filter((el) => el !== s));
                }}
                variant="ghost"
                size="icon"
                className="w-4 h-4"
                type="button"
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryDialogAddSubCategoryTable;
