export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface Pickup {
  location: string;
  date: string;
  time: string;
}

export interface Return {
  location: string;
  date: string;
  time: string;
}

export interface CustomerDetails {
  fullName: string;
  mobile: string;
  email: string;
  drivingLicence: string;
}

export interface Pricing {
  rental: number;
  additionalCharges: number;
  discount: number;
  paidToday: number;
  securityDeposit: number;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  carId: string;
  pickup: Pickup;
  return: Return;
  drivingOption: 'Self Drive' | 'With Driver';
  customer: CustomerDetails;
  pricing: Pricing;
  createdAt: string;
}

export const initialBookings: Booking[] = [
  {
    id: 'MS-20260817-001',
    status: 'upcoming',
    carId: 'kia-seltos',
    pickup: {
      location: 'Bikaner',
      date: '17 Aug',
      time: '10:00 AM',
    },
    return: {
      location: 'Bikaner',
      date: '20 Aug',
      time: '10:00 AM',
    },
    drivingOption: 'Self Drive',
    customer: {
      fullName: 'Jatin Prajapat',
      mobile: '1234565433',
      email: 'jatinprajapat682@gmail.com',
      drivingLicence: '23456543456y65434',
    },
    pricing: {
      rental: 7500,
      additionalCharges: 500,
      discount: 300,
      paidToday: 7700,
      securityDeposit: 2000,
    },
    createdAt: '2026-08-15',
  },

  {
    id: 'MS-20260810-002',
    status: 'active',
    carId: 'hyundai-creta',
    pickup: {
      location: 'Jaipur',
      date: '15 Aug',
      time: '09:00 AM',
    },
    return: {
      location: 'Jaipur',
      date: '18 Aug',
      time: '06:00 PM',
    },
    drivingOption: 'With Driver',
    customer: {
      fullName: 'Jatin Prajapat',
      mobile: '1234565433',
      email: 'jatinprajapat682@gmail.com',
      drivingLicence: '23456543456y65434',
    },
    pricing: {
      rental: 8000,
      additionalCharges: 800,
      discount: 500,
      paidToday: 8300,
      securityDeposit: 2500,
    },
    createdAt: '2026-08-12',
  },

  {
    id: 'MS-20260801-003',
    status: 'completed',
    carId: 'maruti-ignis',
    pickup: {
      location: 'Mumbai',
      date: '01 Aug',
      time: '10:00 AM',
    },
    return: {
      location: 'Mumbai',
      date: '05 Aug',
      time: '10:00 AM',
    },
    drivingOption: 'Self Drive',
    customer: {
      fullName: 'Jatin Prajapat',
      mobile: '1234565433',
      email: 'jatinprajapat682@gmail.com',
      drivingLicence: '23456543456y65434',
    },
    pricing: {
      rental: 7200,
      additionalCharges: 300,
      discount: 200,
      paidToday: 7300,
      securityDeposit: 1800,
    },
    createdAt: '2026-07-30',
  },
];

export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return initialBookings.filter((booking) => booking.status === status);
}

export function getNextBooking(): Booking | undefined {
  const upcoming = getBookingsByStatus('upcoming');
  return upcoming[0];
}

export function getBookingById(id: string): Booking | undefined {
  return initialBookings.find((booking) => booking.id === id);
}
