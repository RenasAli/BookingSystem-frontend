import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {  FormEvent } from "react";
import Booking, { Status } from "../types/Booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onChange: (field: keyof Booking, value: string | number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing?: boolean;
}

const BookingModal = ({
  isOpen,
  onClose,
  booking,
  onChange,
  onSubmit,
  isEditing = true,
}: BookingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{isEditing ? "Rediger Booking" : "Opret Booking"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Navn</FormLabel>
              <Input
                type="text"
                value={booking?.customerName || ""}
                onChange={(e) => onChange("customerName", e.target.value)}
              />
              <FormLabel>Tlf</FormLabel>
              <Input
                type="text"
                value={booking?.customerPhone || ""}
                onChange={(e) => onChange("customerPhone", e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {isEditing ? "Opdater" : "Opret"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Luk
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default BookingModal;