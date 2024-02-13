import { getEnumValue, operationTypeOptions } from "@/utils/enumUtils";
import { Center, HStack, useRadioGroup } from "@chakra-ui/react";
import RadioOperationTypeElement from "./radioOperationTypeElement";
import { OperationType } from "@/gql/generated/graphql";
import { TransactionModalFormValueDefinition, UserCategory } from "@/utils/definitions/typeDefinition";
import { SelectInstance, GroupBase } from "chakra-react-select";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

interface RadioOperationTypesProps {
  selectInputRef: MutableRefObject<SelectInstance<UserCategory, false, GroupBase<UserCategory>> | undefined>;
  setValue: UseFormSetValue<TransactionModalFormValueDefinition>;
  setSelectedOperationType: Dispatch<SetStateAction<string>>;
}
const RadioOperationTypes = (props: RadioOperationTypesProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "radioOperationTypes",
    onChange: (value) => {
      props.setValue("operationType", getEnumValue(value, OperationType));
      props.setValue("selectedCategory", "");
      if (props.selectInputRef.current) {
        props.selectInputRef.current.clearValue();
      }
      props.setSelectedOperationType(value);
    },
  });
  const group = getRootProps();
  return (
    <Center>
      <HStack {...group}>
        {operationTypeOptions.map((option) => {
          const radio = getRadioProps({ value: option });
          return (
            <RadioOperationTypeElement key={option} {...radio}>
              {option}
            </RadioOperationTypeElement>
          );
        })}
      </HStack>
    </Center>
  );
};
export default RadioOperationTypes;
