import { Box, HStack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { operationTypeOptions } from "@/utils/enumUtils";

const CheckboxOperationTypeElement = ({
  isChecked,
  setIsChecked,
}: {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    setIsChecked(checkedItems);
  }, [checkedItems, setIsChecked]);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <HStack>
      {operationTypeOptions.map((option, index) => {
        const isChecked = checkedItems[index] || false;

        return (
          <Box
            key={index}
            as="label"
            cursor="pointer"
            borderRadius={"lg"}
            borderWidth={"1px"}
            boxShadow={"md"}
            borderColor={isChecked ? "teal.600" : "red.600"}
            _checked={{
              bg: true ? "teal.600" : "red.600",
              color: "white",
            }}
            _focus={{
              boxShadow: "outline",
            }}
            px={5}
            py={1}
          >
            <input type="checkbox" checked={isChecked} readOnly />
            {option}
          </Box>
        );
      })}
    </HStack>
  );
};

export default CheckboxOperationTypeElement;
