import { Button, SimpleGrid, useDisclosure} from "@chakra-ui/react"
import useService from "../hooks/useService";
import Service from "../types/Service";
import { ServiceCard, ServiceModal } from "../components";
import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useQueryClient } from "@tanstack/react-query";
import { RoleGuard } from "../auth/RoleGuard";

const Services = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [service, setservice] = useState<Service>();
  const serviceQuery = useService();
  const updateMutation = useCreateMutation<Service>({ endpoint: `service/${service?.id}`, method: "PUT", onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ['services', service?.id]});
      await queryClient.refetchQueries({ queryKey: ["services",] });
      setservice(undefined)
  } });
  const createMutation = useCreateMutation<Service>({ endpoint: `service`, method: "POST", onSuccess: async() => {
    await queryClient.invalidateQueries({
        queryKey: ['services', service?.id]
      })
  } });
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

  const updateServiceField = (field: keyof Service, value: string) => {
    setservice((prev) => ({ ...prev, [field]: value } as Service));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (service?.id) {
      updateMutation.mutate(service);
    } else if(service) {
      createMutation.mutate(service);
    }
    onClose();
  };
  return (
    <>
    <RoleGuard allowedRoles={["company_admin"]}>
      <Button variant="success" mr={3} mb={5} onClick={handleOnOpenCreateModal}>
        Opret Service
      </Button>
    </RoleGuard>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {serviceQuery?.data?.map((service: Service, index: number) => {
          return <ServiceCard
          key={index}
          id={service.id}
          name={service.name}
          description={service.description}
          price={service.price}
          durationMinutes={service.durationMinutes}
          onOpen={handleOnOpenEditModal}
        />;
        })}
    </SimpleGrid>
    <RoleGuard allowedRoles={["company_admin"]}>
      <ServiceModal isOpen={isOpen} onClose={onClose} service={service} onChange= {updateServiceField} onSubmit={handleSubmit} isEditing={!!service?.id}/>
    </RoleGuard>
    </>
  )
}

export default Services
