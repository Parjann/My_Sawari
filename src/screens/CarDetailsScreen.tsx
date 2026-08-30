import BookingFooter from '@/components/BookingFooter';
import CarDetailsContent from '@/components/CarDetailsContent';
import CarDetailsHero from '@/components/CarDetailsHero';

import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CarDetailsScreenProps {
  carName: string;
  onBack: () => void;
  onConfirmBooking: () => void;
}

export default function CarDetailsScreen({
  carName,
  onBack,
  onConfirmBooking,
}: CarDetailsScreenProps) {
  const carImage =
    carName === 'Hyundai Creta'
      ? require('@/assets/images/cars/verna.png')
      : require('@/assets/images/cars/ford.png');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CarDetailsHero
          image={carImage}
          onBack={onBack}
          onShare={() => {
            console.log(`Share ${carName}`);
          }}
        />

        <CarDetailsContent
          carName={carName}
          rating="4.8"
          trips={214}
        />
      </ScrollView>

      <BookingFooter
        price="₹7,700"
        onConfirm={onConfirmBooking}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F1',
  },

  scrollView: {
    flex: 1,
  },
});