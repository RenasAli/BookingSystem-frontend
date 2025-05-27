import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, HStack, Input } from "@chakra-ui/react";
import OffDay from "../types/OffDay";
import { useEffect, useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import CreateOffDay from "../types/CreateOffDate";
import { useQueryClient } from "@tanstack/react-query";
import { getLocalDateAndTimeString } from "../utils/localDateString";
import dayjs from "dayjs";

interface OffDayModalProps {
    isOpen: boolean;
    onClose: () => void;
    offDay: OffDay | undefined;

}
const OffDayUpdateModal = ({isOpen, onClose, offDay}:OffDayModalProps) => {
    const queryClient = useQueryClient();
    
    const updateMutation = useCreateMutation<CreateOffDay>({ endpoint: `off-day/${offDay?.id}`, method: "PUT",
      onSuccess: async() => {
        await queryClient.invalidateQueries({queryKey: ['off-day', offDay?.id]});
        await queryClient.refetchQueries({ queryKey: ["off-day",offDay?.id] });
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');

    } });
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('00:00');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('23:59');

    useEffect(() => {
        if (offDay) {
          setStartDate(dayjs.utc(offDay.startDate).format('YYYY-MM-DD'));
          setStartTime(dayjs.utc(offDay.startDate).format('HH:mm'));
          setEndDate(dayjs.utc(offDay.endDate).format('YYYY-MM-DD'));
          setEndTime(dayjs.utc(offDay.endDate).format('HH:mm'));
        }
    },[offDay]);

    const getISODateTime = (date: string, time: string) => {
        if (!date || !time) return '';
        return getLocalDateAndTimeString(new Date(`${date}T${time}`));
    };

    const onSubmit = () =>{
        const data: CreateOffDay = {
            staffIds: offDay?.id ? [offDay.id] : [] ,
            startDate: getISODateTime(startDate, startTime),
            endDate: getISODateTime(endDate, endTime),
        }
        updateMutation.mutate(data);
        onClose()
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={onSubmit}>
                <ModalHeader>Rediger Registret Ferie</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>{offDay?.staffName}</FormLabel>
                    <HStack>
                        <FormControl mb={4}>
                        <FormLabel>Start Dato</FormLabel>
                        <Input
                            type="date"
                            data-cy="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        </FormControl>
    
                        <FormControl mb={4}>
                        <FormLabel>Start Tid</FormLabel>
                        <Input
                            type="time"
                            data-cy="start-time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl mb={4}>
                        <FormLabel>Slut Dato</FormLabel>
                        <Input
                            type="date"
                            data-cy="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        </FormControl>
                        <FormControl mb={4}>
                        <FormLabel>Slut Tid</FormLabel>
                        <Input
                            type="time"
                            data-cy="end-time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                        </FormControl>
                    </HStack>
                  </FormControl>
                  
                </ModalBody>
                <ModalFooter>
                  <Button data-cy="cancel-button" variant="cancel" mr={3} onClick={onClose}>
                    Luk
                  </Button>
                  <Button data-cy="save-button" variant="primary"type="submit">
                    Gem
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
  )
}

export default OffDayUpdateModal
