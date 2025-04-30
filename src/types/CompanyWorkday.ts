export default interface CompanyWorkday {
    weekdayId: number;
    isOpen: boolean;
    openTime?: string | null;
    closeTime?: string | null;  
}