import { useQuery } from "@tanstack/react-query";
import Staff from "../types/Staff";
import ApiClient from "../service/apiClient";

export type StaffsResponse = Staff[];
export type SingleStaffResponse = Staff;

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
export const useStaffById = () => {
  const apiClient = new ApiClient<Staff, SingleStaffResponse>(`/staff/get/profile`);

    const staffQuery = useQuery<Staff, Error>({
        queryKey: ['staff'],
        queryFn: () => {
          return  apiClient.get();
        },
      });

      return staffQuery
}

export default useStaff