export enum ServiceStatus {
  free = 1,
  booked = 2,
  'in use' = 3
}

export default interface Bike {
  id: string;
  serial_number: string
  coordinates: [number, number]
  in_order: boolean
  service_status: number
  battery_level: number
}

export interface BikeResponse {
  bikes: Bike[]
  total: number
}
