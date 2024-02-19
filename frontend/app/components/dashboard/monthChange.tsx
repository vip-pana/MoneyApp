import { HStack, IconButton, Heading } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const MonthChange = () => {
  return (
    <HStack mt={"10px"}>
      <IconButton aria-label="Previous month" icon={<LuChevronLeft />} variant={"ghost"} size={"sm"} />
      <Heading as="h3" size="sm">
        January
      </Heading>
      <IconButton aria-label="Previous month" icon={<LuChevronRight />} variant={"ghost"} size={"sm"} />
    </HStack>
  );
};

export default MonthChange;
