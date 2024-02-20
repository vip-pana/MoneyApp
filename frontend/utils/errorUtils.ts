export const getGraphQLErrorMessage = (error: Error): string => {
  const errorMessage = error.message.substring(error.message.indexOf("{"));
  const errorObj = JSON.parse(errorMessage);
  return errorObj.response.errors[0].message;
};
