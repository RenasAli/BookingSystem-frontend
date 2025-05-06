import { useQuery } from "@tanstack/react-query";
import ApiClient from "../service/apiClient";
import Company from "../types/Copmpany";
import { PublicCompany } from "../types/PublicCompany";

type CompanyResponse = Company[];
type SingleCompanyResponse = Company;
type PublicCompanyResponse = PublicCompany;


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
export const useCompanyByUrl = (url: string | null) => {
  const apiClient = new ApiClient<Company, PublicCompanyResponse>(`/company/url/${url}`);

    const companyQuery = useQuery<PublicCompanyResponse, Error>({
        queryKey: ['company', url],
        queryFn: () => {
          return  apiClient.get();
        },
      });

      return companyQuery
}

export default useCompany