import { getEnumValue, operationTypeOptions } from "@/utils/enumUtils";
import { Box, Center, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { CategoryInput, OperationType } from "@/gql/generated/graphql";
import { TransactionModalFormValueDefinition } from "@/utils/definitions/typeDefinition";
import { SelectInstance, GroupBase } from "chakra-react-select";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  UseFormSetValue,
  Control,
  UseFormRegister,
  useController,
  UseFormGetValues,
  ControllerRenderProps,
} from "react-hook-form";

interface RadioOperationTypesProps {
  selectInputRef: MutableRefObject<SelectInstance<CategoryInput, false, GroupBase<CategoryInput>> | undefined>;
  setValue: UseFormSetValue<TransactionModalFormValueDefinition>;
  setSelectedOperationType: Dispatch<SetStateAction<string>>;
  control: Control<TransactionModalFormValueDefinition, any>;
  register: UseFormRegister<TransactionModalFormValueDefinition>;
  getValues: UseFormGetValues<TransactionModalFormValueDefinition>;
}

const getBackgroundColor = (
  field: ControllerRenderProps<TransactionModalFormValueDefinition, "operationType">,
  isIncome: boolean
) => {
  let res = "none";
  if (field.value === OperationType.Income && isIncome) {
    res = "teal.600";
  } else if (field.value === OperationType.Expense && !isIncome) {
    res = "red.600";
  }
  return res;
};

const RadioOperationTypes = (props: RadioOperationTypesProps) => {
  const handleChange = (value: string) => {
    props.setValue("operationType", getEnumValue(value, OperationType));
    if (props.selectInputRef.current) {
      props.selectInputRef.current.clearValue();
    }
    props.setSelectedOperationType(value);
  };

  const { field } = useController({
    name: "operationType",
    control: props.control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...field,
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <Center>
      <HStack {...group}>
        {operationTypeOptions.map((option, index) => {
          const radio = getRadioProps({ value: option });
          const { getInputProps, getRadioProps: getRadioPropsRadio } = useRadio(radio);
          const input = getInputProps();
          const checkBox = getRadioPropsRadio();

          const isIncome = option == "Income";

          return (
            <Box key={index} as="label">
              <input {...input} />
              <Box
                {...checkBox}
                cursor="pointer"
                borderRadius={"lg"}
                borderWidth={"1px"}
                boxShadow={"md"}
                borderColor={isIncome ? "teal.600" : "red.600"}
                backgroundColor={getBackgroundColor(field, isIncome)}
                _focus={{
                  boxShadow: "outline",
                }}
                px={5}
                py={1}
              >
                {option}
              </Box>
            </Box>
          );
        })}
      </HStack>
    </Center>
  );
};
export default RadioOperationTypes;
