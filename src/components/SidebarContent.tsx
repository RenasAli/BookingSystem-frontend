import { Box, Button, Flex, Heading, useToast, VStack } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { handleLogout } from "../auth/handleLogout";
import Cookies from "js-cookie";
import { RoleGuard } from "../auth/RoleGuard";


interface sidebarContentProps {
  onClose: () => void;
}
const SidebarContent = ({onClose}: sidebarContentProps ) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);  
  const toast = useToast();
  const navigate = useNavigate();

  const handleUserOnLogout = ()=> {
    Cookies.remove("role");
    
  }
  

  return (
    <Flex direction="column" height="100vh"  justify="space-between" bgColor="#579AFF">
      <VStack align="flex-start" >
        <Box boxShadow="md" w="full">
        <Heading size="lg" color="white" m={2} >Dashboard</Heading>
        </Box>
        <RoleGuard allowedRoles={["admin"]}>
          <Button onClick={onClose} as={Link} to="/dashboard/companies" variant={isActive("/dashboard/companies") ? "selected_nav" : "nav"}  >
            Virksomheder
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_admin", "company_staff"]}>
          <Button onClick={onClose}  as={Link} to="/dashboard/bookings" variant={isActive("/dashboard/bookings") ? "selected_nav" : "nav"}  >
            Kalender
          </Button>
          <Button onClick={onClose} as={Link} to="/dashboard/staff" variant={isActive("/dashboard/staff") ? "selected_nav" : "nav"} >
            Medarbejder
          </Button>
          <Button onClick={onClose} as={Link} to="/dashboard/services" variant={isActive("/dashboard/services") ? "selected_nav" : "nav"}>
            Services
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_admin"]}>
          <Button onClick={onClose} as={Link} to="/dashboard/settings" variant={isActive("/dashboard/settings") ? "selected_nav" : "nav"}  >
            Indstillinger
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_staff"]}>
          <Button onClick={onClose} as={Link} to="/dashboard/profile" variant={isActive("/dashboard/profile") ? "selected_nav" : "nav"}>
              Profil
          </Button>
        </RoleGuard>
      </VStack>
    
      <Button variant="ghost" leftIcon={<SlLogout />} colorScheme='red' w="full" justifyContent="flex-start" onClick={() => handleLogout(handleUserOnLogout, toast, navigate)}>
        Log ud
      </Button>
    </Flex>
  )
}

export default SidebarContent
