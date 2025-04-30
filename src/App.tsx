import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex, Hide, Show } from "@chakra-ui/react";
import { DesktopSidebar, Container, MobileSidebar } from './sections'
import { Login, Bookings, Staff, Companies, CreateCompany, Services, Settings} from "./pages";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
            <Hide above="lg">
        <MobileSidebar/>
      </Hide>
    <Flex>
      <Show above="lg" >
        <DesktopSidebar/>
      </Show>
      <Container>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/bookings" element={<Bookings />} />
            <Route path="/dashboard/staff" element={<Staff />} />
            <Route path="/dashboard/companies" element={<Companies />} />
            <Route path="/dashboard/companies/create-company" element={<CreateCompany />} />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/companies/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Flex>
    </QueryClientProvider>
  );
}

export default App;