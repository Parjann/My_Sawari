import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  destination: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  drivingOption: 'self-drive' | 'with-driver' | null;
  selectedCar: any | null;
}

const initialState: BookingState = {
  destination: '',
  pickupLocation: '',
  pickupDate: '',
  returnDate: '',
  pickupTime: '',
  returnTime: '',
  drivingOption: null,
  selectedCar: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBooking: (
      state,
      action: PayloadAction<Partial<BookingState>>
    ) => {
      Object.assign(state, action.payload);
    },

    setSelectedCar: (state, action: PayloadAction<any>) => {
      state.selectedCar = action.payload;
    },

    resetBooking: () => initialState,
  },
});

export const { updateBooking, setSelectedCar, resetBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;