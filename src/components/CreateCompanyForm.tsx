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
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Select
  } from "@chakra-ui/react";
  import { FormEvent } from "react";
  import { CompanyRequest } from "../types/Copmpany";
  
  interface CreateCompanyFormProps {
    company: CompanyRequest | undefined;
    onChange: (field: keyof CompanyRequest, value: unknown) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  }
  
  const CreateCompanyForm = ({
    company,
    onChange,
    onSubmit,
  }: CreateCompanyFormProps) => {

    
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
          <Heading mb={6}>
            Opret Virksomhed
          </Heading>
          
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
                  <FormControl isRequired>
                      <FormLabel>Virksomhedens Navn</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => onChange("companyName", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl isRequired>
                      <FormLabel>CVR</FormLabel>
                      <Input
                        type="number"
                        onChange={(e) => onChange("cvr", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl >
                      <FormLabel>Virksomhedens Email</FormLabel>
                      <Input
                        type="email"
                        onChange={(e) => onChange("companyEmail", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl isRequired>
                      <FormLabel >Virksomhedens Tlf</FormLabel>
                      <Input
                        type="number"
                        onChange={(e) => onChange("companyPhone", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl>
                      <FormLabel>Logo</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange("logo" , e.target.files?.[0])}
                      />
                    </FormControl>
          
                    <FormControl isRequired>
                      <FormLabel>URL</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => onChange("url", e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Bekræftelsesmetode</FormLabel>
                      <Select
                        placeholder="Vælg en metode"
                        onChange={(e) => onChange("confirmationMethod", e.target.value)}
                      >
                        <option value="confirmation_code">SMS Bekræftelse</option>
                        <option value="depositum">Depositum</option>
                      </Select>
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
                <Heading mb={6} fontSize="3xl">Ejer</Heading>
                  <SimpleGrid columns={[1, 2, 3]} spacing={8} >
                    <FormControl isRequired>
                      <FormLabel>Ejers Email</FormLabel>
                      <Input
                        type="email"
                        onChange={(e) => onChange("adminEmail", e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Ejers Navn</FormLabel>
                      <Input
                        type="name"
                        onChange={(e) => onChange("adminName", e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Ejers Password</FormLabel>
                      <Input
                        autoComplete="new-password"
                        type="password"
                        onChange={(e) => onChange("adminPassword", e.target.value)}
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
                    <FormControl isRequired>
                      <FormLabel>Adresse</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => onChange("street", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl isRequired>
                      <FormLabel>By</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => onChange("city", e.target.value)}
                      />
                    </FormControl>
          
                    <FormControl isRequired>
                      <FormLabel>Postnummer</FormLabel>
                      <Input
                        type="number"
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
                                  onChange={(e) => handleWorkdayChange(index, "isOpen", e.target.checked)}
                                />
                              </HStack>
                              <HStack>
                                <FormLabel fontSize="sm">Åbner</FormLabel>
                                <FormControl>
                                    <Input
                                      type="time"
                                      onChange={(e) => handleWorkdayChange(index, "openTime", e.target.value)}
                                    />
                                </FormControl>

                              </HStack>
                              <HStack>
                                <FormLabel fontSize="sm">Lukker</FormLabel>
                                <FormControl>
                                  <Input
                                    type="time"
                                    onChange={(e) => handleWorkdayChange(index, "closeTime", e.target.value)}
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
            <Button colorScheme="green" type="submit">
              Opret
            </Button>
          </Stack>
          </Tabs>
        </form>
      </Box>
    );
  };
  
  export default CreateCompanyForm;
  