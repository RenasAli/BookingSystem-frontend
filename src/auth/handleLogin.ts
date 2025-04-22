import ApiClient from "../service/apiClient";
import  { AxiosError } from "axios";
import LoginUser from "../types/LoginUser";

const handleLogin = async (
  user : LoginUser ,
  toast: (options: { title: string; description: string; status: "success" | "error" | "loading"; duration: number; isClosable: boolean }) => void
) => {
  const apiClient = new ApiClient<LoginUser>(`/login`);

  try {
    const response = apiClient.create(user, 'POST');
    if ((await response).status === 200){
      toast({
        title: "Logget ind",
        description: "Du har logget ind",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      return  (await response).data;
    }

  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.status === 401) {
      toast({
        title: "Login mislykkedes",
        description: "Ugyldig e-mail eller adgangskode",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    toast({
      title: "Login mislykkedes",
      description: "Noget gik galt",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
export default handleLogin