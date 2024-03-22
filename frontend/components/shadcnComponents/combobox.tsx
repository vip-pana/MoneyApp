"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/shadcnComponents/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/shadcnComponents/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcnComponents/popover";
import { Dropdown } from "@/lib/definitions/typeDefinition";

export const Combobox = ({
  values,
  placeholder,
  searchPlaceholder,
  noFoundText,
}: {
  values: Dropdown[];
  placeholder: string;
  searchPlaceholder: string;
  noFoundText: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? values.find((values) => values.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{noFoundText}</CommandEmpty>
          <CommandGroup>
            {values.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
