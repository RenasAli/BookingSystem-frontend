import { Box, Flex, Hide, HStack, Show } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Bookings, Staff, Companies, CreateCompany, Services, Settings, Profile, OffDay} from "../pages";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import { RoleGuard, RoleProtectedRoute } from "../auth/RoleGuard";

const Dashboard = () => {
  return (
    <>
    <RoleGuard allowedRoles={["company_admin", "admin", "company_staff"]}>
    <Hide above="lg">
      <HStack 
        bg="#579AFF"
        w="100%"
        h= "50px"
        boxShadow="md"
      >
        <MobileSidebar/>
      </HStack>
    </Hide>
    <Flex h="100vh" overflow="hidden">
      <Show above="lg" >
        <DesktopSidebar/>
      </Show>
      <Box flex="1"  overflowY="auto" p={4}>
        <Routes>
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/companies" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Companies />
            </RoleProtectedRoute>
          }/>
          <Route path="/companies/create-company" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <CreateCompany />
            </RoleProtectedRoute>
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/off-day" element={<OffDay />} />
          <Route path="/settings" element={
            <RoleProtectedRoute allowedRoles={["company_admin"]}>
              <Settings />
            </RoleProtectedRoute>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies/settings" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Settings />
            </RoleProtectedRoute>
          }/>
        </Routes>
      </Box>
    </Flex>
    </RoleGuard>
    </>
  )
}

export default Dashboard
