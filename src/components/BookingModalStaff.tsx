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
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
  import dayjs from "dayjs";
  import { useState } from "react";
  import Booking from "../types/Booking";
  import useStaff from "../hooks/useStaff";
  import { useCreateMutation } from "../hooks/useCreateMutation";
  import { useQueryClient } from "@tanstack/react-query";
  
  interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
  }

  const BookingModalStaff = ({ isOpen, onClose, booking }: BookingModalProps) => {
    const queryClient = useQueryClient();
    const { data: staffList, isLoading: isStaffLoading } = useStaff();
    const [isEditing, setIsEditing] = useState(false);
    const [editableBooking, setEditableBooking] = useState<Booking | null>(booking);
  
    const handleClose = () => {
      setIsEditing(false);
      setEditableBooking(booking);
      onClose();
    };
  
    
  
    const staff = staffList?.find((s) => s.id === booking?.staffId);
  
    const updateMutation = useCreateMutation({
      endpoint: `booking/${booking?.id}`,
      method: "PUT",
      onSuccess: async () => {
        console.log("Booking updated successfully!");
        await queryClient.invalidateQueries({ queryKey: ["bookings", booking?.id] });
        await queryClient.refetchQueries({ queryKey: ["bookings"] });
        setIsEditing(false);
        handleClose();
      },
      onError: () => {
        console.error("Error updating booking.");
      },
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
    
      setEditableBooking((prev) => {
        if (!prev) return null;
    
        if (name === "startTime_date" || name === "startTime_time" || name === "endTime_time") {
          const [field, type] = name.split("_");
          const currentDateTime = dayjs.utc(prev[field as keyof Booking]);
          let updatedDateTime;
    
          if (type === "date") {
            updatedDateTime = dayjs.utc(value + "T" + currentDateTime.format("HH:mm"));
          } else if (type === "time") {
            updatedDateTime = dayjs.utc(currentDateTime.format("YYYY-MM-DD") + "T" + value);
          }
    
          return updatedDateTime
            ? { ...prev, [field]: updatedDateTime.toISOString() }
            : prev;
        }
    
        return { ...prev, [name]: value };
      });
    };
  
    const handleUpdate = async () => {
      if (editableBooking) {
        await updateMutation.mutateAsync(editableBooking);
      }
    };
    if (!booking) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isStaffLoading ? (
              <Spinner />
            ) : isEditing ? (
              <>
                <FormControl mb={4}>
                  <FormLabel>Dato</FormLabel>
                  <Input
                    name="startTime_date"
                    type="date"
                    value={dayjs.utc(editableBooking?.startTime).format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.showPicker()}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Start</FormLabel>
                  <Input
                    name="startTime_time"
                    type="time"
                    value={dayjs.utc(editableBooking?.startTime).format("HH:mm")}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.showPicker()}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Slut</FormLabel>
                  <Input
                    name="endTime_time"
                    type="time"
                    value={dayjs.utc(editableBooking?.endTime).format("HH:mm")}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.showPicker()}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <Box mb={2}>
                  <Text fontWeight="bold">Navn:</Text>
                  <Text>{booking.customerName}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Telefon nr:</Text>
                  <Text>{booking.customerPhone}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Dato:</Text>
                  <Text>{dayjs(booking.startTime).format("DD-MM-YYYY")}</Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Tid:</Text>
                  <Text>
                    {dayjs.utc(booking.startTime).format("HH:mm")} - {dayjs.utc(booking.endTime).format("HH:mm")}
                  </Text>
                </Box>
  
                <Box mb={2}>
                  <Text fontWeight="bold">Frisør:</Text>
                  <Text>{staff?.name || "Ikke fundet"}</Text>
                </Box>

                <Box mb={2}>
                  {booking.status === "cancelled" && (
                    <>
                      <Text fontWeight="bold">Aflyst:</Text>
                      {booking.cancellationReason === "customer cancelled" ? (
                        <Text>Kunde aflyste</Text>
                      ) : booking.cancellationReason === "no show" ? (
                        <Text>Kunde dukkede ikke op</Text>
                      ) : booking.cancellationReason === "staff deleted" ? (
                        <Text>Medarbejder blev slettet</Text>
                      ) : booking.cancellationReason === "service deleted" ? (
                        <Text>Service blev slettet</Text>
                      ) : null}
                    </>
                  )}
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {isEditing ? (
              <Button colorScheme="blue" onClick={handleUpdate} mr={3}>
                Gem
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={() => setIsEditing(true)} mr={3}>
                Opdater
              </Button>
            )}
            <Button variant="ghost" onClick={handleClose}>
              Luk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default BookingModalStaff;