import { Box, Button, Card, CardBody, FormControl, FormLabel, HStack, Input, Spacer, Text } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import BookingRequest from "../types/BookingRequest";

interface CreateBookingFormProps {
    selectedDate: Dayjs;
    selectedTime: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)=> void;
    handleBack: ()=> void;
    setBookingField: (field: keyof BookingRequest, value: unknown) => void;
}

const CreateBookingForm = ({
    selectedDate,
    selectedTime,
    handleSubmit,
    setBookingField,
    handleBack,
}:CreateBookingFormProps ) => {
  return (
    <Box>
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
                <Card  variant='elevated' mb={5}>
                    <CardBody>
                        <Text>{selectedDate.format("DD-MM-YYYY")}</Text>
                        <Text>Kl: {selectedTime}</Text>
                    </CardBody>
                </Card>
                <HStack>
                    <Button colorScheme='gray' variant='solid' onClick={handleBack}>
                        Tilbage
                    </Button>
                    <Spacer/>
                    <Button colorScheme="green" type="submit">
                        Godkend
                    </Button>
                </HStack>
            </form>
        </Box>
    </Box>
  )
}

export default CreateBookingForm
