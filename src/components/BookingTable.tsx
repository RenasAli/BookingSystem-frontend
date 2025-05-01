import { Box, Button, Flex, Grid, IconButton, Input, Spacer, Text } from "@chakra-ui/react"
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
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

interface BookingTableProps {
  selectedTime: string | null;
  selectedDate: string;
  onTimeSelect: (time: string) => void;
  onDateChange: (date: string) => void;
  onBookClick: () => void;
}

const BookingTable = ({
  selectedTime,
  selectedDate,
  onTimeSelect,
  onDateChange,
  onBookClick,
}: BookingTableProps) => {
  const today = dayjs().startOf("day");
  const selected =dayjs(selectedDate);
  
  const times = generateTimes();
    
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(e.target.value);
    if (date.isBefore(today, "day")) return;
    onDateChange(date.startOf("day").format("DD-MM-YYYY"));
  };

  const handleNextDay = () => {
    onDateChange(selected.add(1, "day").format("DD-MM-YYYY"));
  };

  const handlePrevDay = () => {
    if (selected.isAfter(today)) {
      onDateChange(selected.subtract(1, "day").format("DD-MM-YYYY"));
    }
  };
  
  return (
    <Box p={8} borderWidth='1px' borderRadius='lg'>
      <Flex  marginBottom={5}>
        <IconButton
          variant='outline'
          borderWidth={0}
          aria-label='Previous'
          icon={<GrPrevious/>}
          onClick={handlePrevDay}
          isDisabled={selected.isSame(today, "day")}
        />
        <Spacer />
        <Input
          fontWeight={600}
          type="date"
          value={selected.format("YYYY-MM-DD")}
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
            onClick={() => onTimeSelect(time)}
            colorScheme={selectedTime === time ? "teal" : "gray"}
            variant={selectedTime === time ? "solid" : "outline"}
          >
            {time}
          </Button>
        ))}
      </Grid>
      {selectedTime && (
        <Text mt={4} fontWeight="medium">
          Valgt dato: {selected.format("DD-MM-YYYY")}
          <br />
          Valgt tid: {selectedTime}
        </Text>
      )}
      <Button
        mt={2}
        onClick={onBookClick}
        isDisabled={!selectedTime}
        colorScheme="green"
      >
        Book tid
      </Button>
    </Box>
  );
};

export default BookingTable