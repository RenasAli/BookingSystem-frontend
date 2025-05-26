import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Menu, MenuButton, MenuList, Spacer, Text } from "@chakra-ui/react";
import Staff, { staffWorkdays } from "../types/Staff";
import { RoleGuard } from "../auth/RoleGuard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

interface staffCardProps {
    id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    staffWorkdays: staffWorkdays[],
    onOpen: (staff: Staff) => void,
    getDeleteId: (id: number) => void,
}

const StaffCard = ({ id, name, email, phone, staffWorkdays, onOpen, getDeleteId }: staffCardProps) => {
    const handleOnOpen = () => {
        onOpen({ id, name, email, phone, staffWorkdays });
    };

    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Heading size="md">{name}</Heading>
                    <Spacer />
                    <Menu placement="bottom-end">
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BsThreeDotsVertical />}
                            variant="ghost"
                            mt={-2}
                            mr={-4}
                        />
                        <MenuList minW="120px" p={0}>
                            <Button
                                w="full"
                                data-cy="delete-button"
                                rightIcon={<RiDeleteBin6Line />}
                                onClick={() => id && getDeleteId(id)} // ✅ use passed-in delete handler
                                variant="cancel"
                            >
                                Slet
                            </Button>
                        </MenuList>
                    </Menu>
                </Flex>
            </CardHeader>
            <CardBody>
                {email ? <Text>Email: {email}</Text> : null}
                {phone ? <Text>Tlf: {phone}</Text> : null}
            </CardBody>
            <CardFooter>
                <RoleGuard allowedRoles={["company_admin"]}>
                    <Button data-cy="edit-button" variant="primary" onClick={handleOnOpen}>Redigere</Button>
                </RoleGuard>
            </CardFooter>
        </Card>
    );
};

export default StaffCard
