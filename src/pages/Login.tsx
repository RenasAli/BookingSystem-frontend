import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import LoginUser from "../types/LoginUser";
import Cookies from "js-cookie";
import handleLogin from "../auth/handleLogin";


const Logind = ()=> {
  const toast = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLoginBtn = async ()=> {
    const loginUser: LoginUser = { email, password };
    toast({
      title: "Pending...",
      description: "Please wait",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    handleLogin(loginUser, toast).then((user)=> Cookies.set("role", user.user.role))
  }

  return (
    <Flex direction="column" p={4} maxW="md" mx="auto" mt={20}>
      <Heading mb={6}>Login</Heading>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input 
        type="email" 
        placeholder="staff@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>
      <FormControl mb={6}>
        <FormLabel>Password</FormLabel>
        <Input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLoginBtn}>Login</Button>
    </Flex>
  );
};


export default Logind;