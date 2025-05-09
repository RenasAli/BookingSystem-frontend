export default interface Staff {
    id: number | null,
    name: string | null,
    email: string | null,
    phone: string | null,
    staffWorkdays: Array<staffWorkdays>
}

interface staffWorkdays {
    weekdayId: number,
    isActive: boolean,
    startTime: string | null,
    endTime: string | null,
  }