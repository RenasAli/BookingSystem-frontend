import CompaniesTable from "../components/CompaniesTable";
import useCompany from "../hooks/useCompany";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdOutlineAddHomeWork } from "react-icons/md";

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
      <Button data-cy="company-btn" variant="success" mr={3} as= {Link} to="create-company" leftIcon={<MdOutlineAddHomeWork/>}>
        Opret Virksomhed 
      </Button>
    </Box>
    <CompaniesTable data={companyQuery.data ?? []}/>
    </>
    
  )
}

export default Companies
