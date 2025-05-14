import { Box } from "@chakra-ui/react"
import { SidebarContent } from "../components"
import { RoleGuard } from "../auth/RoleGuard"

const DesktopSidebar = () => {
  return (
    <RoleGuard allowedRoles={["company_admin", "admin", "company_staff"]}>
      <Box
          w="64"
          bg="black.100"
          minH="100vh"
          borderRight="1px solid"
          borderColor="gray.200"
      >
          <SidebarContent />
      </Box>
    </RoleGuard>
  )
}

export default DesktopSidebar
