import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/apiClient";
import Company from "../types/Copmpany";

export type CompanyResponse = Company[];
export type SingleCompanyResponse = Company;


const apiClient = new ApiClient<Company, CompanyResponse>(`/company`);

const useCompany = () => {
    const companyQuery = useQuery<CompanyResponse, Error>({
        queryKey: ['company'],
        queryFn: () => {
          return  apiClient.get() || []
        }
      });

      return companyQuery
}
export const useCompanyById = (companyId: string | null) => {
  const apiClient = new ApiClient<Company, SingleCompanyResponse>(`/company/${companyId}`);

    const companyQuery = useQuery<SingleCompanyResponse, Error>({
        queryKey: ['company', companyId],
        queryFn: () => {
          return  apiClient.get();
        },
      });

      return companyQuery
}

export default useCompany