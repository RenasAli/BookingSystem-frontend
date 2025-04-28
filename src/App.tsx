import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex, Hide, Show } from "@chakra-ui/react";
import { DesktopSidebar, Container, MobileSidebar } from './sections'
import { Login, Bookings, Staff} from "./pages";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Flex>
      
      <Container>
        <Routes>
            <Show above="lg" >
              <DesktopSidebar/>
            </Show>
            <Hide above="lg">
              <MobileSidebar/>
            </Hide>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/bookings" element={<Bookings />} />
            <Route path="/dashboard/staff" element={<Staff />} />
        </Routes>
      </Container>
      
      
    </Flex>
    </QueryClientProvider>
  );
}

export default App;