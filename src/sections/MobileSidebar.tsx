
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



const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.800");
  return (
    <>
      <IconButton
        icon={<RxHamburgerMenu />}
        aria-label="Open menu"
        onClick={onOpen}
        variant="ghost"
        size="md"
        m={4}
      />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
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
    </>
  );
}


export default MobileSidebar
