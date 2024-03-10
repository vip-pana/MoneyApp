import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Category, OperationType } from "@/gql/generated/graphql";
import { useState } from "react";

const SubCategoryDIalog = ({ selectedItem, children }: { selectedItem: Category; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row">
              <div
                className={`${
                  selectedItem.categoryType === OperationType.Income ? "text-teal-400" : "text-red-400"
                } text-md mx-1`}
              >
                {selectedItem?.name}
              </div>
              <p>Sub categories</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        {/* <EditCategoryNameForm selectedItem={selectedItem} setIsOpen={setIsOpen} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default SubCategoryDIalog;
