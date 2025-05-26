import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Box, IconButton } from "@chakra-ui/react"
import Company from "../types/Copmpany"
import { FaExternalLinkAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";

interface companyProps {
    data: Company[],
}
const CompaniesTable = ({data}: companyProps) => {
    const companyQuery = data;

  return (
      <Box p={8} m={8}>
        <TableContainer>
          <Table variant='simple'>
            <Thead backgroundColor="#567c8d">
              <Tr >
                <Th color="white">Virksomhed</Th>
                <Th color="white">CVR</Th>
                <Th color="white">URL</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {companyQuery?.map((company: Company, index: number)=> { 
                return <Tr key= {index}>
                <Td>{company.name}</Td>
                <Td>{company.cvr}</Td>
                <Td >
                  <IconButton
                    variant='outline'
                    borderWidth={0}
                    aria-label='URL'
                    icon={<FaExternalLinkAlt/>}                 
                  />
                </Td>
                
                <Td>
                  <IconButton
                    variant='outline'
                    borderWidth={0}
                    aria-label='Edit'
                    data-cy="edit-company-btn"
                    as={Link}
                    to={`settings?companyId=${company.id}`}
                    icon={<GrEdit/>}                 
                  />
                </Td>
                
              </Tr>
  
              })}
              
            </Tbody>
            
          </Table>
        </TableContainer>
  
      </Box>
      
    )
}

export default CompaniesTable
