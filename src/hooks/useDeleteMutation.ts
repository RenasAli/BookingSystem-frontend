import { useMutation } from "@tanstack/react-query";
import ApiClient from "../service/apiClient";

interface UseDeleteMutationOptions {
  endpoint: string;
  onSuccess?: () => void;
  //onError?: () => void
}

export const useDeleteMutation = ({ endpoint, onSuccess, /*onError*/ }: UseDeleteMutationOptions) => {
  const apiClient = new ApiClient(`/${endpoint}`);
  return useMutation({
    mutationFn: async () => {
      return apiClient.delete()
    },
    onSuccess: onSuccess,
    //onError: onError
  });
};