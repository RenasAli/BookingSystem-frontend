import { Heading, HStack, Image } from "@chakra-ui/react";

interface PublicBookingHeaderProps {
    logo: string;
    name: string;
}

const PublicBookingHeader = ({logo, name}: PublicBookingHeaderProps) => {
  return (
    <HStack 
        p={1} 
        bg="white"
        w="100%"
        position="fixed"
        top={0}
        zIndex={10}
        boxShadow="md"
    >
        <Image
            borderRadius='full'
            boxSize='75px'
            src={logo}
            alt='Dan Abramov'
        />      
        <Heading size='lg'>{name}</Heading>
    </HStack>
  )
}

export default PublicBookingHeader
