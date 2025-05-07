import { Box, Button, Flex, Grid, IconButton, Input, Spacer } from "@chakra-ui/react"
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Dayjs } from "dayjs";
import dayjs from "../utils/dayjs";
import TimeSlot from "../types/TimeSlot";
import SelectedTimeSlot from "../types/SelectedTimeSlot";

interface BookingTableProps {
  TimeSlots: TimeSlot[];
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  onSelectedTime: (data: SelectedTimeSlot) => void;
}
const BookingTable = ({TimeSlots, selectedDate, setSelectedDate, onSelectedTime}:BookingTableProps) => {
    const today = dayjs().startOf("day");

    const times = TimeSlots;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = dayjs(e.target.value);

      if (date.isBefore(selectedDate, "day")) return;
      setSelectedDate(date.startOf("day"));
    };

    const handleNextDay = () => {
      setSelectedDate(selectedDate.add(1, "day"));
    };

    const handlePrevDay = () => {
      if (selectedDate.isAfter(today)) {
        setSelectedDate(selectedDate.subtract(1, "day"));
      }


    };

  return (
    <Box>
      <Box p={4} borderWidth='1px' borderRadius='lg'>
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
        {times.map((time, index: number) => (
          <Button
            key={index}
            onClick={() => onSelectedTime({startTime: time.startTime, endTime: time.endTime, isSelected: true})}
            variant={time.isAvailable ? "outline" : "solid"}
            isDisabled={!time.isAvailable}
          >
            {time.startTime}
          </Button>
        ))}
      </Grid>
    </Box>
  </Box>
  )
}

export default BookingTable