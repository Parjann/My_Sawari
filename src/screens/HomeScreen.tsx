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
import CarDetailsScreen from '@/screens/CarDetailsScreen';

import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  // Controls the Search Cars bottom sheet
  const [isSearchSheetVisible, setIsSearchSheetVisible] =
    useState(false);

  // Controls whether the user has searched for cars
  const [hasSearched, setHasSearched] = useState(false);

  // Stores which car the user selected for viewing details
  const [selectedCar, setSelectedCar] =
    useState<string | null>(null);

  // Stores the user's search information
  const [searchData, setSearchData] = useState<SearchData>({
    location: 'Guwahati',
    dates: '17 Aug – 20 Aug',
    times: '10:00 AM – 10:00 AM',
    drivingOption: 'Self Drive',
  });

  // ==========================================
  // CAR DETAILS SCREEN
  // ==========================================

  if (selectedCar) {
    return (
      <CarDetailsScreen
        carName={selectedCar}
        onBack={() => setSelectedCar(null)}
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

        {/* Reuse the existing search sheet for editing */}
        <SearchCarsSheet
          visible={isSearchSheetVisible}
          onClose={() => setIsSearchSheetVisible(false)}
          onSearch={(data) => {
            setSearchData(data);
            setHasSearched(true);
          }}
        />

        <BottomNav />
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

      {/* Search Cars bottom sheet */}
      <SearchCarsSheet
        visible={isSearchSheetVisible}
        onClose={() => setIsSearchSheetVisible(false)}
        onSearch={(data) => {
          setSearchData(data);
          setHasSearched(true);
        }}
      />

      <BottomNav />
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