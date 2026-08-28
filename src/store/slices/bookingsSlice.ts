import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking {
  id: string;
  car: any;
  status: 'upcoming' | 'active' | 'completed';
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalPrice: number;
}

interface BookingsState {
  items: Booking[];
}

const initialState: BookingsState = {
  items: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { addBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;