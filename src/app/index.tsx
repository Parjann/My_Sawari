import BottomNav from '@/components/BottomNav';
import CarCategories from '@/components/CarCategories';
import HomeGreeting from '@/components/HomeGreeting';
import HomeHeader from '@/components/HomeHeader';
import NextTripCard from '@/components/NextTripCard';
import PopularCars from '@/components/PopularCars';
import PopularCarsHeader from '@/components/PopularCarsHeader';
import SearchCarCard from '@/components/SearchCarCard';
import SearchCarsSheet from '@/components/SearchCarsSheet';

import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const [isSearchSheetVisible, setIsSearchSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HomeHeader />

        <HomeGreeting />

        <SearchCarCard onPress={() => setIsSearchSheetVisible(true)} />

        <NextTripCard />

        {/* Popular Near You */}
        <View style={styles.popularHeaderSection}>
          <PopularCarsHeader />
        </View>

        {/* Car Categories */}
        <View style={styles.categoriesSection}>
          <CarCategories />
        </View>

        {/* Popular Cars */}
        <View style={styles.carsSection}>
          <PopularCars />
        </View>
      </ScrollView>

      <SearchCarsSheet
        visible={isSearchSheetVisible}
        onClose={() => setIsSearchSheetVisible(false)}
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