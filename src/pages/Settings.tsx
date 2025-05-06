import { useEffect, useState } from "react";
import CompanyForm from "../components/CompanyForm"
import { useCreateMutation } from "../hooks/useCreateMutation";
import Company, { CompanyRequest } from "../types/Copmpany";
import { useQueryClient } from "@tanstack/react-query";
import { useCompanyById } from "../hooks/useCompany";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import Cookies from "js-cookie";

const Settings = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const queryClient = useQueryClient();

  
  const companyQuery = useCompanyById(companyId);
  const [company, setCompany] = useState<Company>();

  
  const updateMutation = useCreateMutation<Company>({ endpoint: `company/${company?.id}`, method: "PUT", onSuccess: async() => {
    await queryClient.invalidateQueries({queryKey: ['company', company?.id]});
    await queryClient.refetchQueries({ queryKey: ["company",] });
    setCompany(undefined);
    const role = Cookies.get("role");
    if(role === "admin"){
      navigate("/dashboard/companies")
    } else {
      navigate("/dashboard/bookings")
    }
  }});
  const updateLogoMutation = useCreateMutation<object>({ endpoint: `company/logo/${company?.id}`, method: "PUT", onSuccess: async() => {
    await queryClient.invalidateQueries({queryKey: ['company', company?.id]});
    await queryClient.refetchQueries({ queryKey: ["company",] });
    //setCompany((prev) => ({ ...prev, logo: "" } as CompanyRequest));
  }});

  const deleteMutation = useDeleteMutation({ 
        endpoint: `company/${company?.id}`, 
        onSuccess: async() => {
          await queryClient.invalidateQueries({queryKey: ['company']});
          await queryClient.refetchQueries({ queryKey: ["company"] });
          navigate("/dashboard/companies");
        }, 
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();      
    if (company) {
      updateMutation.mutate(company);
    }
  };

 const updateCompanyField = (field: keyof CompanyRequest, value: unknown) => {

    setCompany((prev) => {
      if (!prev) return prev;
  
      const updatedCompany = { ...prev };
  
      switch (field) {
        case "companyName":
          updatedCompany.name = value as string;
          break;
        case "companyEmail":
          updatedCompany.email = value as string;
          break;
        case "companyPhone":
          updatedCompany.phone = value as string;
          break;
        case "logo":
          updateLogoMutation.mutate({logo: value as File});
          break;
        case "url":
          updatedCompany.url = value as string;
          break;
        case "cvr":
          updatedCompany.cvr = value as string;
          break;
        case "confirmationMethod":
          updatedCompany.confirmationMethod = value as string;
          break;
        case "adminEmail":
          updatedCompany.user = {
            ...prev.user,
            email: value as string,
          };
          break;
        case "street":
          updatedCompany.address = {
            ...prev.address,
            street: value as string,
          };
          break;
        case "city":
          updatedCompany.address = {
            ...prev.address,
            city: value as string,
          };
          break;
        case "zipCode":
          updatedCompany.address = {
            ...prev.address,
            zipCode: value as string,
          };
          break;
        case "workday":
          updatedCompany.workday = value as Company["workday"];
          break;
        default:
          console.warn(`Unhandled field in updateCompanyField: ${field}`);
      }
  
      return updatedCompany;
    });
  };
  
  
  
  useEffect(()=> {
    if(companyQuery.data){
      setCompany(companyQuery.data);
    }
  },[companyQuery.data]);

  if (companyQuery.isLoading) {
    return <div>Loading...</div>;
  }
    
  if (companyQuery.isError) {
    return <div>Error loading...</div>;
  }

 
  return (
    <CompanyForm 
      company={company}
      onChange={updateCompanyField}
      onSubmit={handleSubmit}
      deleteMutation={deleteMutation.mutate}
      deleteIsPending={deleteMutation.isPending}
    />
  )
}

export default Settings
