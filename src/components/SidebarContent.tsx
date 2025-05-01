import { Button, Flex, useToast, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { handleLogout } from "../auth/handleLogout";
import Cookies from "js-cookie";


interface sidebarContentProps {
  onClose: () => void;
}
const SidebarContent = ({onClose}: sidebarContentProps ) => {
  
  const toast = useToast();
  const navigate = useNavigate();

  const handleUserOnLogout = ()=> {
    Cookies.remove("role");
    
  }
  

  return (
    <Flex direction="column" height="100vh" p={6} justify="space-between">
      <VStack align="flex-start" spacing={4}>
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
    
      <Button variant="ghost" leftIcon={<SlLogout />} colorScheme='red' w="full" justifyContent="flex-start" onClick={() => handleLogout(handleUserOnLogout, toast, navigate)}>
        Log ud
      </Button>
    </Flex>
  )
}

export default SidebarContent
