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
      <Show above="lg" >
        <DesktopSidebar/>
      </Show>
      <Container>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/bookings" element={<Bookings />} />
            <Route path="/dashboard/staff" element={<Staff />} />
        </Routes>
      </Container>
      <Hide /*above="lg"*/>
        <MobileSidebar/>
      </Hide>
      
    </Flex>
    </QueryClientProvider>
  );
}

export default App;