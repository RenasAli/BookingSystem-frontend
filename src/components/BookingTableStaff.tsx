import { Box, Button, Spinner, Flex, IconButton, Spacer, Input,  useDisclosure, Tbody, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useBookingsByDate from "../hooks/useBookingByDate";
import Booking from "../types/Booking";
import { useState } from "react";
import BookingModalStaff from "./BookingModalStaff";
import { GrNext, GrPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

const generateTimes = (start = 9, end = 18) => {
  const times: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += 60) {
      times.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
  }
  return times;
};
  
const BookingTableStaff = () => {
  const today = dayjs().startOf("day");
  const [selectedDate, setSelectedDate] = useState(today);
  const { data: bookings, isLoading } = useBookingsByDate(selectedDate.format("YYYY-MM-DD"));
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
    setSelectedBooking(booking);
    onOpen();
  };

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
  {isLoading ? (
    <Spinner />
  ) : (
    <Table variant="simple" size="sm">
      <Thead>
  <Tr>
    {/* Time column header */}
    <Th width="80px">Time</Th>

    {/* Booked column header */}
    <Th textAlign="center">Booked</Th>
  </Tr>
  </Thead>
    <Tbody>
      {times.map((time) => (
        <Tr key={time}>
          {/* Time column */}
          <Td>{time}</Td>

          {/* Booked column */}
          <Td>
            {bookings
              ?.filter((booking) => {
                const start = dayjs(booking.startTime);
                const rowStart = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${time}`);
                const rowEnd = rowStart.add(1, "hour");
                return start.isSameOrAfter(rowStart) && start.isBefore(rowEnd);
              })
              .map((booking) => {
                const start = dayjs(booking.startTime);
                const end = dayjs(booking.endTime);

                return (
                  <Button
                    key={booking.id}
                    onClick={() => openBookingModal(booking)}
                    size="sm"
                    colorScheme="blue"
                    m={1} // Add margin between buttons
                  >
                    {start.format("HH:mm")} - {end.format("HH:mm")}
                  </Button>
                );
              })}
          </Td>
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
