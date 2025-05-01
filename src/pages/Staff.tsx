import { Button, SimpleGrid, useDisclosure} from "@chakra-ui/react"
import useStaff from "../hooks/useStaff";
import Staffs from "../types/Staff";
import { StaffCard } from "../components";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useQueryClient } from "@tanstack/react-query";
import StaffModal from "../components/StaffModal";

const Staff = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [staff, setStaff] = useState<Staffs>();
  const staffQuery = useStaff();
  const updateMutation = useCreateMutation<Staffs>({ endpoint: `staff/${staff?.id}`, method: "PUT", onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ['staff', staff?.id]});
      await queryClient.refetchQueries({ queryKey: ["staff",] });
      setStaff(undefined)
  } });
  const createMutation = useCreateMutation<Staffs>({ endpoint: `staff`, method: "POST", onSuccess: async() => {
    await queryClient.invalidateQueries({
        queryKey: ['staff', staff?.id]
      })
  } });
  if (staffQuery.isLoading) {
    return <div>Loading...</div>;
  }
    
  if (staffQuery.isError) {
    return <div>Error loading...</div>;
  }   

  const handleOnOpenEditModal = (staff: Staffs) => {
    onOpen();
    setStaff(staff)
  }

  const updateStaffField = (field: keyof Staffs, value: string) => {
    setStaff((prev) => ({ ...prev, [field]: value } as Staffs));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (staff?.id) {
      updateMutation.mutate(staff);
    } else if(staff) {
      createMutation.mutate(staff);
    }
    onClose();
  };

  return (
    <>
    <Button colorScheme="green" mr={3} onClick={onOpen}>
      Opret Medarbejder
    </Button>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {staffQuery?.data?.map((staff: Staffs, index: number) => {
          return <StaffCard key= {index} id={staff.id} name={staff.name} email={staff.email} phone={staff.phone} onOpen={handleOnOpenEditModal}/>;
        })}
    </SimpleGrid>
    <StaffModal
      isOpen={isOpen}
      onClose={onClose}
      staff={staff}
      onChange={updateStaffField}
      onSubmit={handleSubmit}
      isEditing={!!staff?.id}
    />
    </>
  )
}

export default Staff
