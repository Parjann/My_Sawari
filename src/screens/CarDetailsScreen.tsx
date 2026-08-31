import BookingFooter from '@/components/BookingFooter';
import CarDetailsContent from '@/components/CarDetailsContent';
import CarDetailsHero from '@/components/CarDetailsHero';
import { SearchData } from '@/components/SearchCarsSheet';
import { cars, getCarById } from '@/data/cars';
import { useState } from 'react';
import { ScrollView, Share, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface BookingDraft {
  carId: string;
  location: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  drivingOption: 'Self Drive' | 'With Driver';
  days: number;
  pricing: {
    rental: number;
    additionalCharges: number;
    discount: number;
    paidToday: number;
    securityDeposit: number;
  };
}

interface CarDetailsScreenProps {
  carId: string;
  searchData?: SearchData;
  onBack: () => void;
  onConfirmBooking: (draft: BookingDraft) => void;
}

export default function CarDetailsScreen({
  carId,
  searchData,
  onBack,
  onConfirmBooking,
}: CarDetailsScreenProps) {
  // Find car by ID, or fallback by name or first car
  const car = getCarById(carId) || cars.find((c) => c.name === carId) || cars[0];

  const [drivingOption, setDrivingOption] = useState<'Self Drive' | 'With Driver'>('Self Drive');

  // Days calculation
  const days = 3;
  const location = searchData?.location || car.location || 'Bikaner';
  const pickupDate = '17 Aug';
  const returnDate = '20 Aug';
  const pickupTime = '10:00 AM';
  const returnTime = '10:00 AM';

  // Dynamic pricing calculation
  const driverChargePerDay = drivingOption === 'With Driver' ? 800 : 0;
  const baseRental = car.pricePerDay * days;
  const driverRental = driverChargePerDay * days;
  const totalRental = baseRental + driverRental;
  const additionalCharges = 500;
  const discount = 300;
  const securityDeposit = 2000;
  const paidToday = totalRental + additionalCharges - discount;

  const handleConfirm = () => {
    const draft: BookingDraft = {
      carId: car.id,
      location,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      drivingOption,
      days,
      pricing: {
        rental: totalRental,
        additionalCharges,
        discount,
        paidToday,
        securityDeposit,
      },
    };
    onConfirmBooking(draft);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `Rent ${car.name} on My Sawari`,
        message: `Check out the ${car.name} (${car.category} · ${car.transmission} · ${car.fuel} · ${car.seats} seats) available for rent in ${location} at ₹${car.pricePerDay.toLocaleString('en-IN')}/day on My Sawari!`,
      });
    } catch (error: any) {
      console.log('Error sharing car details:', error?.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CarDetailsHero
          image={car.image}
          onBack={onBack}
          onShare={handleShare}
        />

        <CarDetailsContent
          car={car}
          drivingOption={drivingOption}
          onDrivingOptionChange={setDrivingOption}
          location={location}
          pickupDate={pickupDate}
          returnDate={returnDate}
          days={days}
          rentalPrice={totalRental}
          additionalCharges={additionalCharges}
          discount={discount}
          securityDeposit={securityDeposit}
          totalPrice={paidToday}
        />
      </ScrollView>

      <BookingFooter
        price={`₹${paidToday.toLocaleString('en-IN')}`}
        onConfirm={handleConfirm}
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