import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
    children: ReactNode;
  }
const Container = ({ children }: Props) => {
  return (
    <Box flex="1" p="4">
      {children}
    </Box>
  )
}

export default Container
