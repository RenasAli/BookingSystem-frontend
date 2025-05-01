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
    
  
  create = (data: T, method: Method = 'POST') => {
    let payload: T | FormData = data;
    let headers = {};
      
    // Auto-detect if File exists → use FormData
    if (data && typeof data === 'object' && Object.values(data).some((v) => v instanceof File)) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (value !== undefined && value !== null) {
            if (key === 'workday') {
              formData.append(key, JSON.stringify(value)); // 👈 manual serialization
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formData.append(key, value as any);
            }
          }
        }
        payload = formData;
        headers = { 'Content-Type': 'multipart/form-data' }; // axios handles this anyway, but safe
    }
      
    return axiosInstance({
      url: this.endpoint,
      method,
      data: payload,
      headers,
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  };
      
    

  delete = () => {
    axiosInstance
    .delete(this.endpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  }


}

export default ApiClient;