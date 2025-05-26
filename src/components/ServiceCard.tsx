import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Menu, MenuButton, MenuList, Spacer, Text } from "@chakra-ui/react";
import Service from "../types/Service";
import { RoleGuard } from "../auth/RoleGuard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ServiceCardProps {
    service: Service;
    onOpen: (service: Service) => void;
    getDeleteId: (id: number) => void;
}

const ServiceCard = ({ service, onOpen, getDeleteId }: ServiceCardProps) => {
    const { id, name, description, price, durationMinutes } = service;

    const handleOnOpen = () => {
        onOpen(service);
    };

    return (
        <Card>
            <CardHeader>
                <Flex >
                    <Heading size='md'>{name}</Heading>
                    <Spacer />
                    <Menu placement="bottom-end">
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BsThreeDotsVertical />}
                            variant='ghost'
                            mt={-2} mr={-4}
                        />
                        <MenuList minW="120px" p={0}>
                            <Button
                                w="full"
                                rightIcon={<RiDeleteBin6Line />}
                                data-cy="delete-button"
                                onClick={() => id && getDeleteId(id)}
                                variant="cancel"
                            >
                                Slet
                            </Button>
                        </MenuList>
                    </Menu>
                </Flex>
            </CardHeader>
            <CardBody>
                {description ? <Text>Beskrivelse: {description}</Text> : null}
                {price ? <Text>Pris: {price} kr.</Text> : null}
                {durationMinutes ? <Text>Varighed: {durationMinutes} min.</Text> : null}
            </CardBody>
            <CardFooter>
                <RoleGuard allowedRoles={["company_admin"]}>
                    <Button data-cy="edit-button" variant="primary" onClick={handleOnOpen}>Redigere</Button>
                </RoleGuard>
            </CardFooter>
        </Card>
    )
}

export default ServiceCard