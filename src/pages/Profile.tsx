import { Box, Text, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";
import { useStaffById } from "../hooks/useStaff"

const Profile = () => {
    const staffQuery = useStaffById();
    if (staffQuery.isLoading) {
        return <div>Loading...</div>;
      }
        
      if (staffQuery.isError) {
        return <div>Error loading...</div>;
      }
  return (
    <>
        {staffQuery?.data ? <ProfileForm staff={staffQuery?.data }/> : ""}
        <Box mx="auto" px={4} py={8}><Box
            mb={5}
            p={4}
            borderWidth="1px"
            borderRadius="md"
        >
            <Heading fontSize="lg" mb={4}>Arbejdstider</Heading>
            <SimpleGrid columns={[1,2 , 3]} spacing={8} >
            {staffQuery?.data?.staffWorkdays.map((day) => (
                <Box
                key={day.weekdayId}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                >
                    
                    <VStack spacing={4} >
                        
                        <Heading size="sm" >{["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day.weekdayId - 1]}</Heading>
                        {day.isActive ? 
                        <VStack>
                        <Text fontSize="sm">Møder kl: {day.startTime}</Text>
                        <Text fontSize="sm">Har fri kl: {day.endTime}</Text>
                        </VStack>
                        :<Text color="#f03141" >Har fri hele dagen</Text>
                        }
                    </VStack>
                </Box>
            ))}
            </SimpleGrid>
        </Box></Box>
    </>
  )
}

export default Profile
