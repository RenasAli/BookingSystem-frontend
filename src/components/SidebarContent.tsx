import { Box, Button, Flex, Heading, useToast, VStack } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { handleLogout } from "../auth/handleLogout";
import Cookies from "js-cookie";
import { RoleGuard } from "../auth/RoleGuard";
import { MdOutlineHomeWork } from "react-icons/md";
import { LuCalendarFold } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


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
          <Button onClick={onClose} as={Link} to="/dashboard/companies" variant={isActive("/dashboard/companies") ? "selected_nav" : "nav"} leftIcon={<MdOutlineHomeWork/>} >
            Virksomheder
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_admin", "company_staff"]}>
          <Button onClick={onClose}  as={Link} to="/dashboard/bookings" variant={isActive("/dashboard/bookings") ? "selected_nav" : "nav"} leftIcon={<LuCalendarFold/>} >
            Kalender
          </Button>
          <Button onClick={onClose} as={Link} to="/dashboard/staff" variant={isActive("/dashboard/staff") ? "selected_nav" : "nav"} leftIcon={<IoIosPeople/>} >
            Medarbejder
          </Button>
          <Button onClick={onClose} as={Link} to="/dashboard/services" variant={isActive("/dashboard/services") ? "selected_nav" : "nav"} leftIcon={<LuClipboardList/>}>
            Services
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_admin"]}>
          <Button onClick={onClose} as={Link} to="/dashboard/settings" variant={isActive("/dashboard/settings") ? "selected_nav" : "nav"} leftIcon={<MdOutlineSettingsSuggest/>} >
            Indstillinger
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_staff"]}>
          <Button onClick={onClose} as={Link} to="/dashboard/profile" variant={isActive("/dashboard/profile") ? "selected_nav" : "nav"} leftIcon={<CgProfile/>}>
              Profil
          </Button>
        </RoleGuard>
      </VStack>
    
      <Button variant="nav" leftIcon={<SlLogout />} onClick={() => handleLogout(handleUserOnLogout, toast, navigate)}>
        Log ud
      </Button>
    </Flex>
  )
}

export default SidebarContent
