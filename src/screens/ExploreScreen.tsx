import { cars, categories, CategoryType } from '@/data/cars';
import { destinations } from '@/data/destinations';
import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExploreScreenProps {
  onSelectCar: (carId: string) => void;
}

export default function ExploreScreen({ onSelectCar }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  // Filter cars based on search text, selected category, and selected destination
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Category filter
      if (selectedCategory !== 'All' && car.category !== selectedCategory) {
        return false;
      }

      // Destination filter
      if (
        selectedDestination &&
        car.location.toLowerCase() !== selectedDestination.toLowerCase()
      ) {
        return false;
      }

      // Search query filter (matches name, location, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesLocation = car.location.toLowerCase().includes(query);
        const matchesCategory = car.category.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDestination]);

  const handleDestinationPress = (city: string) => {
    if (selectedDestination === city) {
      setSelectedDestination(null); // toggle off
    } else {
      setSelectedDestination(city);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================================
            HEADER & SEARCH
        ====================================================== */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Find and rent your perfect ride</Text>

          <View style={styles.searchBar}>
            <Feather name="map-pin" size={18} color="#6F7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city, car or model..."
              placeholderTextColor="#6F7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Feather name="x" size={18} color="#6F7280" />
              </Pressable>
            )}
          </View>
        </View>

        {/* =====================================================
            BROWSE BY TYPE
        ====================================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by type</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* =====================================================
            POPULAR DESTINATIONS
        ====================================================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular destinations</Text>
            {selectedDestination && (
              <Pressable onPress={() => setSelectedDestination(null)}>
                <Text style={styles.clearFilterText}>Clear filter</Text>
              </Pressable>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.destinationsScroll}
          >
            {destinations.map((dest) => {
              const isSelected = selectedDestination === dest.name;
              return (
                <Pressable
                  key={dest.id}
                  style={[
                    styles.destinationCard,
                    isSelected && styles.destinationCardSelected,
                  ]}
                  onPress={() => handleDestinationPress(dest.name)}
                >
                  <View style={styles.destinationIcon}>
                    <Feather
                      name="navigation"
                      size={20}
                      color={isSelected ? '#101828' : '#356AE6'}
                    />
                  </View>
                  <Text style={styles.destinationName}>{dest.name}</Text>
                  <Text style={styles.destinationCars}>
                    {dest.carsAvailable} cars available
                  </Text>
                  <Text style={styles.destinationPrice}>{dest.priceRange}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* =====================================================
            CARS LIST
        ====================================================== */}
        <View style={styles.carsSection}>
          <View style={styles.carsHeader}>
            <Text style={styles.carsSectionTitle}>
              {selectedDestination
                ? `Cars in ${selectedDestination}`
                : selectedCategory !== 'All'
                ? `${selectedCategory}s near you`
                : 'Cars near you'}
            </Text>
            <Text style={styles.resultsCount}>
              {filteredCars.length} available
            </Text>
          </View>

          {filteredCars.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather name="alert-circle" size={32} color="#98A2B3" />
              <Text style={styles.emptyTitle}>No cars found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search query or filters
              </Text>
            </View>
          ) : (
            <View style={styles.carsList}>
              {filteredCars.map((car) => (
                <Pressable
                  key={car.id}
                  style={styles.carCard}
                  onPress={() => onSelectCar(car.id)}
                >
                  <Image source={car.image} style={styles.carCardImage} />

                  <View style={styles.carCardInfo}>
                    <View style={styles.carNameRow}>
                      <Text style={styles.carCardName}>{car.name}</Text>
                      <View style={styles.statusBadge}>
                        <View
                          style={[
                            styles.statusDot,
                            !car.available && styles.statusDotUnavailable,
                          ]}
                        />
                        <Text style={styles.statusText}>
                          {car.available ? 'Available' : 'Booked'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.carCardSpecs}>
                      {car.category} · {car.fuel} · {car.transmission} · {car.seats} seats
                    </Text>

                    <View style={styles.carCardFooter}>
                      <View style={styles.locationRow}>
                        <Feather name="map-pin" size={12} color="#6F7280" />
                        <Text style={styles.locationText}>{car.location}</Text>
                      </View>

                      <View style={styles.priceRow}>
                        <Text style={styles.priceValue}>₹{car.pricePerDay}</Text>
                        <Text style={styles.priceUnit}>/day</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },

  title: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.7,
    color: '#101828',
  },

  subtitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#6F7280',
    marginTop: 4,
    marginBottom: 16,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    gap: 12,
  },

  searchInput: {
    flex: 1,
    fontFamily: 'Manrope',
    fontSize: 15,
    color: '#101828',
  },

  section: {
    marginTop: 24,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  carsSectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
  },

  clearFilterText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: '#356AE6',
  },

  categoryScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },

  categoryChipSelected: {
    backgroundColor: '#101828',
    borderColor: '#101828',
  },

  categoryChipText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  categoryChipTextSelected: {
    color: '#FFFFFF',
  },

  destinationsScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },

  destinationCard: {
    width: 140,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    gap: 4,
  },

  destinationCardSelected: {
    backgroundColor: '#EBF3FF',
    borderColor: '#356AE6',
  },

  destinationIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  destinationName: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '700',
    color: '#101828',
  },

  destinationCars: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#6F7280',
  },

  destinationPrice: {
    fontFamily: 'Manrope',
    fontSize: 11,
    fontWeight: '600',
    color: '#101828',
    marginTop: 2,
  },

  carsSection: {
    marginTop: 28,
    paddingHorizontal: 24,
  },

  carsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  resultsCount: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#6F7280',
  },

  carsList: {
    gap: 16,
  },

  carCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },

  carCardImage: {
    width: 100,
    height: 80,
    borderRadius: 14,
    resizeMode: 'cover',
  },

  carCardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },

  carNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  carCardName: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(184, 242, 58, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#2E9B62',
  },

  statusDotUnavailable: {
    backgroundColor: '#98A2B3',
  },

  statusText: {
    fontFamily: 'Manrope',
    fontSize: 11,
    fontWeight: '600',
    color: '#101828',
  },

  carCardSpecs: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#6F7280',
    marginTop: 4,
  },

  carCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  locationText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#6F7280',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  priceValue: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
  },

  priceUnit: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#6F7280',
    marginLeft: 2,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },

  emptyTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
    marginTop: 8,
  },

  emptySubtitle: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#6F7280',
    textAlign: 'center',
  },
});
