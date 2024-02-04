export const getEnum = (value: string, enumType: any) => enumType[value as keyof typeof enumType];

export const formatEnum = (enumToFormat: string) => {
  let value = enumToFormat.toLowerCase();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  return value;
};
