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
import { Booking } from '@/data/bookings';
import { CategoryType } from '@/data/cars';
import AvailableCarsScreen from '@/screens/AvailableCarsScreen';
import BookingDetailsScreen from '@/screens/BookingDetailsScreen';
import BookingSuccessScreen from '@/screens/BookingSuccessScreen';
import BookingsScreen from '@/screens/BookingsScreen';
import CarDetailsScreen, { BookingDraft } from '@/screens/CarDetailsScreen';
import ExploreScreen from '@/screens/ExploreScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ReviewBookingScreen, {
    FinalizedBookingData,
} from '@/screens/ReviewBookingScreen';
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
  const [isSearchSheetVisible, setIsSearchSheetVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // ==========================================
  // BOOKING FLOW STATES
  // ==========================================
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);
  const [finalBookingData, setFinalBookingData] =
    useState<FinalizedBookingData | null>(null);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const [isReviewBookingVisible, setIsReviewBookingVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [isBookingSuccessVisible, setIsBookingSuccessVisible] =
    useState(false);
  const [isBookingDetailsVisible, setIsBookingDetailsVisible] =
    useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  // ==========================================
  // SEARCH DATA
  // ==========================================
  const [searchData, setSearchData] = useState<SearchData>({
    location: 'Bikaner',
    dates: '17 Aug – 20 Aug',
    times: '10:00 AM – 10:00 AM',
    drivingOption: 'Self Drive',
  });

  // ==========================================
  // POPULAR CARS STATE
  // ==========================================
  const [selectedPopularCategory, setSelectedPopularCategory] =
    useState<CategoryType>('All');

  // ==========================================
  // COMMON TAB NAVIGATION
  // ==========================================
  const handleTabChange = (tab: Tab) => {
    setHasSearched(false);
    setIsSearchSheetVisible(false);
    setActiveTab(tab);
  };

  // ==========================================
  // 1. BOOKING SUCCESS SCREEN
  // ==========================================
  if (isBookingSuccessVisible && createdBooking) {
    return (
      <BookingSuccessScreen
        booking={createdBooking}
        onBackToHome={() => {
          setIsBookingSuccessVisible(false);
          setCreatedBooking(null);
          setBookingDraft(null);
          setFinalBookingData(null);
          setSelectedCarId(null);
          setHasSearched(false);
          setActiveTab('home');
        }}
        onViewBookings={() => {
          setIsBookingSuccessVisible(false);
          setCreatedBooking(null);
          setBookingDraft(null);
          setFinalBookingData(null);
          setSelectedCarId(null);
          setHasSearched(false);
          setActiveTab('bookings');
        }}
      />
    );
  }

  // ==========================================
  // 2. PAYMENT SCREEN
  // ==========================================
  if (isPaymentVisible && finalBookingData) {
    return (
      <PaymentScreen
        bookingData={finalBookingData}
        onBack={() => {
          setIsPaymentVisible(false);
          setIsReviewBookingVisible(true);
        }}
        onPaymentSuccess={(newBooking) => {
          setCreatedBooking(newBooking);
          setIsPaymentVisible(false);
          setIsBookingSuccessVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // 3. REVIEW BOOKING SCREEN
  // ==========================================
  if (isReviewBookingVisible && bookingDraft) {
    return (
      <ReviewBookingScreen
        bookingDraft={bookingDraft}
        onBack={() => {
          setIsReviewBookingVisible(false);
          setSelectedCarId(bookingDraft.carId);
        }}
        onContinue={(finalData) => {
          setFinalBookingData(finalData);
          setIsReviewBookingVisible(false);
          setIsPaymentVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // 4. CAR DETAILS SCREEN
  // ==========================================
  if (selectedCarId) {
    return (
      <CarDetailsScreen
        carId={selectedCarId}
        searchData={searchData}
        onBack={() => setSelectedCarId(null)}
        onConfirmBooking={(draft) => {
          setBookingDraft(draft);
          setSelectedCarId(null);
          setIsReviewBookingVisible(true);
        }}
      />
    );
  }

  // ==========================================
  // 5. BOOKING DETAILS SCREEN
  // ==========================================
  if (isBookingDetailsVisible) {
    return (
      <BookingDetailsScreen
        bookingId={selectedBookingId || undefined}
        onBack={() => {
          setIsBookingDetailsVisible(false);
          setSelectedBookingId(null);
        }}
      />
    );
  }

  // ==========================================
  // 6. AVAILABLE CARS SCREEN (SEARCH RESULTS)
  // ==========================================
  if (hasSearched) {
    return (
      <View style={styles.resultsContainer}>
        <AvailableCarsScreen
          searchData={searchData}
          onEdit={() => setIsSearchSheetVisible(true)}
          onViewCarDetails={(carId: string) => setSelectedCarId(carId)}
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
  // 7. BOOKINGS TAB
  // ==========================================
  if (activeTab === 'bookings') {
    return (
      <View style={styles.tabContainer}>
        <BookingsScreen
          onViewBookingDetails={(bookingId) => {
            setSelectedBookingId(bookingId || null);
            setIsBookingDetailsVisible(true);
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
  // 8. EXPLORE TAB
  // ==========================================
  if (activeTab === 'explore') {
    return (
      <View style={styles.tabContainer}>
        <ExploreScreen
          onSelectCar={(carId) => setSelectedCarId(carId)}
        />

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
    );
  }

  // ==========================================
  // 9. HOME TAB
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

        <NextTripCard
          onPress={() => {
            setSelectedBookingId(null); // will open upcoming trip
            setIsBookingDetailsVisible(true);
          }}
        />

        <View style={styles.popularHeaderSection}>
          <PopularCarsHeader />
        </View>

        <View style={styles.categoriesSection}>
          <CarCategories
            selectedCategory={selectedPopularCategory}
            onCategoryChange={setSelectedPopularCategory}
          />
        </View>

        <View style={styles.carsSection}>
          <PopularCars
            selectedCategory={selectedPopularCategory}
            onSelectCar={(carId) => setSelectedCarId(carId)}
          />
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