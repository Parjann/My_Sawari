import { useBooking } from '@/store/BookingContext';
import { getBookingWithCar } from '@/utils/bookingUtils';
import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface NextTripCardProps {
  onPress?: () => void;
}

export default function NextTripCard({ onPress }: NextTripCardProps) {
  const { bookings } = useBooking();

  const nextTrip = bookings.find((b) => b.status === 'upcoming');
  const bookingWithCar = nextTrip ? getBookingWithCar(nextTrip) : null;

  if (!bookingWithCar) {
    return (
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.label}>Your next trip</Text>
          <Text style={styles.carName}>No upcoming bookings</Text>
          <Text style={styles.date}>Book a car to get started</Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={bookingWithCar.car.image}
        style={styles.carImage}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Your next trip</Text>

        <Text style={styles.carName}>{bookingWithCar.car.name}</Text>

        <Text style={styles.date}>
          {bookingWithCar.pickup.date} → {bookingWithCar.return.date}
        </Text>
      </View>

      <Feather name="arrow-right" size={24} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginHorizontal: 24,
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#101828',
    borderRadius: 16,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  carImage: {
    width: 80,
    height: 56,
    borderRadius: 12,
  },

  content: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
  },

  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#B8F23A',
  },

  carName: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#FFFFFF',
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    color: '#6F7280',
  },
});