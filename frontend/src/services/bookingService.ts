import { ref, push, get, DatabaseReference } from 'firebase/database';
import { database } from '@/lib/firebase';
import type { Booking } from '@/types/booking';
import type { Location } from '@/pages/MainScreen';

export const createBooking = async (
  userId: string,
  pickup: Location,
  dropoff: Location,
  fare: number,
  duration: number,
  vehicleClass: string
) => {
  const bookingRef = ref(database, `bookings/${userId}`);
  const newBooking: Omit<Booking, 'id'> = {
    userId,
    pickup: {
      address: pickup.address || '',
      lat: pickup.lat,
      lng: pickup.lng
    },
    dropoff: {
      address: dropoff.address || '',
      lat: dropoff.lat,
      lng: dropoff.lng
    },
    fare,
    duration,
    vehicleClass,
    status: 'pending',
    createdAt: Date.now()
  };

  const result = await push(bookingRef, newBooking);
  return result.key;
};

export const getUserBookings = async (userId: string) => {
  const bookingsRef = ref(database, `bookings/${userId}`);
  const snapshot = await get(bookingsRef);
  const bookings: Booking[] = [];

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      bookings.push({
        id: childSnapshot.key as string,
        ...childSnapshot.val()
      });
    });
  }

  return bookings.sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
};