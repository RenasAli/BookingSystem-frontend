import { useQuery } from "@tanstack/react-query";
import Booking from "../types/Booking";
import ApiClient from "../service/apiClient";

const apiClient = new ApiClient<Booking, Booking[]>(`/bookings`);

const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => apiClient.get(),
  });
};

export default useBookings;
