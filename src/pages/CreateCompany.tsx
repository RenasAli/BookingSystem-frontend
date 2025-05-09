import { useQueryClient } from "@tanstack/react-query";
import { useCreateMutation } from "../hooks/useCreateMutation";
import  { CompanyRequest, Workday } from "../types/Copmpany";
import CreateCompanyForm from "../components/CreateCompanyForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const weekdayTemplate: Workday[] = [
    { weekdayId: 1, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 2, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 3, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 4, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 5, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 6, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
    { weekdayId: 7, isOpen: false, openTime: "00:00:00", closeTime: "00:00:00" },
]
const CreateCompany = () => {
    const [company, setCompany] = useState<CompanyRequest>({
        cvr: "",
        url: "",
        logo: undefined,
        confirmationMethod: "",
        companyEmail: "",
        adminEmail: "",
        adminName: "",
        adminPassword: "",
        companyName: "",
        companyPhone: "",
        street: "",
        city: "",
        zipCode: "",
        createdAt: "",
        workday: weekdayTemplate,
      });
    
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const createMutation = useCreateMutation<CompanyRequest>({
        endpoint: `company`,
        method: "POST",
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['company']
            });
            const role = Cookies.get("role");
            if(role === "admin"){
                navigate("/dashboard/companies")
            } else {
                navigate("/dashboard/bookings")
            }
        }
    });


   
    const updateCompanyField = (field: keyof CompanyRequest, value: unknown) => {
        setCompany((prev) => ({ ...prev, [field]: value } as CompanyRequest));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (company) {
            createMutation.mutate(company);
        }
    };
  
  return (
    <>
    <CreateCompanyForm 
        company={company}
        onChange={updateCompanyField}
        onSubmit={handleSubmit}
    />
    
    </>
  )
}

export default CreateCompany
