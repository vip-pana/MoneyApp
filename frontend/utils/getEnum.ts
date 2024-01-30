export const getEnum = (value: string, enumType: any) =>
  enumType[value as keyof typeof enumType];
