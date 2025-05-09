import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import Staff, { staffWorkdays } from "../types/Staff";
import { RoleGuard } from "../auth/RoleGuard";
interface staffCardProps {
    id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    staffWorkdays: staffWorkdays[] ,
    onOpen: (staff: Staff) => void,
}

const StaffCard = ({id, name, email, phone, staffWorkdays, onOpen}:staffCardProps) => {
    const handleOnOpen = () => {
        onOpen({id, name, email, phone, staffWorkdays});
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
            <RoleGuard allowedRoles={["company_admin"]}>
                <Button colorScheme='blue' onClick={handleOnOpen}>Redigere</Button>
            </RoleGuard>
        </CardFooter>
    </Card>

  )
}

export default StaffCard
