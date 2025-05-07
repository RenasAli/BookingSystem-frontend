import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/apiClient";
import Booking from "../types/Booking";

const useBookingsByDate = (date: string) => {
    const client = new ApiClient<Booking, Booking[]>(`/booking/date/${date}`);
  
    return useQuery({
      queryKey: ["bookings", date],
      queryFn: () => client.get(),
      enabled: !!date,
    });
  };

export default useBookingsByDate;
