import { toast } from "sonner";

export const getGraphQLErrorMessage = (error: Error): string => {
  const errorMessage = error.message.substring(error.message.indexOf("{"));
  const errorObj = JSON.parse(errorMessage);
  return errorObj.response.errors[0].message;
};

export const manageApiCallErrors = (unManagedError: Error | null, exceptionsErrors: any) => {
  if (unManagedError != null) {
    toast.error(unManagedError.message);
  }
  if (exceptionsErrors != null || exceptionsErrors != undefined) {
    for (let index = 0; index < exceptionsErrors.length; index++) {
      toast.error(exceptionsErrors[index].message);
    }
  }
};
