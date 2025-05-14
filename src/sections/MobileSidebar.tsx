
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarContent } from "../components"
import { RoleGuard } from "../auth/RoleGuard";



const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.800");
  return (
    <>
      <RoleGuard allowedRoles={["company_admin", "admin", "company_staff"]}>
        <IconButton
          icon={<RxHamburgerMenu />}
          aria-label="Open menu"
          onClick={onOpen}
          variant="primary"
          fontSize="3 xl"
          size="md"
          m={2}
        />

        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent bg={bg}>
            <SidebarContent onClose= {onClose}/>
          </DrawerContent>
        </Drawer>
      </RoleGuard>
    </>
  );
}


export default MobileSidebar
