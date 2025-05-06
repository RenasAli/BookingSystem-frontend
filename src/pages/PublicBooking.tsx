import { Image, Heading, Text, HStack, Container, Box, SimpleGrid, Spacer, Select, FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import BookingTable from "../components/BookingTable";
import { useCompanyByUrl } from "../hooks/useCompany";
import { useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import useTimeSlot from "../hooks/useTimeSlot";
import dayjs from "../utils/dayjs";
import { useCreateMutation } from "../hooks/useCreateMutation";
import BookingRequest from "../types/BookingRequest";
import SelectedTimeSlot from "../types/SelectedTimeSlot";
import { IoArrowBackOutline } from "react-icons/io5";

const PublicBooking = () => {
    const {companyUrl} = useParams()
    const companyQuery = useCompanyByUrl(companyUrl?? null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [durationMinutes, setDurationMinutes] = useState<number>();
    const [booking, setBooking] = useState<BookingRequest>();
    const [selectedTime, setSelectedTime] = useState<SelectedTimeSlot>();
    const today = dayjs().startOf("day");
    const [selectedDate, setSelectedDate] = useState(today);

    const createMutation = useCreateMutation<BookingRequest>({ endpoint: `booking`, method: "POST", onSuccess: async() => {
        console.log("Booking is created")
      } });


    useEffect(() => {
        if (companyQuery?.data?.services?.length && companyQuery?.data?.services?.length > 0) {
            setDurationMinutes(Number(companyQuery?.data?.services[0].durationMinutes));
            setSelectedServiceId(Number(companyQuery?.data?.services[0].id));
        }

    }, [companyQuery.data?.services]);

    const company = companyQuery.data;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        setSelectedServiceId(selectedId);
      
        const selectedService = company?.services.find(service => service.id === selectedId);
        if (selectedService) {
          setDurationMinutes(selectedService.durationMinutes);
        }
      };
    const timeSlotQuery = useTimeSlot(`companyId=${company?.id}&date=${selectedDate}&duration=${durationMinutes}`);


    if (companyQuery.isLoading) {
        return <div>Loading...</div>;
    }
    
    if (companyQuery.isError) {
        return <div>Error loading...</div>;
    }
    
    const mergeDateAndTime = (date: dayjs.Dayjs, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split('.').map(Number);
        return date.hour(hours + 2).minute(minutes).second(0).millisecond(0).toDate();
    };
    const setBookingField = (field: keyof BookingRequest, value: unknown) => {
        setBooking((prev) => ({ ...prev, companyId: company?.id } as BookingRequest));
        setBooking((prev) => ({ ...prev, serviceId: selectedServiceId} as BookingRequest));
        setBooking((prev) => ({ ...prev, startTime: mergeDateAndTime(selectedDate, selectedTime?.startTime ?? "")} as BookingRequest));
        setBooking((prev) => ({ ...prev, endTime: mergeDateAndTime(selectedDate, selectedTime?.endTime ?? "")} as BookingRequest));

        setBooking((prev) => ({ ...prev, [field]: value } as BookingRequest));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBookingField("companyId", company?.id)
        setBookingField("serviceId", selectedServiceId)
        setBookingField("startTime", mergeDateAndTime(selectedDate, selectedTime?.startTime ?? ""))
        setBookingField("endTime", mergeDateAndTime(selectedDate, selectedTime?.endTime ?? ""))
        if(booking) {
          createMutation.mutate(booking);
        }
    };

  return (
    <>
    <HStack 
        p={1} 
        bg="white"
        w="100%"
        position="fixed"
        top={0}
        zIndex={10}
        boxShadow="md"
    >
        <Image
            borderRadius='full'
            boxSize='75px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
        />      
        <Heading size='lg'>{company?.name}</Heading>
    </HStack>
    <Container maxW={750} p={8} pt="80px">
        <Box borderWidth='1px' p={5} mt={5} boxShadow="lg">
            <HStack>
                <Text mb={5}>Bestil til hos {company?.name}</Text>
                <Spacer/>
                <Select value={String(selectedServiceId)} onChange={handleChange} maxW="200px" mb={5} isDisabled={selectedTime?.isSelected}>
                    {company?.services.map((service) => (
                        <option key={service.id} value={service.id}>
                        {service.name}
                        </option>
                    ))}
                </Select>
            </HStack>
            {selectedTime?.isSelected ? <Box>
                <Box p={4} borderWidth='1px' borderRadius='lg'>
                    <form  onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Navn</FormLabel>
                            <Input
                                type="text"
                                mb={5}
                                onChange={(e)=> setBookingField("customerName",  e.target.value)}
                            />
                            <FormLabel>Mobile Nr.</FormLabel>
                            <Input
                                type="number"
                                mb={5}
                                onChange={(e)=> setBookingField("customerPhone",  e.target.value)}
                            />
                        </FormControl>
                            <Button leftIcon={<IoArrowBackOutline />} colorScheme='blue' variant='solid'>
                                Tilbage
                            </Button>

                        <Button colorScheme="green" type="submit">
                            Godkend
                        </Button>
                    </form>
                </Box>
            </Box>: 
            <BookingTable
                TimeSlots={timeSlotQuery?.data ?? []}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onSelectedTime={setSelectedTime}
            />}
        </Box>
    </Container>

    <Container maxW={750}  p={8} >
        <SimpleGrid columns={[1,2,2]} spacing='20px'>
            <Box borderWidth='1px' borderRadius="lg" p={5} height='250px' boxShadow="lg" minW="217px">
                <Heading size='xs'>Åbningstider:</Heading>
                {company?.workday.map((day) => (
                    <HStack mt={1} key={day.weekdayId}>
                        <Text>{["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day.weekdayId - 1]}</Text>
                        <Spacer />
                        <Text>{day.isOpen ? day.openTime?.split(":").slice(0, 2).join(":") + " - " + day.closeTime?.split(":").slice(0, 2).join(":") :"Lukket"}</Text>
                    </HStack>
                ))}
            </Box>
            <Box>
            <Box borderWidth='1px' borderRadius="lg" p={4} height='120px' boxShadow="lg">
                <Heading size='xs'>Kontakt os</Heading>
                <HStack mt={1}>
                    <FaPhone />
                    <Text > {company?.phone}</Text>
                </HStack>
                <HStack mt={1}>
                    <MdEmail />
                    <Text > {company?.email}</Text>
                </HStack>
            </Box>
            <Box borderWidth='1px' borderRadius="lg" p={4} mt="20px" height='110px' boxShadow="lg">
                <Heading size='xs'>Adresse:</Heading>
                <Text mt={1}>{company?.address.street}</Text>
                <Text>{company?.address.zipCode} {company?.address.city}</Text>
            </Box>
            </Box>
        </SimpleGrid>
    </Container>        

  </>
  )
}

export default PublicBooking
