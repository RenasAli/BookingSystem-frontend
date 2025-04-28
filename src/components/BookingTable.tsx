import { Box, Button, Flex, Grid, IconButton, Input, Spacer, Text } from "@chakra-ui/react"
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useState } from "react";
import dayjs from "dayjs";

const generateTimes = (start = 9, end = 18) => {
    const times = [];
    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const formatted = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        times.push(formatted);
      }
    }
    return times;
};

const BookingTable = () => {

    const today = dayjs().startOf("day");
    const [selectedDate, setSelectedDate] = useState(today);

    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    const times = generateTimes();
     
      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = dayjs(e.target.value);
      
        if (date.isBefore(today, "day")) return;
        setSelectedDate(date.startOf("day"));
        setSelectedTime(null);
      };
    
      const handleNextDay = () => {
        setSelectedDate((prev) => prev.add(1, "day"));
        setSelectedTime(null);
      };
    
      const handlePrevDay = () => {
        if (selectedDate.isAfter(today)) {
          setSelectedDate((prev) => prev.subtract(1, "day"));
          setSelectedTime(null);
        }
      };
  return (
    <Box>
      <Box p={8} borderWidth='1px' borderRadius='lg'>
      <Flex  marginBottom={5}>
        <IconButton
          variant='outline'
          borderWidth={0}
          aria-label='Previous'
          icon={<GrPrevious/>}
          onClick={handlePrevDay}
          isDisabled={selectedDate.isSame(today, "day")}
        />
        <Spacer />
        <Input
          fontWeight={600}
          type="date"
          value={selectedDate.format("YYYY-MM-DD")}
          onChange={handleDateChange}
          min={dayjs().format("YYYY-MM-DD")}
          gap={2}
          borderWidth={0}
          maxWidth={40}
        />
        <Spacer />
        <IconButton
          variant='outline'
          borderWidth={0}
          aria-label='Next'
          icon={<GrNext/>}
          onClick={handleNextDay}
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={2} >
        {times.map((time) => (
          <Button
            key={time}
            onClick={() => setSelectedTime(time)}
            colorScheme={selectedTime === time ? "teal" : "gray"}
            variant={selectedTime === time ? "solid" : "outline"}
          >
            {time}
          </Button>
        ))}
      </Grid>
      {selectedTime && (
        <Text mt={4} fontWeight="medium">
          Valgt tid: {selectedTime}
        </Text>
      )}
    </Box>
    </Box>
  )
}

export default BookingTable
