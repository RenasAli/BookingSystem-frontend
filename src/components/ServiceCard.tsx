import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import Service from "../types/Service";
import { RoleGuard } from "../auth/RoleGuard";

interface ServiceCardProps {
    id: number | null,
    name: string | null,
    description: string | null,
    price: number | null,
    durationMinutes: number | null,
    onOpen: (service: Service) => void,
}

const ServiceCard = ({id, name, description, price, durationMinutes, onOpen}:ServiceCardProps) => {
    const handleOnOpen = () => {
        onOpen({id, name, description, price, durationMinutes});
    }
  return (
    <Card>
        <CardHeader>
            <Heading size='md'>{name}</Heading>
        </CardHeader>
        <CardBody>
            {description ? <Text>Beskrivelse: {description}</Text>: null}
            {price ? <Text>Pris: {price} kr.</Text>: null}
            {durationMinutes ? <Text>Varighed: {durationMinutes} min.</Text>: null}
        </CardBody>
        <CardFooter>
            <RoleGuard allowedRoles={["company_admin"]}>
                <Button variant="primary" onClick={handleOnOpen}>Redigere</Button>
            </RoleGuard>
        </CardFooter>
    </Card>

  )
}

export default ServiceCard