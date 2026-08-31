import { Booking, BookingStatus, initialBookings } from '@/data/bookings';
import {
    createContext,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

interface BookingContextType {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus
  ) => void;
  getBookingById: (id: string) => Booking | undefined;
  getBookingsByStatus: (status: BookingStatus) => Booking[];
}

type BookingAction =
  | { type: 'CREATE_BOOKING'; payload: Booking }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: BookingStatus } };

function bookingReducer(
  state: Booking[],
  action: BookingAction
): Booking[] {
  switch (action.type) {
    case 'CREATE_BOOKING':
      return [...state, action.payload];

    case 'UPDATE_STATUS':
      return state.map((booking) =>
        booking.id === action.payload.id
          ? { ...booking, status: action.payload.status }
          : booking
      );

    default:
      return state;
  }
}

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, dispatch] = useReducer(
    bookingReducer,
    initialBookings
  );

  const createBooking = (
    booking: Omit<Booking, 'id' | 'createdAt'>
  ): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: `MS-${new Date().getTime()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    dispatch({
      type: 'CREATE_BOOKING',
      payload: newBooking,
    });

    return newBooking;
  };

  const updateBookingStatus = (
    bookingId: string,
    status: BookingStatus
  ) => {
    dispatch({
      type: 'UPDATE_STATUS',
      payload: { id: bookingId, status },
    });
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find((booking) => booking.id === id);
  };

  const getBookingsByStatus = (status: BookingStatus): Booking[] => {
    return bookings.filter((booking) => booking.status === status);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        updateBookingStatus,
        getBookingById,
        getBookingsByStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
