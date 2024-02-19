import { FormHelperText } from "@chakra-ui/react";
import React from "react";

export default function FormErrorHelperText({
  children,
  centered,
}: Readonly<{
  children: React.ReactNode;
  centered?: boolean;
}>) {
  return (
    <FormHelperText color={"red"} textAlign={centered ? "center" : undefined}>
      {children}
    </FormHelperText>
  );
}
