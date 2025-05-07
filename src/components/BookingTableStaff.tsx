import { Box, Button, Spinner, Flex, IconButton, Spacer, Input,  useDisclosure, Tbody, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useBookingsByDate from "../hooks/useBookingByDate";
import Booking from "../types/Booking";
import { useState } from "react";
import BookingModalStaff from "./BookingModalStaff";
import { GrNext, GrPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import useStaff from "../hooks/useStaff";

const generateTimes = (start = 9, end = 18) => {
  const times: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += 15) {
      times.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
  }
  return times;
};
  
const BookingTableStaff = () => {
  const today = dayjs().startOf("day");
  const [selectedDate, setSelectedDate] = useState(today);
  const { data: bookings, isLoading } = useBookingsByDate(selectedDate.format("YYYY-MM-DD"));
  const { data: staffList, isLoading: isStaffLoading } = useStaff();
  const times = generateTimes();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = dayjs(e.target.value);
      if (!date.isBefore(today, "day")) {
      setSelectedDate(date.startOf("day"));
      }
  };

  const handleNextDay = () => {
      setSelectedDate((prev) => prev.add(1, "day"));
  };

  const handlePrevDay = () => {
      if (selectedDate.isAfter(today)) {
      setSelectedDate((prev) => prev.subtract(1, "day"));
      }
  };

  const openBookingModal = (booking: Booking) => {
    const staff = staffList?.find((s) => s.id === booking.staffId);
    setSelectedBooking({ ...booking, staffName: staff?.name || "Unknown" });
      onOpen();
  };

  const bookingsByStaff = bookings?.reduce((acc, booking) => {
    if (!acc[booking.staffId]) acc[booking.staffId] = [];
    acc[booking.staffId].push(booking);
    return acc;
  }, {} as Record<number, Booking[]>);

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
  {/* Top Controls */}
  <Flex mb={5} align="center">
    <IconButton
      variant="outline"
      borderWidth={0}
      aria-label="Previous"
      icon={<GrPrevious />}
      onClick={handlePrevDay}
      isDisabled={selectedDate.isSame(today, "day")}
    />
    <Spacer />
    <Input
      fontWeight={600}
      type="date"
      value={selectedDate.format("YYYY-MM-DD")}
      onChange={handleDateChange}
      min={today.format("YYYY-MM-DD")}
      borderWidth={0}
      maxW="40"
    />
    <Spacer />
    <IconButton
      variant="outline"
      borderWidth={0}
      aria-label="Next"
      icon={<GrNext />}
      onClick={handleNextDay}
    />
  </Flex>

  {/* Content Table */}
  {isLoading || isStaffLoading ? (
    <Spinner />
  ) : (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          {/* Time column header */}
          <Th width="80px">Time</Th>

          {/* Staff headers */}
          {staffList?.map((staff) => (
            <Th key={staff.id} textAlign="center">{staff.name}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {/* Time slots and Staff bookings */}
        {times.map((time) => (
          <Tr key={time}>
            {/* Time column */}
            <Td>{time}</Td>

            {/* Staff columns */}
            {staffList?.map((staff) => {
              const staffBookings = staff.id !== null ? bookingsByStaff?.[staff.id] || [] : [];
              const staffBookingsAtTime = staffBookings.filter((booking) => {
                const start = dayjs(booking.startTime);
                return start.format("HH:mm") === time;
              });

              return (
                <Td key={staff.id} position="relative" px={1}>
                  {/* Time slots background */}
                  {staffBookingsAtTime.map((booking) => {
                  const start = dayjs(booking.startTime);
                  const end = dayjs(booking.endTime);
                  const duration = end.diff(start, "minute");

                  const rowHeight = 32.8; // Height of a 15-minute time slot
                  const height = (duration / 15) * rowHeight; // Calculate height based on 15-minute intervals

                  // Calculate the top position based on the start time
                  const startTime = dayjs(`${selectedDate.format("YYYY-MM-DD")}T${time}`);
                  const offsetMinutes = start.diff(startTime, "minute");
                  const top = (offsetMinutes / 15) * rowHeight;

                    return (
                      <Button
                        key={booking.id}
                        onClick={() => openBookingModal(booking)}
                        position="absolute"
                        top={`${top}px`}
                        left={0}
                        height={`${height}px`}
                        width="95%"
                        bg="blue.400"
                        color="white"
                        _hover={{ bg: "blue.500" }}
                        borderRadius="md"
                        p={2}
                        fontSize="sm"
                        zIndex={1}
                      >
                        {booking.customerName}
                      </Button>
                    );
                  })}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )}

  {selectedBooking && (
    <BookingModalStaff isOpen={isOpen} onClose={onClose} booking={selectedBooking} />
  )}
</Box>
  );
};

export default BookingTableStaff;
