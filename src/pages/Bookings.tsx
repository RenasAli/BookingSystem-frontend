import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import BookingModal from "../components/BookingModal";
import BookingTable from "../components/BookingTable";
import Booking from "../types/Booking";

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [booking, setBooking] = useState<Booking | null>(null);

  const handleOpenModal = () => {
    if (!selectedTime) return;
    const start = `${selectedDate}T${selectedTime}`;
    setBooking({
      id: null,
      companyId: 1,
      staffId: 0,
      serviceId: 0,
      customerName: "",
      customerPhone: "",
      status: "pending",
      startTime: start,
      endTime: "", // Can be calculated later
    });
    onOpen();
  };

  const handleUpdateField = (field: keyof Booking, value: any) => {
    setBooking((prev) => prev && { ...prev, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform booking logic here (e.g., mutation)
    onClose();
    setSelectedTime(null);
    setBooking(null);
  };

  return (
    <Box>
      <BookingTable
        selectedTime={selectedTime}
        onTimeSelect={setSelectedTime}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onBookClick={handleOpenModal}
      />

      {booking && (
        <BookingModal
          isOpen={isOpen}
          onClose={onClose}
          booking={booking}
          onChange={handleUpdateField}
          onSubmit={handleSubmit}
          isEditing={false}
        />
      )}
    </Box>
  );
};

export default Bookings;
