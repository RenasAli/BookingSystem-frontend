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
    Box,
    Heading,
    SimpleGrid,
    VStack,
    HStack,
    Checkbox,
  } from "@chakra-ui/react";
  import {  FormEvent } from "react";
import Staff from "../types/Staff";
  
  interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    staff: Staff | undefined;
    onChange: (field: keyof Staff, value: unknown) => void;
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
    const handleWorkdayChange = (
      index: number,
      field: "isActive" | "startTime" | "endTime",
      value: string | boolean
    ) => {
      if (!staff) return;
      const updated = [...staff.staffWorkdays];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    
      onChange("staffWorkdays", updated);
    };
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
              <Box
                mb={5}
                mt={5}
                p={4}
                borderWidth="1px"
                borderRadius="md"
              >
                <Heading fontSize="lg" mb={4}>Arbejdstider</Heading>
                <SimpleGrid columns={1} spacing={8} >
                  {staff?.staffWorkdays?.map((day, index) => (
                    <Box
                      key={day.weekdayId}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      >
                        
                          <VStack spacing={2} >
                            <HStack>
                              <FormLabel>{["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day.weekdayId - 1]}</FormLabel>
                              <Checkbox
                                isChecked={day?.isActive}
                                onChange={(e) => handleWorkdayChange(index, "isActive", e.target.checked)}
                              />
                            </HStack>
                            <HStack>
                              <FormLabel fontSize="sm">Starter</FormLabel>
                              <FormControl>
                                  <Input
                                    type="time"
                                    value={day.startTime || ""}
                                    onChange={(e) => handleWorkdayChange(index, "startTime", e.target.value)}
                                    isDisabled={!day.isActive}
                                  />
                              </FormControl>
                            </HStack>
                            <HStack>
                              <FormLabel fontSize="sm">Slutter</FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  value={day.endTime || ""}
                                  onChange={(e) => handleWorkdayChange(index, "endTime", e.target.value)}
                                  isDisabled={!day.isActive}
                                />
                              </FormControl>
                            </HStack>
                          </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button variant="cancel" mr={3} onClick={onClose}>
                Luk
              </Button>
              <Button variant={isEditing ? "primary" : "success"} type="submit">
                {isEditing ? "Gem" : "Opret"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };
  
  export default StaffModal;
  