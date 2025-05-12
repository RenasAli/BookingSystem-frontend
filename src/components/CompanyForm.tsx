import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    SimpleGrid,
    Stack,
    VStack,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Select,
    Image,
    useDisclosure
  } from "@chakra-ui/react";
  import { FormEvent } from "react";
  import Company, { CompanyRequest } from "../types/Copmpany";
import ConfirmDialogBox from "./ConfirmDialogBox";
import { RoleGuard, RoleProtectedElement } from "../auth/RoleGuard";

  
  interface CompanyFormProps {
    company: Company | undefined;
    onChange: (field: keyof CompanyRequest, value: unknown) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    deleteMutation: () => void;
    deleteIsPending: boolean;
  }
  
  const CompanyForm = ({
    company,
    onChange,
    onSubmit,
    deleteMutation,
    deleteIsPending,
  }: CompanyFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWorkdayChange = (
      index: number,
      field: "isOpen" | "openTime" | "closeTime",
      value: string | boolean
    ) => {
      if (!company) return;
      const updated = [...company.workday];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    
      onChange("workday", updated);
    };

    return (
      <Box mx="auto" px={4} py={8}>
        <form onSubmit={onSubmit}> 
          <Tabs >
            <TabList>
              <Tab>Info</Tab>
              <Tab>Ejer</Tab>
              <Tab>Adresse</Tab>
              <Tab>Åbningstider</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  mb={5}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Heading mb={6} fontSize="3xl">Virksomhedens Info</Heading>
                  <SimpleGrid columns={[1, null, 2]} spacing={8} >
                  <FormControl>
                      <FormLabel>Virksomhedens Navn</FormLabel>
                      <RoleProtectedElement allowedRoles={['admin']}>
                        <Input
                          type="text"
                          value={company?.name || ""}
                          onChange={(e) => onChange("companyName", e.target.value)}
                        />
                      </RoleProtectedElement>
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>CVR</FormLabel>
                      <RoleProtectedElement allowedRoles={['admin']}>
                        <Input
                          type="number"
                          value={company?.cvr || ""}
                          onChange={(e) => onChange("cvr", e.target.value)}
                        />
                      </RoleProtectedElement>
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>Virksomhedens Email</FormLabel>
                      <Input
                        type="email"
                        value={company?.email || ""}
                        onChange={(e) => onChange("companyEmail", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>Virksomhedens Tlf</FormLabel>
                      <Input
                        type="number"
                        value={company?.phone || ""}
                        onChange={(e) => onChange("companyPhone", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>Logo</FormLabel>
                      <RoleGuard allowedRoles={["admin"]}>
                        <Input
                          type="file"
                          onChange={(e) => onChange("logo", e.target.files?.[0])}
                        />
                      </RoleGuard>
                      <Image
                        borderRadius='full'
                        boxSize='150px'
                        src={company?.logo || ""}
                        alt='Dan Abramov'
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>URL</FormLabel>
                      <RoleProtectedElement allowedRoles={['admin']}>
                        <Input
                          type="text"
                          value={company?.url || ""}
                          onChange={(e) => onChange("url", e.target.value)}
                        />
                      </RoleProtectedElement>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bekræftelsesmetode</FormLabel>
                      <RoleProtectedElement allowedRoles={['admin']}>
                        <Select
                          placeholder="Vælg en metode"
                          value={company?.confirmationMethod || ""}
                          onChange={(e) => onChange("confirmationMethod", e.target.value)}
                        >
                          <option value="confirmation_code">SMS Bekræftelse</option>
                          <option value="depositum">Depositum</option>
                        </Select>
                      </RoleProtectedElement>
                    </FormControl>
                  </SimpleGrid>
                  <Text mt={10} fontSize="small">Oprettet {company?.createdAt?.toString().slice(0, 10)} </Text>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  mb={5}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                <Heading mb={6} fontSize="3xl">Ejer</Heading>
                  <SimpleGrid columns={[1, 2, 3]} spacing={8} >
                    <FormControl>
                      <FormLabel>Ejers Email</FormLabel>
                      <Input
                        type="email"
                        value={company?.user.email || ""}
                        onChange={(e) => onChange("adminEmail", e.target.value)}
                      />
                    </FormControl>

                  </SimpleGrid>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  mb={5}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Heading mb={6} fontSize="3xl">Virksomhedens Adresse</Heading>
                  <SimpleGrid columns={[2, null, 3]} spacing={8} >
                    <FormControl>
                      <FormLabel>Adresse</FormLabel>
                      <Input
                        type="text"
                        value={company?.address.street || ""}
                        onChange={(e) => onChange("street", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>By</FormLabel>
                      <Input
                        type="text"
                        value={company?.address.city || ""}
                        onChange={(e) => onChange("city", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>Postnummer</FormLabel>
                      <Input
                        type="number"
                        value={company?.address.zipCode || ""}
                        onChange={(e) => onChange("zipCode", e.target.value)}
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

              </TabPanel>
              <TabPanel>
                <Box
                  mb={5}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <Heading fontSize="lg" mb={4}>Åbningstider</Heading>
                  <SimpleGrid columns={[1,2 , 3]} spacing={8} >
                    {company?.workday.map((day, index) => (
                      <Box
                        key={day.weekdayId}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        >
                          
                            <VStack spacing={4} >
                              <HStack>
                                <FormLabel>{["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day.weekdayId - 1]}</FormLabel>
                                <Checkbox
                                  isChecked={day?.isOpen}
                                  onChange={(e) => handleWorkdayChange(index, "isOpen", e.target.checked)}
                                />
                              </HStack>
                              <HStack>
                                <FormLabel fontSize="sm">Åbner</FormLabel>
                                <FormControl>
                                    <Input
                                      type="time"
                                      value={day.openTime || ""}
                                      onChange={(e) => handleWorkdayChange(index, "openTime", e.target.value)}
                                      isDisabled={!day.isOpen}
                                    />
                                </FormControl>

                              </HStack>
                              <HStack>
                                <FormLabel fontSize="sm">Lukker</FormLabel>
                                <FormControl>
                                  <Input
                                    type="time"
                                    value={day.closeTime || ""}
                                    onChange={(e) => handleWorkdayChange(index, "closeTime", e.target.value)}
                                    isDisabled={!day.isOpen}
                                  />
                                </FormControl>

                              </HStack>
                            </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </TabPanel>
            </TabPanels>

          
          <Stack direction="row" spacing={4} mr={3}  justify="flex-end">
            <RoleGuard allowedRoles={["admin"]}>
              <Button 
                variant="cancel"
                isLoading={deleteIsPending}
                onClick={onOpen}
              >
                Slet Virksomheden
              </Button>
            </RoleGuard>
            <Button variant="success" type="submit">
              Gem
            </Button>
          </Stack>
          </Tabs>
        </form>
        <RoleGuard allowedRoles={["admin"]}>
          <ConfirmDialogBox
            header="Advarsel"
            description="Er du sikker på, at du vil slette denne virksomhed?"
            confirmButtonText="Slet"
            confirmIsLoading={deleteIsPending}
            isOpen={isOpen}
            handleConfirmClick={deleteMutation}
            onClose={onClose}
          />
        </RoleGuard>
      </Box>
    );
  };
  
  export default CompanyForm;
  