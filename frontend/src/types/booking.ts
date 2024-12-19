export interface Booking {
  id: string;
  userId: string;
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    address: string;
    lat: number;
    lng: number;
  };
  fare: number;
  duration: number;
  vehicleClass: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: number;
}
