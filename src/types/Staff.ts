export default interface Staff {
    id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    password?: string,
    staffWorkdays: Array<staffWorkdays>
}

export interface staffWorkdays {
    weekdayId: number,
    isActive: boolean,
    startTime: string | null,
    endTime: string | null,
  }