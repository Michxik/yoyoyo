export interface Reservation {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleId: string
  date: string
  pickupTime: {
    hour: string
    minute: string
  }
  pickupLocation: string
  additionalInfo?: string
  createdAt: string
  status: "pending" | "confirmed" | "cancelled"
}
