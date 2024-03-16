import { useMutation } from "react-query";
import errorTranslations from "../translations/pl.json";

type OperationFunction<T, R> = (data: T) => Promise<R>;

const getErrorCodeFromMutationError = (error: any): string | undefined => {
  // Check each level of the expected error structure
  if (error?.response?.data?.error?.code) {
    return error.response.data.error.code;
  }
  return undefined;
};

export const useApi = <T, R>(operationFunction: OperationFunction<T, R>) => {
  const mutation = useMutation<R, any, T>(operationFunction);

  const errorKey = getErrorCodeFromMutationError(mutation.error);
  const errorToPl = errorKey ? errorTranslations.errors[errorKey as keyof typeof errorTranslations.errors] : undefined;

  return {
    data: mutation.data,
    error: errorToPl,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    mutate: mutation.mutate,
  };
};
