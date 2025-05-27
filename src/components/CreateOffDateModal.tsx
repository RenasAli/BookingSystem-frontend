import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Input, Select, useToast, Box, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useStaff from '../hooks/useStaff';
import { useCreateMutation } from '../hooks/useCreateMutation';
import { useQueryClient } from '@tanstack/react-query';
import CreateOffDay from '../types/CreateOffDate';
import Staff from '../types/Staff';
import { IoCloseOutline } from "react-icons/io5";
import { getLocalDateAndTimeString } from '../utils/localDateString';

interface OffDayModalProps {
    isOpen: boolean;
    onClose: () => void;

}
interface SelectedStaff {
    id: number ;
    name: string ;
}
const CreateOffDateModal = ({isOpen, onClose}: OffDayModalProps) => {
    const queryClient = useQueryClient();
    const toast = useToast()

    
    const staffQuery = useStaff();
    const initialStaffList = staffQuery.data;

    const [availableStaff, setAvailableStaff] = useState<Staff[]>();
    const [selectedStaff, setSelectedStaff] = useState<SelectedStaff[]>([]);
    
    useEffect(() => {
        if(initialStaffList){
            setAvailableStaff(initialStaffList)
        }
    },[initialStaffList]);


    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('00:00');

    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('23:59');

    const getISODateTime = (date: string, time: string) => {
        if (!date || !time) return '';
        return getLocalDateAndTimeString(new Date(`${date}T${time}`));
    };

    const createMutation = useCreateMutation<CreateOffDay>({ endpoint: `off-day`, method: "POST", onSuccess: async() => {
        await queryClient.invalidateQueries({
            queryKey: ['staff']
        })
    } });

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const selected = availableStaff!.find((s) => s.id === selectedId);
        if (!selected)return;


        const newStaff: SelectedStaff = {
            id: selected.id!,
            name: selected.name!,
        };

        // Add to selected list (type-safe)
        setSelectedStaff((prev) => [...prev, newStaff]);

        // Remove from dropdown
        setAvailableStaff((prev) => prev!.filter((s) => s.id !== selectedId));
    
    };
    const handleUnSelect = (id: number) => {
        const unSelected = initialStaffList!.find((s) => s.id === id);
        if (!unSelected)return;




        setAvailableStaff((prev) => [...prev ?? [], unSelected]);

        setSelectedStaff((prev) => prev!.filter((s) => s.id !== id));
    
    };

    const handleSubmit = () => {
    if (selectedStaff?.length === 0 || !startDate || !endDate) {
      toast({
        title: 'All fields are required.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const data: CreateOffDay = {
      staffIds: selectedStaff?.map((staff: SelectedStaff) => staff.id) ?? [],
      startDate: getISODateTime(startDate, startTime),
      endDate: getISODateTime(endDate, endTime),
    }

    createMutation.mutate(data)
    onClose()
    setSelectedStaff([])
    setStartDate('')
    setStartTime('00:00')
    setEndDate('')
    setEndTime('23:59')
    }
    const onCloseModalHandle = () => {
        setSelectedStaff([])
        setAvailableStaff([])
        setAvailableStaff(initialStaffList)
        onClose()

    }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModalHandle}>
        <ModalOverlay />
        <ModalContent>
            <form onSubmit={handleSubmit}>
            <ModalHeader>Rediger Registret Ferie</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl mb={4}>
                <FormLabel>Medarbejdere</FormLabel>
                {selectedStaff.length > 0 ? 
                <Box
                    mb={5}
                    p={1}
                    borderWidth="1px"> {selectedStaff?.map((staff) => {
                        return <Button size="sm" key={staff.id} variant="primary" rightIcon={<IoCloseOutline/>} m={1} onClick= {()=> handleUnSelect(staff.id)}>
                                    {staff.name}
                                </Button>
                    })}</Box>:""}
                <Select
                    placeholder="Vælg Medarbejder"
                    size="lg"
                    height="auto"
                    data-cy="select-staff"
                    onChange={handleSelect}
                    >
                    {availableStaff?.map((staff) => (
                        <option key={staff.id} value={Number(staff.id)}>
                        {staff.name}
                        </option>
                    ))}
                </Select>
                </FormControl>
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

export default CreateOffDateModal
