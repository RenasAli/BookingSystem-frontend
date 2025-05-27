import { Button, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react"
import useService from "../hooks/useService";
import Service from "../types/Service";
import { ServiceCard, ServiceModal } from "../components";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import { RoleGuard } from "../auth/RoleGuard";

const Services = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [service, setservice] = useState<Service>();
  const [serviceDeleteId, setServiceDeleteId] = useState<number>();

  const serviceQuery = useService();

  const updateMutation = useCreateMutation<Service>({
    endpoint: `service/${service?.id}`, method: "PUT", onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['services', service?.id] });
      await queryClient.refetchQueries({ queryKey: ["services",] });
      setservice(undefined)
    }
  });

  const createMutation = useCreateMutation<Service>({
    endpoint: `service`, method: "POST", onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['services']
      })
    }
  });

  const deleteMutation = useDeleteMutation({
    endpoint: `service/${serviceDeleteId}`,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      await queryClient.refetchQueries({ queryKey: ["services"] });
      onCloseDeleteModal();
      toast({
        title: "Service slettet",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (serviceQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (serviceQuery.isError) {
    return <div>Error loading...</div>;
  }

  const handleOnOpenCreateModal = () => {
    setservice(undefined);
    onOpen();
  }

  const handleOnOpenEditModal = (service: Service) => {
    onOpen();
    setservice(service);
  }

  const handleDeleteService = (id: number) => {
    setServiceDeleteId(id);
    onOpenDeleteModal();
  };

  const updateServiceField = (field: keyof Service, value: string) => {
    setservice((prev) => ({ ...prev, [field]: value } as Service));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (service?.id) {
      updateMutation.mutate(service);
    } else if (service) {
      createMutation.mutate(service);
    }
    onClose();
  };

  return (
    <>
      <RoleGuard allowedRoles={["company_admin"]}>
        <Button data-cy="create-service-button" variant="success" mr={3} mb={5} onClick={handleOnOpenCreateModal}>
          Opret Service
        </Button>
      </RoleGuard>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {serviceQuery?.data?.map((service: Service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onOpen={handleOnOpenEditModal}
            getDeleteId={handleDeleteService}
          />
        ))}
      </SimpleGrid>
      <RoleGuard allowedRoles={["company_admin"]}>
        <ServiceModal
          isOpen={isOpen}
          onClose={onClose}
          service={service}
          onChange={updateServiceField}
          onSubmit={handleSubmit}
          isEditing={!!service?.id}
        />
      </RoleGuard>
      <ConfirmDialogBox
        header="Warning"
        description="Er du sikker på, at du vil fjerne den service?"
        confirmButtonText="Slet"
        confirmIsLoading={deleteMutation.isPending}
        isOpen={isOpenDeleteModal}
        handleConfirmClick={deleteMutation.mutate}
        onClose={onCloseDeleteModal}
      />
    </>
  );
};

export default Services
