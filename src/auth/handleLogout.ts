import { UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import ApiClient from "../service/apiClient";

export const handleLogout = async (
  handleUserOnLogout: () => void,
  toast: (options: UseToastOptions) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    const apiClient = new ApiClient(`/logout`);
    handleUserOnLogout();
    const response = apiClient.create(null,'POST');
    if ((await response).status === 200 || (await response).status === 201) {
      toast({
        title: "Logget ud",
        description: "Du har logget ud",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/login");
    } else {
      toast({
        title: "Log ud mislykkedes",
        description: "Noget gik galt",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    toast({
      title: "Log ud mislykkedes",
      description: "Noget gik galt",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
