import { Card, Button, CardBody, CardFooter, CardHeader, Heading, Text, Flex, IconButton, Spacer, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import OffDay from "../types/OffDay";
import { RoleGuard } from "../auth/RoleGuard";
import { format } from 'date-fns';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";



interface OffDayCardProps {
  offDay: OffDay,
  onOpen: (offDay: OffDay) => void,
  getDeleteId: (id: number) => void
}
const OffDaysCard = ({offDay, onOpen, getDeleteId}: OffDayCardProps) => {
    const formattedStartDate = format(new Date(offDay.startDate), "dd-MM-yyyy");
    const formattedEndDate = format(new Date(offDay.endDate), "dd-MM-yyyy");

    const handleOnOpen = () => {
      onOpen(offDay);
    }

  return (
    <Card>
      <CardHeader>
        <Flex >
        <Heading size='md'>{offDay.staffName}</Heading>
        <Spacer/>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<BsThreeDotsVertical />}
            variant='ghost'
            mt={-2} mr={-4}
          />
          <MenuList minW="120px" p={0}>
            <Button w="full" rightIcon={<RiDeleteBin6Line/>} onClick={()=> getDeleteId(offDay.id)} variant="cancel">
              Slet
            </Button>
          </MenuList>
        </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        {offDay.startDate ? <Text mb={2}>Starter: {formattedStartDate}</Text>: null}
        {offDay.endDate ? <Text>Sluter: {formattedEndDate}</Text>: null}
      </CardBody>
      <CardFooter>
        <RoleGuard allowedRoles={["company_admin"]}>
            <Button variant="primary" onClick={handleOnOpen}>Redigere</Button>
        </RoleGuard>
      </CardFooter>
    </Card>
  )
}

export default OffDaysCard
