import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/apiClient";
import TimeSlot from "../types/TimeSlot";
type TimeSlotResponse = TimeSlot[];


const useTimeSlot = (query: string) => {
    const apiClient = new ApiClient<TimeSlot, TimeSlotResponse>(`/booking/available-times?${query}`);
    const companyQuery = useQuery<TimeSlotResponse, Error>({
        queryKey: ['time-slots', query],
        queryFn: () => {
          return  apiClient.get() || [];
        }
      });

      return companyQuery
}

export default useTimeSlot