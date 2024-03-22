import { Button } from "@/components/shadcnComponents/button";
import { Label } from "@/components/shadcnComponents/label";
import { Separator } from "@/components/shadcnComponents/separator";
import { Switch } from "@/components/shadcnComponents/switch";
import { LucideIcon } from "lucide-react";

export type MenuSectionItemTypeDefinition = {
  sectionId: number;
  sectionName?: string;
  sectionDescription?: string;
  subSection: {
    id: number;
    name?: string;
    nameDescription?: string;
    button?: {
      buttonName?: string;
      icon?: LucideIcon;
      buttonAction?: () => void;
    };
  }[];
  subtitle?: string;
  select?: {
    currentValue?: string;
  };
};

const MenuSectionItem = ({ sectionId, sectionName, sectionDescription, subSection }: MenuSectionItemTypeDefinition) => {
  return (
    <div key={sectionName} className={sectionId != 1 ? "mt-8 mb-20" : "mt-8"}>
      <Label className="font-bold uppercase text-lg">{sectionName}</Label>
      <p className="font-extralight text-sm">{sectionDescription}</p>
      <Separator />
      {subSection.map((item) => (
        <div className="grid grid-cols-2" key={item.id}>
          <div className="col-span-1">
            <Label className="flex font-light text-base items-start capitalize justify-start mt-5 mb-2">
              {item.name}
            </Label>
            <p className="font-extralight text-sm">{item.nameDescription}</p>
          </div>
          {item.button ? (
            <div className="flex items-end justify-end">
              <Button
                variant={item.id === 5 ? "destructive" : item.button.icon ? "ghost" : "outline"}
                className="capitalize"
                size={item.button.icon ? "icon" : "default"}
              >
                {item.button.buttonName}
                {item.button.icon && <item.button.icon className="w-4 h-4" />}
              </Button>
            </div>
          ) : (
            <div className="flex items-end justify-end">
              <Switch />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuSectionItem;
