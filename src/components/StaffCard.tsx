import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import Staff from "../types/Stoff";
interface staffCardProps {
    id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    onOpen: (staff: Staff) => void,
}

const StaffCard = ({id, name, email, phone, onOpen}:staffCardProps) => {
    const handleOnOpen = () => {
        onOpen({id, name, email,phone});
    }
  return (
    <Card>
        <CardHeader>
            <Heading size='md'>{name}</Heading>
        </CardHeader>
        <CardBody>
            {email ? <Text>Email: {email}</Text>: null}
            {phone ? <Text>Tlf: {phone}</Text>: null}
        </CardBody>
        <CardFooter>
            <Button colorScheme='blue' onClick={handleOnOpen}>Redigere</Button>
        </CardFooter>
    </Card>

  )
}

export default StaffCard
