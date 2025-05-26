import { Text, HStack, Container, Box, Spacer, Select } from "@chakra-ui/react";
import BookingTable from "../components/BookingTable";
import { useCompanyByUrl } from "../hooks/useCompany";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTimeSlot from "../hooks/useTimeSlot";
import dayjs from "../utils/dayjs";
import { useCreateMutation } from "../hooks/useCreateMutation";
import BookingRequest from "../types/BookingRequest";
import SelectedTimeSlot from "../types/SelectedTimeSlot";
import PublicBookingFooter from "../components/PublicBookingFooter";
import PublicBookingHeader from "../components/PublicBookingHeader";
import CreateBookingForm from "../components/CreateBookingForm";
import BookingFeedbackModal from "../components/BookingFeedbackModal";
import OtpVerificationForm from "../components/OtpVerificationForm";

const PublicBooking = () => {
    const {companyUrl} = useParams();
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const companyQuery = useCompanyByUrl(companyUrl?? null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [durationMinutes, setDurationMinutes] = useState<number>();
    const [booking, setBooking] = useState<BookingRequest>();
    const [selectedTime, setSelectedTime] = useState<SelectedTimeSlot>();
    const today = dayjs().startOf("day");
    const [selectedDate, setSelectedDate] = useState(today);
    const [otpStep, setOtpStep] = useState(false);
    const [bookingData, setBookingData] = useState<{
    bookingId: number;
    companyId: number;
    phoneNumber: string;
    } | null>(null);

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

    const handleSelectServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        setSelectedServiceId(selectedId);
      
        const selectedService = company?.services.find(service => service.id === selectedId);
        if (selectedService) {
          setDurationMinutes(selectedService.durationMinutes);
        }
      };
    const timeSlotQuery = useTimeSlot(`companyId=${company?.id}&date=${selectedDate}&duration=${durationMinutes}`);
    
    const mergeDateAndTime = (date: dayjs.Dayjs, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split('.').map(Number);
        return date.hour(hours + 2).minute(minutes).second(0).millisecond(0).toDate();
    };
    const setBookingField = (field: keyof BookingRequest, value: unknown) => {
        setBooking((prev) => ({ ...prev, [field]: value } as BookingRequest));
      };

    const handleBack =()=> {
        setSelectedTime({
            startTime: "",
            endTime: "",
            isSelected: false
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!company || !company.id || !selectedServiceId || !selectedTime) {
            console.error("Missing required booking fields");
            return;
        }

        if (!booking?.customerName || !booking?.customerPhone) {
            console.error("Missing customer information");
            return;
          }

        const formattedPhoneNumber = `+45${booking.customerPhone?.replace(/^45/, "")}`;
        const newBooking: BookingRequest = {
            ...booking,
            companyId: company.id,
            serviceId: selectedServiceId,
            startTime: mergeDateAndTime(selectedDate, selectedTime.startTime),
            endTime: mergeDateAndTime(selectedDate, selectedTime.endTime),
            customerPhone: formattedPhoneNumber,
        };
        
        try {
            const response = await createMutation.mutateAsync(newBooking);
            console.log("Booking response:", response.data);
            if (company?.confirmationMethod === "confirmation_code") {
                setOtpStep(true);
                setBookingData({
                    bookingId: response.data.bookingId,
                    companyId: response.data.companyId,
                    phoneNumber: formattedPhoneNumber,
                });
                console.log("test");
            } else if(company?.confirmationMethod === "depositum") {
                window.location.href = response.data;
            } else {
                console.error("Unknown confirmation method");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    if (companyQuery.isLoading) {
        return <div>Loading...</div>;
    }
    
    if (companyQuery.isError) {
        return <div>Error loading...</div>;
    }

  return (
    <>
    <PublicBookingHeader logo={company?.logo?? ""} name={company?.name ?? ""} />
    <Container maxW={750} p={8} pt="80px">
        <Box borderWidth='1px' p={5} mt={5} boxShadow="lg">
            <HStack>
                <Text mb={5}>Bestil tid hos {company?.name}</Text>
                <Spacer/>
                <Select
                    value={String(selectedServiceId)}
                    onChange={handleSelectServiceChange}
                    data-cy="service-select"
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
            {otpStep && bookingData ? (
            <OtpVerificationForm
                bookingId={bookingData.bookingId}
                companyId={bookingData.companyId}
                phoneNumber={bookingData.phoneNumber}
                status={status ?? undefined}
                onOtpVerified={() => {
                    setOtpStep(false);
                    window.location.href = "/booking?status=success";
                }}
            />
            ) : selectedTime?.isSelected ? (
            <CreateBookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTime.startTime}
                handleSubmit={handleSubmit}
                setBookingField={setBookingField}
                handleBack={handleBack}
            />
            ) : (
            <BookingTable
                TimeSlots={timeSlotQuery?.data ?? []}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onSelectedTime={setSelectedTime}
            />)}
        </Box>
    </Container>
    {status && (status === "success" || status === "cancel") ? <BookingFeedbackModal status={status}/>: "" }
    <PublicBookingFooter company={company}/>
    </>
  )
}

export default PublicBooking