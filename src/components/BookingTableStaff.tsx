import { Box, Grid, Text, Button, Spinner, Flex, IconButton, Spacer, Input,  useDisclosure } from "@chakra-ui/react";
import useBookingsByDate from "../hooks/useBookingByDate";
import Booking from "../types/Booking";
import { useState } from "react";
import BookingModalStaff from "./BookingModalStaff";
import { GrNext, GrPrevious } from "react-icons/gr";
import dayjs from "dayjs";

const generateTimes = (start = 9, end = 18) => {
  const times: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += 30) {
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
      {/* Date selection UI (top bar) */}
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

      {isLoading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="0fr 3fr" gap={2}>
          {/* Time column */}
          <Box>
            {times.map((time) => (
              <Box key={time} h="40px" display="flex" alignItems="center">
                <Text fontSize="md">{time}</Text>
              </Box>
            ))}
          </Box>

          {/* Booking blocks */}
          <Box position="relative">
            {times.map((time) => (
              <Box key={time} h="40px" borderBottom="1px solid #eee" />
            ))}

            {bookings?.map((booking) => {
              const start = dayjs(booking.startTime);
              const end = dayjs(booking.endTime);
              const startIndex = times.findIndex(t => t === start.format("HH:mm"));
              const slotHeight = 40; // px
              const duration = end.diff(start, "minute");
              const height = (duration / 30) * slotHeight;

              return (
                <Button
                  key={booking.id}
                  onClick={() => openBookingModal(booking)}
                  position="absolute"
                  top={startIndex * slotHeight}
                  left={0}
                  height={`${height}px`}
                  width="100%"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                >
                  {booking.customerName}
                </Button>
              );
            })}
          </Box>
        </Grid>
      )}

      {selectedBooking && (
        <BookingModalStaff
          isOpen={isOpen}
          onClose={onClose}
          booking={selectedBooking}

        />
      )}
    </Box>
    );
};

export default BookingTableStaff;
