import { Box, Button, Flex, Heading, Hide, HStack, IconButton, Spacer, useToast, VStack } from "@chakra-ui/react";
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
import { TbBeach } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";



interface sidebarContentProps {
  onClose?: () => void;
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
          <HStack>
            <Heading size="lg" color="white" m={2} >Dashboard</Heading>
            <Hide above="lg">
              <Spacer/>
              <IconButton
                icon={<IoMdClose />}
                aria-label="Close menu"
                onClick={onClose}
                variant="primary"
                mr={2}
              />
            </Hide>
          </HStack>
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
          <Button data-cy="staff-button" onClick={onClose} as={Link} to="/dashboard/staff" variant={isActive("/dashboard/staff") ? "selected_nav" : "nav"} leftIcon={<IoIosPeople/>} >
            Medarbejder
          </Button>
          <Button data-cy="services-button" onClick={onClose} as={Link} to="/dashboard/services" variant={isActive("/dashboard/services") ? "selected_nav" : "nav"} leftIcon={<LuClipboardList/>}>
            Services
          </Button>
          <Button data-cy="off-day-button" onClick={onClose} as={Link} to="/dashboard/off-day" variant={isActive("/dashboard/off-day") ? "selected_nav" : "nav"} leftIcon={<TbBeach/>}>
            Ferie
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_admin"]}>
          <Button data-cy="settings-button" onClick={onClose} as={Link} to="/dashboard/settings" variant={isActive("/dashboard/settings") ? "selected_nav" : "nav"} leftIcon={<MdOutlineSettingsSuggest/>} >
            Indstillinger
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={["company_staff"]}>
          <Button data-cy="profile-button" onClick={onClose} as={Link} to="/dashboard/profile" variant={isActive("/dashboard/profile") ? "selected_nav" : "nav"} leftIcon={<CgProfile/>}>
              Profil
          </Button>
        </RoleGuard>
      </VStack>
      <Button data-cy="logout-button" variant="nav" leftIcon={<SlLogout />} onClick={() => handleLogout(handleUserOnLogout, toast, navigate)}>
        Log ud
      </Button>
    </Flex>
  )
}

export default SidebarContent
