import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Box,
    Text,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import Booking from "../types/Booking";
  
  interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
  }

  const BookingModalStaff = ({
    isOpen,
    onClose,
    booking,
  }: BookingModalProps) => {
    if (!booking) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Detaljer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={2}>
              <Text fontWeight="bold">Navn:</Text>
              <Text>{booking.customerName}</Text>
            </Box>
  
            <Box mb={2}>
              <Text fontWeight="bold">Telefon:</Text>
              <Text>{booking.customerPhone}</Text>
            </Box>
  
            <Box mb={2}>
              <Text fontWeight="bold">Dato:</Text>
              <Text>{dayjs(booking.startTime).format("DD-MM-YYYY")}</Text>
            </Box>
  
            <Box mb={2}>
              <Text fontWeight="bold">Tid:</Text>
              <Text>
                {dayjs(booking.startTime).format("HH:mm")} - {dayjs(booking.endTime).format("HH:mm")}
              </Text>
            </Box>
  
            <Box mb={2}>
              <Text fontWeight="bold">Frisør:</Text>
              <Text>{booking.staffName}</Text>
            </Box>
          </ModalBody>
  
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Luk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default BookingModalStaff;
  