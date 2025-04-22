import { useMutation } from "@tanstack/react-query";
import { Method } from "axios";
import ApiClient from "../service/apiClient";

interface UseCreateMutationOptions {
  endpoint: string;
  method: Method;
  onSuccess?: () => void;
  onError?: () => void
}

export const useCreateMutation = <T>({ endpoint, method, onSuccess, onError }: UseCreateMutationOptions) => {
  const apiClient = new ApiClient<T>(`/${endpoint}`);

  return useMutation({
    mutationFn: async (newObject: T) => {
      return apiClient.create(newObject, method)
    },
    onSuccess: onSuccess,
    onError: () => onError
  });
};