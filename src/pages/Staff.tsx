import { Button, SimpleGrid, useDisclosure} from "@chakra-ui/react"
import useStaff from "../hooks/useStaff";
import Staffs from "../types/Staff";
import { StaffCard } from "../components";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useQueryClient } from "@tanstack/react-query";
import StaffModal from "../components/StaffModal";
import { RoleGuard } from "../auth/RoleGuard";

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

  const staffData = staffQuery.data ?? [];

  const handleOnOpenCreateModal = () => {
    setStaff(undefined);
    onOpen();
  }
  const handleOnOpenEditModal = (staff: Staffs) => {
    onOpen();
    setStaff(staff);
  }

  const updateStaffField = (field: keyof Staffs, value: unknown) => {
    //setStaff((prev) => ({ ...prev, [field]: value } as Staffs));
    setStaff((prev) => {
          if (!prev) return prev;
      
          const updatedStaff = { ...prev };
      
          switch (field) {
            case "name":
              updatedStaff.name = value as string;
              break;
            case "email":
              updatedStaff.email = value as string;
              break;
            case "phone":
              updatedStaff.phone = value as string;
              break;
            case "staffWorkdays":
              updatedStaff.staffWorkdays = value as Staffs["staffWorkdays"];
              break;
            default:
              console.warn(`Unhandled field in updateCompanyField: ${field}`);
          }
      
          return updatedStaff;
        });
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
    <RoleGuard allowedRoles={["company_admin"]}>
      <Button variant="success" mr={3} mb={5} onClick={handleOnOpenCreateModal}>
        Opret Medarbejder
      </Button>
    </RoleGuard>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {staffData.map((staff: Staffs, index: number) => {
          return <StaffCard key= {index} id={staff.id} name={staff.name} email={staff.email} phone={staff.phone} staffWorkdays={staff.staffWorkdays} onOpen={handleOnOpenEditModal}/>;
        })}
    </SimpleGrid>
    <RoleGuard allowedRoles={["company_admin"]}>
      <StaffModal
        isOpen={isOpen}
        onClose={onClose}
        staff={staff}
        onChange={updateStaffField}
        onSubmit={handleSubmit}
        isEditing={!!staff?.id}
      />
    </RoleGuard>
    </>
  )
}

export default Staff
