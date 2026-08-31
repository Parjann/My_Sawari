import HomeScreen from '@/screens/HomeScreen';
import { BookingProvider } from '@/store/BookingContext';

export default function App() {
  return (
    <BookingProvider>
      <HomeScreen />
    </BookingProvider>
  );
}