import { Button, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import OffDaysCard from "../components/OffDaysCard"
import useOffDay from "../hooks/useOffDay"
import OffDays from "../types/OffDay";
import { RoleGuard } from "../auth/RoleGuard";
import { useState } from "react";
import OffDayUpdateModal from "../components/OffDayUpdateModal";
import CreateOffDateModal from "../components/CreateOffDateModal";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDialogBox from "../components/ConfirmDialogBox";

const OffDay = () => {
  const queryClient = useQueryClient();
  const offDayQuery = useOffDay();
  const toast = useToast()


  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const { isOpen: isOpenCreateModal, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [updateOffDayData, setUpdateOffDayData] = useState<OffDays>();
  const [offDayDeleteId, setUpdateOffDayDeleteId] = useState<number>();

  const deleteMutation = useDeleteMutation({
    endpoint: `off-day/${offDayDeleteId}`,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['off-day'] });
      await queryClient.refetchQueries({ queryKey: ["off-day"] });
      onCloseDeleteModal();
      toast({
        title: 'Ferien er fjernet',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
  });

  if (offDayQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (offDayQuery.isError) {
    return <div>Error loading...</div>;
  }

  const offDayData = offDayQuery.data ?? [];

  const handleOnOpenEditModal = (offDay: OffDays) => {
    onOpenUpdateModal();
    setUpdateOffDayData(offDay);
  }

  const getOffDayDeleteId = (id: number) => {
    setUpdateOffDayDeleteId(id);
    onOpenDeleteModal()
  }



  return (
    <>
      <RoleGuard allowedRoles={["company_admin"]}>
        <Button data-cy="create-off-day-button" variant="success" mr={3} mb={5} onClick={onOpenCreateModal}>
          Registrer Ferie
        </Button>

        <CreateOffDateModal isOpen={isOpenCreateModal} onClose={onCloseCreateModal} />

      </RoleGuard>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {offDayData.map((offDay: OffDays) => {
          return <OffDaysCard key={offDay.id} offDay={offDay} onOpen={handleOnOpenEditModal} getDeleteId={getOffDayDeleteId} />
        })}
      </SimpleGrid>
      <OffDayUpdateModal offDay={updateOffDayData} onClose={onCloseUpdateModal} isOpen={isOpenUpdateModal} />
      <ConfirmDialogBox
        header="Advarsel"
        description="Er du sikker på, at du vil fjerne den registreret ferie?"
        confirmButtonText="Slet"
        confirmIsLoading={deleteMutation.isPending}
        isOpen={isOpenDeleteModal}
        handleConfirmClick={deleteMutation.mutate}
        onClose={onCloseDeleteModal}
      />

    </>
  )
}

export default OffDay
