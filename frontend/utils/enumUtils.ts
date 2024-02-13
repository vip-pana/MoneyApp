import { Currency, OperationType } from "@/gql/generated/graphql";

export const getEnumValue = (value: string, enumType: any) => enumType[value as keyof typeof enumType];

export const formatEnumValueByString = (enumToFormat: string): string => {
  let value = enumToFormat.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  return value;
};

export const currencyOptions = Object.keys(Currency).map((key) => ({
  value: Currency[key as keyof typeof Currency],
  label: Currency[key as keyof typeof Currency].toUpperCase(),
}));

export const operationTypeOptions = Object.keys(OperationType);
