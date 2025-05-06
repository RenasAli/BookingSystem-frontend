import Address from "./Address";
import CompanyWorkday from "./CompanyWorkday";

export interface PublicCompany {
    id: number;
    name: string;
    cvr: string;
    phone: string;
    email: string;
    logo?: string;
    address: Address;
    workday: Array<CompanyWorkday>
    services: Array<PublicService>
}

interface PublicService {
    id: number;
    name: string;
    durationMinutes: number;
}