import { Box, Button, Spinner, Flex, IconButton, Spacer, Input,  useDisclosure, Tbody, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useBookingsByDate from "../hooks/useBookingByDate";
import Booking from "../types/Booking";
import { useState } from "react";
import BookingModalStaff from "./BookingModalStaff";
import BookingModal from "./BookingModal";
import { GrNext, GrPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { LuCalendarPlus } from "react-icons/lu";

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

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newBooking, setNewBooking] = useState<Booking | null>(null);

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
    onViewOpen();
  };

  const handleCreateBooking = () => {
    const defaultBooking: Booking = {
      id: null,
      staffId: 1,
      customerName: "",
      customerPhone: "",
      status: "pending",
      startTime: selectedDate.format("YYYY-MM-DDT09:00:00Z"),
      endTime: selectedDate.format("YYYY-MM-DDT09:45:00Z"),
      createdAt: undefined,
    };
    setNewBooking(defaultBooking);
    onCreateOpen();
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
  <Button variant="success" leftIcon={<LuCalendarPlus/>} size={"sm"} mb={4} onClick={handleCreateBooking}>
    Opret Booking
  </Button>

  {/* Content Table */}
  {isLoading ? (
    <Spinner />
  ) : (
    <Table variant="simple" size="sm">
      <Thead>
  <Tr>
    {/* Time column header */}
    <Th width="80px" borderRight="1px solid #E2E8F0">Tid</Th>

    {/* Booked column header */}
    <Th textAlign="center" borderRight="1px solid #E2E8F0">Bekræftet</Th>
    <Th textAlign="center" borderRight="1px solid #E2E8F0">Afventer</Th>
    <Th textAlign="center">Aflyst</Th>
  </Tr>
  </Thead>
    <Tbody>
      {times.map((time) => (
        <Tr key={time}>
          {/* Time column */}
          <Td borderRight="1px solid #E2E8F0">{time}</Td>

          {/* Confirmed bookings */}
          <Td borderRight="1px solid #E2E8F0">
            {bookings
              ?.filter((booking) => {
                const start = dayjs(booking.startTime);
                const rowStart = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${time}`);
                const rowEnd = rowStart.add(1, "hour");
                return (
                  start.isSameOrAfter(rowStart) &&
                  start.isBefore(rowEnd) &&
                  booking.status === "confirmed"
                );
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
                    m={1}
                  >
                    {start.format("HH:mm")} - {end.format("HH:mm")}
                  </Button>
                );
              })}
          </Td>

          {/* Pending bookings */}
          <Td borderRight="1px solid #E2E8F0">
            {bookings
              ?.filter((booking) => {
                const start = dayjs(booking.startTime);
                const rowStart = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${time}`);
                const rowEnd = rowStart.add(1, "hour");
                return (
                  start.isSameOrAfter(rowStart) &&
                  start.isBefore(rowEnd) &&
                  booking.status === "pending"
                );
              })
              .map((booking) => {
                const start = dayjs(booking.startTime);
                const end = dayjs(booking.endTime);

                return (
                  <Button
                    key={booking.id}
                    onClick={() => openBookingModal(booking)}
                    size="sm"
                    colorScheme="purple"
                    m={1}
                  >
                    {start.format("HH:mm")} - {end.format("HH:mm")}
                  </Button>
                );
              })}
          </Td>

          {/* Cancelled bookings */}
          <Td>
            {bookings
              ?.filter((booking) => {
                const start = dayjs(booking.startTime);
                const rowStart = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${time}`);
                const rowEnd = rowStart.add(1, "hour");
                return (
                  start.isSameOrAfter(rowStart) &&
                  start.isBefore(rowEnd) &&
                  booking.status === "cancelled"
                );
              })
              .map((booking) => {
                const start = dayjs(booking.startTime);
                const end = dayjs(booking.endTime);
                
                const getColorScheme = (status: string) => {
                  switch (status) {
                    case "confirmed":
                      return "blue";
                    case "pending":
                      return "purple";
                    case "cancelled":
                      return "red";
                    default:
                      return "gray"; // Default color for unknown statuses
                  }
                };

                return (
                  <Button
                    key={booking.id}
                    onClick={() => openBookingModal(booking)}
                    size="sm"
                    colorScheme={getColorScheme(booking.status)}
                    m={1}
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
    <BookingModalStaff isOpen={isViewOpen} onClose={onViewClose} booking={selectedBooking} />
  )}
      {newBooking && (
        <BookingModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          booking={newBooking}
          setBooking={setNewBooking}
        />
      )}
</Box>
  );
};

export default BookingTableStaff;
