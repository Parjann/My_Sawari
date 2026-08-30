import BottomNav from '@/components/BottomNav';

import CarCategories from '@/components/CarCategories';
import HomeGreeting from '@/components/HomeGreeting';
import HomeHeader from '@/components/HomeHeader';
import NextTripCard from '@/components/NextTripCard';
import PopularCars from '@/components/PopularCars';
import PopularCarsHeader from '@/components/PopularCarsHeader';
import SearchCarCard from '@/components/SearchCarCard';
import SearchCarsSheet, {
    SearchData,
} from '@/components/SearchCarsSheet';

import AvailableCarsScreen from '@/screens/AvailableCarsScreen';
import BookingDetailsScreen from '@/screens/BookingDetailsScreen';
import BookingSuccessScreen from '@/screens/BookingSuccessScreen';
import BookingsScreen from '@/screens/BookingsScreen';
import CarDetailsScreen from '@/screens/CarDetailsScreen';
// import ExploreScreen from '@/screens/ExploreScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ReviewBookingScreen from '@/screens/ReviewBookingScreen';

import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type Tab = 'home' | 'explore' | 'bookings';

export default function HomeScreen() {
  // ==========================================
  // MAIN TAB STATE
  // ==========================================

  const [activeTab, setActiveTab] = useState<Tab>('home');

  // ==========================================
  // SEARCH STATES
  // ==========================================

  const [isSearchSheetVisible, setIsSearchSheetVisible] =
    useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  // ==========================================
  // BOOKING FLOW STATES
  // ==========================================

  const [isReviewBookingVisible, setIsReviewBookingVisible] =
    useState(false);

  const [isPaymentVisible, setIsPaymentVisible] =
    useState(false);

  const [isBookingSuccessVisible, setIsBookingSuccessVisible] =
    useState(false);

  const [isBookingDetailsVisible, setIsBookingDetailsVisible] =
    useState(false);

  // Stores the car being booked
  const [selectedCarForBooking, setSelectedCarForBooking] =
    useState<string | null>(null);

  // Stores the car selected for viewing details
  const [selectedCar, setSelectedCar] =
    useState<string | null>(null);

  // ==========================================
  // SEARCH DATA
  // ==========================================

  const [searchData, setSearchData] = useState<SearchData>({
    location: 'Guwahati',
    dates: '17 Aug – 20 Aug',
    times: '10:00 AM – 10:00 AM',
    drivingOption: 'Self Drive',
  });

  // ==========================================
  // COMMON TAB NAVIGATION
  // ==========================================

  const handleTabChange = (tab: Tab) => {
    // Close search results when switching tabs
    setHasSearched(false);
    setIsSearchSheetVisible(false);

    setActiveTab(tab);
  };

  // ==========================================
  // BOOKING SUCCESS SCREEN
  // ==========================================

  if (isBookingSuccessVisible && selectedCarForBooking) {
    return (
      <BookingSuccessScreen
        carName={selectedCarForBooking}
        onBackToHome={() => {
          // Reset booking flow
          setIsBookingSuccessVisible(false);
          setIsPaymentVisible(false);
          setIsReviewBookingVisible(false);
          setSelectedCarForBooking(null);
          setSelectedCar(null);
          setHasSearched(false);

          // Go to Home
          setActiveTab('home');
        }}
        onViewBookings={() => {
          // Close booking success screen
          setIsBookingSuccessVisible(false);
          setIsPaymentVisible(false);
          setIsReviewBookingVisible(false);
          setSelectedCar(null);
          setHasSearched(false);

          // Navigate to Bookings screen
          setActiveTab('bookings');
        }}
      />
    );
  }

  // ==========================================
  // PAYMENT SCREEN
  // ==========================================

  if (isPaymentVisible && selectedCarForBooking) {
    return (
      <PaymentScreen
        carName={selectedCarForBooking}
        onBack={() => {
          setIsPaymentVisible(false);
          setIsReviewBookingVisible(true);
        }}
        onPaymentSuccess={() => {
          console.log('Payment successful');

          setIsPaymentVisible(false);
          setIsBookingSuccessVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // REVIEW BOOKING SCREEN
  // ==========================================

  if (isReviewBookingVisible && selectedCarForBooking) {
    return (
      <ReviewBookingScreen
        carName={selectedCarForBooking}
        onBack={() => {
          setIsReviewBookingVisible(false);
          setSelectedCarForBooking(null);
        }}
        onContinue={() => {
          setIsReviewBookingVisible(false);
          setIsPaymentVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // CAR DETAILS SCREEN
  // ==========================================

  if (selectedCar) {
    return (
      <CarDetailsScreen
        carName={selectedCar}
        onBack={() => setSelectedCar(null)}
        onConfirmBooking={() => {
          setSelectedCarForBooking(selectedCar);
          setSelectedCar(null);
          setIsReviewBookingVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // BOOKING DETAILS SCREEN
  // ==========================================

  if (isBookingDetailsVisible) {
    return (
      <BookingDetailsScreen
        onBack={() => setIsBookingDetailsVisible(false)}
      />
    );
  }

  // ==========================================
  // AVAILABLE CARS SCREEN
  // ==========================================

  if (hasSearched) {
    return (
      <View style={styles.resultsContainer}>
        <AvailableCarsScreen
          searchData={searchData}
          onEdit={() => setIsSearchSheetVisible(true)}
          onViewCarDetails={(carName: string) =>
            setSelectedCar(carName)
          }
        />

        <SearchCarsSheet
          visible={isSearchSheetVisible}
          onClose={() => setIsSearchSheetVisible(false)}
          onSearch={(data) => {
            setSearchData(data);
            setHasSearched(true);
            setIsSearchSheetVisible(false);
          }}
        />

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
    );
  }

  // ==========================================
  // BOOKINGS TAB
  // ==========================================

  if (activeTab === 'bookings') {
    return (
      <View style={styles.tabContainer}>
        <BookingsScreen
          onViewBookingDetails={() =>
            setIsBookingDetailsVisible(true)
          }
        />

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
    );
  }

  // ==========================================
  // EXPLORE TAB
  // ==========================================

  if (activeTab === 'explore') {
    return (
      <View style={styles.tabContainer}>
        {/* <ExploreScreen /> */}

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
    );
  }

  // ==========================================
  // HOME SCREEN
  // ==========================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HomeHeader />

        <HomeGreeting />

        <SearchCarCard
          location={searchData.location}
          dates={searchData.dates}
          time={searchData.times}
          drivingOption={searchData.drivingOption}
          onPress={() => setIsSearchSheetVisible(true)}
        />

        <NextTripCard />

        <View style={styles.popularHeaderSection}>
          <PopularCarsHeader />
        </View>

        <View style={styles.categoriesSection}>
          <CarCategories />
        </View>

        <View style={styles.carsSection}>
          <PopularCars />
        </View>
      </ScrollView>

      <SearchCarsSheet
        visible={isSearchSheetVisible}
        onClose={() => setIsSearchSheetVisible(false)}
        onSearch={(data) => {
          setSearchData(data);
          setHasSearched(true);
          setIsSearchSheetVisible(false);
        }}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7E8',
  },

  resultsContainer: {
    flex: 1,
    backgroundColor: '#F6F5F1',
  },

  tabContainer: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  content: {
    paddingBottom: 24,
  },

  popularHeaderSection: {
    marginTop: 16,
  },

  categoriesSection: {
    marginTop: 12,
  },

  carsSection: {
    marginTop: 16,
  },
});