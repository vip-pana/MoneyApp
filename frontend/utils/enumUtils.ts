export const getEnumValue = (value: string, enumType: any) => enumType[value as keyof typeof enumType];

export const formatEnumValueByString = (enumToFormat: string): string => {
  let value = enumToFormat.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  return value;
};
