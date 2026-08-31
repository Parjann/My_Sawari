import { Booking } from '@/data/bookings';
import { Car, getCarById } from '@/data/cars';

export interface BookingWithCar extends Booking {
  car: Car;
}

export function getBookingWithCar(booking: Booking): BookingWithCar | null {
  const car = getCarById(booking.carId);
  if (!car) {
    return null;
  }
  return {
    ...booking,
    car,
  };
}

export function calculateDays(
  pickupDate: string,
  returnDate: string
): number {
  // Simple implementation - counts the difference
  // In a real app, you'd parse dates properly
  // For now, we'll extract the day numbers and subtract
  const pickupDay = parseInt(pickupDate.split(' ')[0], 10);
  const returnDay = parseInt(returnDate.split(' ')[0], 10);
  return returnDay - pickupDay;
}

export function calculateTotalPrice(
  pricePerDay: number,
  days: number
): number {
  return pricePerDay * days;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getNextUpcomingBooking(
  bookings: Booking[]
): BookingWithCar | null {
  const upcoming = bookings.filter((b) => b.status === 'upcoming');
  if (upcoming.length === 0) {
    return null;
  }
  return getBookingWithCar(upcoming[0]);
}
