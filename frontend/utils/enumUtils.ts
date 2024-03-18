import { Currency } from "@/gql/generated/graphql";
import { Dropdown } from "./definitions/typeDefinition";

export const getEnumValue = (value: string, enumType: any) => enumType[value as keyof typeof enumType];

export const currencyOptions: Dropdown[] = Object.keys(Currency).map((key) => ({
  value: Currency[key as keyof typeof Currency],
  label: Currency[key as keyof typeof Currency].toUpperCase(),
}));
