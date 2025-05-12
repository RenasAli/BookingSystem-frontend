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
  import Service from "../types/Service";

    interface ServiceModalProps {
        isOpen: boolean;
        onClose: () => void;
        service: Service | undefined;
        onChange: (field: keyof Service, value: string) => void;
        onSubmit: (e: FormEvent<HTMLFormElement>) => void;
        isEditing?: boolean;
    }

    const ServiceModal = ({
        isOpen,
        onClose,
        service,
        onChange,
        onSubmit,
        isEditing = true,
    }: ServiceModalProps) => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={onSubmit}>
                        <ModalHeader>{isEditing ? "Rediger Service" : "Opret Service"}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Navn</FormLabel>
                                <Input
                                    type="text"
                                    value={service?.name || ""}
                                    onChange={(e) => onChange("name", e.target.value)}
                                />
                                <FormLabel>Beskrivelse</FormLabel>
                                <Input
                                    type="text"
                                    value={service?.description || ""}
                                    onChange={(e) => onChange("description", e.target.value)}
                                />
                                <FormLabel>Pris</FormLabel>
                                <Input
                                    type="number"
                                    value={service?.price || ""}
                                    onChange={(e) => onChange("price", e.target.value)}
                                />
                                <FormLabel>Varighed</FormLabel>
                                <Input
                                    type="number"
                                    value={service?.durationMinutes || ""}
                                    onChange={(e) => onChange("durationMinutes", e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant={isEditing ? "primary" : "success"} mr={3} type="submit">
                                {isEditing ? "Gem" : "Opret"}
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Luk
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        );
    }

    export default ServiceModal;