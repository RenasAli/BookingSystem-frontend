import { Text, HStack, Container, Box, Spacer, Select } from "@chakra-ui/react";
import BookingTable from "../components/BookingTable";
import { useCompanyByUrl } from "../hooks/useCompany";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTimeSlot from "../hooks/useTimeSlot";
import dayjs from "../utils/dayjs";
import { useCreateMutation } from "../hooks/useCreateMutation";
import BookingRequest from "../types/BookingRequest";
import SelectedTimeSlot from "../types/SelectedTimeSlot";
import PublicBookingFooter from "../components/PublicBookingFooter";
import PublicBookingHeader from "../components/PublicBookingHeader";
import CreateBookingForm from "../components/CreateBookingForm";

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

    const handleBack =()=> {
        setSelectedTime({
            startTime: "",
            endTime: "",
            isSelected: false
        });
    }

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
    <PublicBookingHeader logo={company?.logo?? ""} name={company?.name ?? ""} />
    <Container maxW={750} p={8} pt="80px">
        <Box borderWidth='1px' p={5} mt={5} boxShadow="lg">
            <HStack>
                <Text mb={5}>Bestil til hos {company?.name}</Text>
                <Spacer/>
                <Select
                    value={String(selectedServiceId)}
                    onChange={handleChange}
                    maxW="200px"
                    mb={5}
                    isDisabled={selectedTime?.isSelected}
                >
                    {company?.services.map((service) => (
                        <option key={service.id} value={service.id}>
                        {service.name}
                        </option>
                    ))}
                </Select>
            </HStack>
            {selectedTime?.isSelected ? 
            <CreateBookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTime.startTime}
                handleSubmit={handleSubmit}
                setBookingField={setBookingField}
                handleBack={handleBack}
            />
            : 
            <BookingTable
                TimeSlots={timeSlotQuery?.data ?? []}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onSelectedTime={setSelectedTime}
            />}
        </Box>
    </Container>

    <PublicBookingFooter company={company}/>
    </>
  )
}

export default PublicBooking
