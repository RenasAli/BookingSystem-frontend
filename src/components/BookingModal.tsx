
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useQueryClient } from "@tanstack/react-query";


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    customerName: string;
    customerPhone: string;
    startTime: string;
    endTime: string;
  };
  setBooking: (booking: any) => void;
}

const BookingModal = ({ isOpen, onClose, booking, setBooking }: BookingModalProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBookingMutation = useCreateMutation({
    endpoint: "booking/by-staff",
    method: "POST",
    onSuccess: async () => {
      console.log("Booking created successfully!");
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      await queryClient.refetchQueries({ queryKey: ["bookings"] });
      onClose();
    },
    onError: () => {
      console.error("Error creating booking.");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooking((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createBookingMutation.mutateAsync(booking);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Customer Name</FormLabel>
            <Input name="customerName" value={booking.customerName} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Customer Phone</FormLabel>
            <Input name="customerPhone" value={booking.customerPhone} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <Input
              name="startDate"
              type="date"
              value={booking.startTime.split("T")[0]}
              onChange={(e) => {
                const newDate = e.target.value;
                const timePart = booking.startTime.split("T")[1];
                setBooking((prev: any) => ({ ...prev, startTime: `${newDate}T${timePart}` }));
              }}
              onFocus={(e) => e.target.showPicker()}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              name="startTime"
              type="time"
              value={booking.startTime.split("T")[1]}
              onChange={(e) => {
                const newTime = e.target.value;
                const datePart = booking.startTime.split("T")[0];
                setBooking((prev: any) => ({ ...prev, startTime: `${datePart}T${newTime}` }));
              }}
              onFocus={(e) => e.target.showPicker()}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              name="endTime"
              type="time"
              value={booking.endTime.split("T")[1]}
              onChange={(e) => {
                const newTime = e.target.value;
                const datePart = booking.endTime.split("T")[0];
                setBooking((prev: any) => ({ ...prev, endTime: `${datePart}T${newTime}` }));
              }}
              onFocus={(e) => e.target.showPicker()}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isSubmitting}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;