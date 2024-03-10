import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Category, OperationType } from "@/gql/generated/graphql";
import { useState } from "react";
import EditCategoryNameForm from "./editCategoryNameForm";

const EditCategoryDialog = ({ selectedItem, children }: { selectedItem: Category; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row">
              <p>Edit</p>
              <div
                className={`${
                  selectedItem.categoryType === OperationType.Income ? "text-teal-400" : "text-red-400"
                } text-md ml-1`}
              >
                {selectedItem?.name}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <EditCategoryNameForm selectedItem={selectedItem} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
