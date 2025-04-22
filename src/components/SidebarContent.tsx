import { Button, VStack } from "@chakra-ui/react";
import { RoleGuard } from "../auth/RoleGuard";
import { Link } from "react-router-dom";

interface sidebarContentProps {
  onClose: () => void;
}
const SidebarContent = ({onClose}: sidebarContentProps ) => {

  return (
    <VStack align="flex-start"  p={6}>
      <RoleGuard allowedRoles={["company_Admin"]}>
        
        <Button onClick={onClose} as={Link} to="/dashboard/bookings" variant="ghost" w="full" justifyContent="flex-start">
          Bookings
        </Button>
        <Button onClick={onClose} as={Link} to="/dashboard/staff" variant="ghost" w="full" justifyContent="flex-start">
          Medarbejder
        </Button>
        <Button variant="ghost" w="full" justifyContent="flex-start">
          Settings
        </Button>
        <Button variant="ghost" w="full" justifyContent="flex-start">
          Profile
        </Button>
      </RoleGuard>
      </VStack>
  )
}

export default SidebarContent
