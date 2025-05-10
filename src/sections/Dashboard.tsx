import { Box, Flex, Hide, Show } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Bookings, Staff, Companies, CreateCompany, Services, Settings, Profile} from "../pages";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import { RoleGuard } from "../auth/RoleGuard";

const Dashboard = () => {
  return (
    <>
    <RoleGuard allowedRoles={["company_admin", "admin", "company_staff"]}>
    <Hide above="lg">
      <MobileSidebar/>
    </Hide>
    <Flex h="100vh" overflow="hidden">
      <Show above="lg" >
        <DesktopSidebar/>
      </Show>
      <Box flex="1"  overflowY="auto" p={4}>
        <Routes>
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/create-company" element={<CreateCompany />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Flex>
    </RoleGuard>
    </>
  )
}

export default Dashboard
