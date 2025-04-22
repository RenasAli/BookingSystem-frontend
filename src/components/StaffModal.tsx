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
import Staff from "../types/Stoff";
  
  interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    staff: Staff | undefined;
    onChange: (field: keyof Staff, value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isEditing?: boolean;
  }
  
  const StaffModal = ({
    isOpen,
    onClose,
    staff,
    onChange,
    onSubmit,
    isEditing = true,
  }: StaffModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>{isEditing ? "Rediger Medarbejder" : "Opret Medarbejder"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Navn</FormLabel>
                <Input
                  type="text"
                  value={staff?.name || ""}
                  onChange={(e) => onChange("name", e.target.value)}
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={staff?.email || ""}
                  onChange={(e) => onChange("email", e.target.value)}
                />
                <FormLabel>Tlf</FormLabel>
                <Input
                  type="text"
                  value={staff?.phone || ""}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Luk
              </Button>
              <Button colorScheme="green" type="submit">
                {isEditing ? "Gem" : "Opret"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };
  
  export default StaffModal;
  