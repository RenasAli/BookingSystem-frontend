import { useQuery } from "@tanstack/react-query";
import Staff from "../types/Staff";
import ApiClient from "../service/apiClient";

export type StaffsResponse = Staff[];

const apiClient = new ApiClient<Staff, StaffsResponse>(`/staff`);

const useStaff = () => {
    const staffQuery = useQuery<StaffsResponse, Error>({
        queryKey: ['staff'],
        queryFn: () => {
          return  apiClient.get() || []
        }
      });

      return staffQuery
}

export default useStaff