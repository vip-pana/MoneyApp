import { FormHelperText } from "@chakra-ui/react";
import React from "react";

export default function FormErrorHelperText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FormHelperText color={"red"}>{children}</FormHelperText>;
}
