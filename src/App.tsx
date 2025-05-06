import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard} from './sections'
import { Login, PublicBooking} from "./pages";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      
      <Routes>

        <Route path="/public/booking/:companyUrl" element={<PublicBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard/>} />
      </Routes>
    </QueryClientProvider>
  );
  
}

export default App;