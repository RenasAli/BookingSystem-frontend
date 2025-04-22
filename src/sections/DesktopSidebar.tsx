import { Box } from "@chakra-ui/react"
import { SidebarContent } from "../components"

const DesktopSidebar = () => {
  return (
    <Box
        w="64"
        bg="black.100"
        minH="100vh"
        borderRight="1px solid"
        borderColor="gray.200"
    >
        <SidebarContent onClose={()=>{}} />
    </Box>
  )
}

export default DesktopSidebar
