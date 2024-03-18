import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { Category, OperationType } from "@/gql/generated/graphql";
import React, { useState } from "react";
import SubCategoryDialogSingleRow from "./subCategoryDialogSingleRow";
import AddSubCategoryDialog from "./addSubCategory/addSubCategoryDialog";
import { Card } from "@/components/ui/card";

const SubCategoryDialog = ({ category, children }: { category: Category; children: React.ReactNode }) => {
  const [open, setIsOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">
            <div className="flex flex-row">
              <div
                className={`${
                  category.categoryType === OperationType.Income ? "text-teal-400" : "text-red-400"
                } text-md mx-1`}
              >
                {category.name}
              </div>
              <p>Subcategories</p>
            </div>
          </DialogTitle>

          <div className="flex justify-between items-end my-4 gap-4">
            <div></div>
            <AddSubCategoryDialog categoryId={category.id} />
          </div>
        </DialogHeader>
        <div className="border rounded-2xl">
          {category.subCategories.length > 0 ? (
            <Table>
              <TableBody className="overflow-y-auto max-h-4">
                {category.subCategories.map((s, index) => {
                  return (
                    <SubCategoryDialogSingleRow s={s} categoryId={category.id} key={index} setIsOpen={setIsOpen} />
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card>
              <center className="m-5">No subcategories yet. 😵‍💫</center>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubCategoryDialog;
