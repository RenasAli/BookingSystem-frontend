
import CompaniesTable from "../components/CompaniesTable";
import useCompany from "../hooks/useCompany";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";



const Companies = () => {

  const companyQuery = useCompany();

  if (companyQuery.isLoading) {
    return <div>Loading...</div>;
  }
    
  if (companyQuery.isError) {
    return <div>Error loading...</div>;
  }
  
  return (
    <>
    <Box p={8} ml={8}>
      <Button colorScheme="green" mr={3} as= {Link} to="create-company">
        Opret Ny Virksomhed 
      </Button>
    </Box>
    <CompaniesTable data={companyQuery.data ?? []}/>
    </>
    
  )
}

export default Companies
