import { Box, Container, Heading, HStack, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PublicCompany } from "../types/PublicCompany";

interface PublicBookingFooter {
    company: PublicCompany | undefined;
}

const PublicBookingFooter = ({company}: PublicBookingFooter) => {
  return (
    <Container maxW={750}  p={8} >
        <SimpleGrid columns={[1,2,2]} spacing='20px'>
            <Box borderWidth='1px' borderRadius="lg" p={5} height='250px' boxShadow="lg" minW="217px">
                <Heading size='xs'>Åbningstider:</Heading>
                {company?.workday.map((day) => (
                    <HStack mt={1} key={day.weekdayId}>
                        <Text>{["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day.weekdayId - 1]}</Text>
                        <Spacer />
                        <Text>{day.isOpen ? day.openTime?.split(":").slice(0, 2).join(":") + " - " + day.closeTime?.split(":").slice(0, 2).join(":") :"Lukket"}</Text>
                    </HStack>
                ))}
            </Box>
            <Box>
            <Box borderWidth='1px' borderRadius="lg" p={4} height='120px' boxShadow="lg">
                <Heading size='xs'>Kontakt os</Heading>
                <HStack mt={1}>
                    <FaPhone />
                    <Text > {company?.phone}</Text>
                </HStack>
                <HStack mt={1}>
                    <MdEmail />
                    <Text > {company?.email}</Text>
                </HStack>
            </Box>
            <Box borderWidth='1px' borderRadius="lg" p={4} mt="20px" height='110px' boxShadow="lg">
                <Heading size='xs'>Adresse:</Heading>
                <Text mt={1}>{company?.address.street}</Text>
                <Text>{company?.address.zipCode} {company?.address.city}</Text>
            </Box>
            </Box>
        </SimpleGrid>
    </Container>     
  )
}

export default PublicBookingFooter
