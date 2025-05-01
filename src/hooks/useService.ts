import { useQuery } from "@tanstack/react-query";
import Service from "../types/Service";
import ApiClient from "../service/apiClient";

export type ServicesResponse = Service[];

const apiClient = new ApiClient<Service, ServicesResponse>(`/service`);

const useService = () => {
    const servicesQuery = useQuery<ServicesResponse, Error>({
        queryKey: ['services'],
        queryFn: () => {
          return  apiClient.get() || []
        }
      });

      return servicesQuery
}
export default useService