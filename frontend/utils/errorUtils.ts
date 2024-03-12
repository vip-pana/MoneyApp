import { toast } from "sonner";

export const NOT_AUTHORIZED_ERROR = "AUTH_NOT_AUTHORIZED";

export const getGraphQLErrorMessage = (error: Error): string => {
  const errorMessage = error.message.substring(error.message.indexOf("{"));
  const errorObj = JSON.parse(errorMessage);
  return errorObj.response.errors[0].message;
};

export const getGraphQLErrorCode = (error: Error): string => {
  const errorMessage = error.message.substring(error.message.indexOf("{"));
  const errorObj = JSON.parse(errorMessage);
  return errorObj.response.errors[0].extensions.code;
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
