import { Box, useRadio } from "@chakra-ui/react";

const RadioOperationTypeElement = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkBox = getRadioProps();

  const isIncome = props.children == "Income";

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkBox}
        cursor="pointer"
        borderRadius={"lg"}
        borderWidth={"1px"}
        boxShadow={"md"}
        borderColor={isIncome ? "teal.600" : "red.600"}
        _checked={{
          bg: isIncome ? "teal.600" : "red.600",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioOperationTypeElement;
