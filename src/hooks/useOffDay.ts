import { useQuery } from "@tanstack/react-query";
import OffDay from "../types/OffDay";
import ApiClient from "../service/apiClient";

export type OffDaysResponse = OffDay[];

const apiClient = new ApiClient<OffDay, OffDaysResponse>(`/off-day`);

const useOffDay = () => {
    const offDayQuery = useQuery<OffDaysResponse, Error>({
        queryKey: ['off-day'],
        queryFn: () => {
          return  apiClient.get() || []
        }
      });

      return offDayQuery
}

export default useOffDay