import Address from "./Address";
import CompanyWorkday from "./CompanyWorkday";
import User from "./User";

export default interface Company {
  id: number ;
  name: string;
  cvr: string;
  phone: string;
  email: string;
  url: string;
  logo?: string;
  confirmationMethod: string;
  address: Address;
  user: User;
  createdAt: Date;
  workday: Array<CompanyWorkday>
}
  
export interface CompanyRequest {
  id?: number;
  cvr: string;
  url: string;
  logo?: File;
  confirmationMethod: string;
  companyEmail: string;
  adminEmail: string;
  adminName:string;
  adminPassword: string;
  companyName: string;
  companyPhone: string;
  street: string;
  city: string;
  zipCode: string;
  createdAt: string;
  workday: Workday[];
}
export interface Workday {
  id?: number;
  weekdayId: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  companyId?: number;

}

export interface UpdateCompanyAndAdmin {
    companyName: string;
    cvr: string;
    companyEmail: string;
    logo: string;
    url: string;
    confirmationMethod: string;
    companyPhone: string;
    adminEmail: string;
    password?: string;
    street: string;
    city: string;
    zipCode: string;
    workday: Array<CompanyWorkday>;
  }