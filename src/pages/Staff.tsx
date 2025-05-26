import { Button, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react"
import useStaff from "../hooks/useStaff";
import Staffs, { staffWorkdays } from "../types/Staff";
import { StaffCard } from "../components";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import StaffModal from "../components/StaffModal";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import { RoleGuard } from "../auth/RoleGuard";

const weekdayTemplate: staffWorkdays[] = [
    { weekdayId: 1, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 2, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 3, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 4, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 5, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 6, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
    { weekdayId: 7, isActive: false, startTime: "00:00:00", endTime: "00:00:00" },
]

const Staff = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [staff, setStaff] = useState<Staffs>();
  const [staffDeleteId, setStaffDeleteId] = useState<number>();
  
  const staffQuery = useStaff();

  const updateMutation = useCreateMutation<Staffs>({
    endpoint: `staff/${staff?.id}`, method: "PUT", onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['staff', staff?.id] });
      await queryClient.refetchQueries({ queryKey: ["staff",] });
      setStaff(undefined)
    }
  });

  const createMutation = useCreateMutation<Staffs>({
    endpoint: `staff`, method: "POST", onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['staff']
      })
    }
  });

  const deleteMutation = useDeleteMutation({
    endpoint: `staff/${staffDeleteId}`,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["staff"] });
      await queryClient.refetchQueries({ queryKey: ["staff"] });
      onCloseDeleteModal();
      toast({
        title: "Medarbejder slettet",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (staffQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (staffQuery.isError) {
    return <div>Error loading...</div>;
  }

  const staffData = staffQuery.data ?? [];

  const handleOnOpenCreateModal = () => {
    setStaff(undefined);
    setStaff((prev) => ({ ...prev, staffWorkdays: weekdayTemplate } as Staffs));
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
        case "password":
          updatedStaff.password = value as string;
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

  const handleDeleteStaff = (id: number) => {
    setStaffDeleteId(id);
    onOpenDeleteModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (staff?.id) {
      updateMutation.mutate(staff);
    } else if (staff) {
      createMutation.mutate(staff);
    }
    onClose();
  };

  return (
    <>
      <RoleGuard allowedRoles={["company_admin"]}>
        <Button data-cy="create-staff-button" variant="success" mr={3} mb={5} onClick={handleOnOpenCreateModal}>
          Opret Medarbejder
        </Button>
      </RoleGuard>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {staffData.map((staff: Staffs, index: number) => (
          <StaffCard
            key={index}
            id={staff.id}
            name={staff.name}
            email={staff.email}
            phone={staff.phone}
            staffWorkdays={staff.staffWorkdays}
            onOpen={handleOnOpenEditModal}
            getDeleteId={handleDeleteStaff}
          />
        ))}
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
      <ConfirmDialogBox
              header="Warning"
              description="Er du sikker på, at du vil fjerne den medarbejder?"
              confirmButtonText="Delete"
              confirmIsLoading={deleteMutation.isPending}
              isOpen={isOpenDeleteModal}
              handleConfirmClick={deleteMutation.mutate}
              onClose={onCloseDeleteModal}
            />
    </>
  )
}

export default Staff
