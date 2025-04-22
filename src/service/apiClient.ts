import axios, { AxiosRequestConfig, Method } from "axios";
import BASE_URL from "../util/baseUrl";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

class ApiClient<T, R = T> {

  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (config?: AxiosRequestConfig) => 
    axiosInstance
      .get<R>(this.endpoint, config)

      .then((response) => response.data);
    
  
    create = (data: T,  method: Method = 'POST',) => 
      axiosInstance({
        url: this.endpoint,
        method, // use method dynamically (POST, PATCH, PUT, etc.)
        data,
      })
      .then((response) => {
          return response;
        })
        .catch((error) => {
            throw error;
        }
      );
    

    delete = () => {
      axiosInstance
      .delete(this.endpoint)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
          throw error;
      }
    );
    }


}

export default ApiClient;