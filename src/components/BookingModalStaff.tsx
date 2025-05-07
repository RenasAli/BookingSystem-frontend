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
    Spinner,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import Booking from "../types/Booking";
  import useStaff from "../hooks/useStaff";
  
  interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
  }

  const BookingModalStaff = ({ isOpen, onClose, booking }: BookingModalProps) => {
    const { data: staffList, isLoading: isStaffLoading } = useStaff();
  
    if (!booking) return null;
  
    const staff = staffList?.find((s) => s.id === booking.staffId);
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isStaffLoading ? (
              <Spinner />
            ) : (
              <>
                <Box mb={2}>
                  <Text fontWeight="bold">Name:</Text>
                  <Text>{booking.customerName}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Phone:</Text>
                  <Text>{booking.customerPhone}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Date:</Text>
                  <Text>{dayjs(booking.startTime).format("DD-MM-YYYY")}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Time:</Text>
                  <Text>
                    {dayjs(booking.startTime).format("HH:mm")} - {dayjs(booking.endTime).format("HH:mm")}
                  </Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Staff:</Text>
                  <Text>{staff?.name || "Unknown"}</Text>
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default BookingModalStaff;