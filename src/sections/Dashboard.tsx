import { Box, Flex, Hide, Show } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Bookings, Staff, Companies, CreateCompany, Services, Settings} from "../pages";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

const Dashboard = () => {
  return (
    <>
    <Hide above="lg">
      <MobileSidebar/>
    </Hide>
    <Flex>
      <Show above="lg" >
        <DesktopSidebar/>
      </Show>
      <Box flex="1" p="4">
        <Routes>
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/create-company" element={<CreateCompany />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/companies/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Flex>
    </>
  )
}

export default Dashboard
