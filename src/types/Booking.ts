export type Status = 'pending' | 'confirmed' | 'cancelled';

export default interface Booking {
    id: number | null;
    companyId: number;
    staffId: number;
    serviceId?: number;
    customerName: string;
    customerPhone: string;
    status: Status;
    startTime: string;
    endTime: string;
    createdAt?: string; 
    staffName?: string;
}