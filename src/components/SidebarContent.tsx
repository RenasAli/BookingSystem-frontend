import { Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface sidebarContentProps {
  onClose: () => void;
}
const SidebarContent = ({onClose}: sidebarContentProps ) => {

  return (
    <VStack align="flex-start"  p={6}>
      
        <Button onClick={onClose} as={Link} to="/dashboard/companies" variant="ghost" w="full" justifyContent="flex-start">
          Virksomheder
        </Button>
        <Button onClick={onClose} as={Link} to="/dashboard/bookings" variant="ghost" w="full" justifyContent="flex-start">
          Kalender
        </Button>
        <Button onClick={onClose} as={Link} to="/dashboard/staff" variant="ghost" w="full" justifyContent="flex-start">
          Medarbejder
        </Button>
        <Button onClick={onClose} as={Link} to="/dashboard/services" variant="ghost" w="full" justifyContent="flex-start">
          Services
        </Button>
        <Button onClick={onClose} as={Link} to="/dashboard/settings" variant="ghost" w="full" justifyContent="flex-start">
          Indstillinger
        </Button>

        <Button variant="ghost" w="full" justifyContent="flex-start">
          Profile
        </Button>
      </VStack>
  )
}

export default SidebarContent
