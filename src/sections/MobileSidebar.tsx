
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

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
          variant="ghost"
          fontSize="3 xl"
          size="md"
          m={4}
        />

        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent bg={bg}>
            <Box display="flex" justifyContent="flex-end" p={4}>
              <IconButton
                icon={<IoMdClose />}
                aria-label="Close menu"
                onClick={onClose}
                variant="ghost"
              />
            </Box>
            <SidebarContent onClose= {onClose}/>
          </DrawerContent>
        </Drawer>
      </RoleGuard>
    </>
  );
}


export default MobileSidebar
