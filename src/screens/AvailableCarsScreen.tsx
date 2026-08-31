import AvailableCars from '@/components/AvailableCars';
import AvailableCarsHeader from '@/components/AvailableCarsHeader';
import FilterCarsSheet, {
    CarFilters,
    defaultFilters,
} from '@/components/FilterCarsSheet';
import { SearchData } from '@/components/SearchCarsSheet';
import SortCarsSheet, { SortOption } from '@/components/SortCarsSheet';
import { cars } from '@/data/cars';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AvailableCarsScreenProps {
  searchData: SearchData;
  onEdit: () => void;
  onViewCarDetails: (carId: string) => void;
}

const sortLabels: Record<SortOption, string> = {
  recommended: 'Recommended',
  price_asc: 'Low to High',
  price_desc: 'High to Low',
  rating: 'Top Rated',
  name_asc: 'A to Z',
};

export default function AvailableCarsScreen({
  searchData,
  onEdit,
  onViewCarDetails,
}: AvailableCarsScreenProps) {
  const [filters, setFilters] = useState<CarFilters>(defaultFilters);
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');

  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
  const [isSortSheetVisible, setIsSortSheetVisible] = useState(false);

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.transmission !== 'All') count++;
    if (filters.fuel !== 'All') count++;
    if (filters.seats !== 'All') count++;
    if (filters.maxPrice !== null) count++;
    return count;
  }, [filters]);

  // Filter and sort the cars list
  const filteredAndSortedCars = useMemo(() => {
    let list = cars.filter((car) => {
      // Must be available
      if (!car.available) return false;

      // Category filter
      if (filters.category !== 'All' && car.category !== filters.category) {
        return false;
      }

      // Transmission filter
      if (
        filters.transmission !== 'All' &&
        car.transmission !== filters.transmission
      ) {
        return false;
      }

      // Fuel filter
      if (filters.fuel !== 'All' && car.fuel !== filters.fuel) {
        return false;
      }

      // Seats filter
      if (filters.seats === '5' && car.seats > 5) {
        return false;
      }
      if (filters.seats === '7+' && car.seats < 7) {
        return false;
      }

      // Max price filter
      if (filters.maxPrice !== null && car.pricePerDay > filters.maxPrice) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (selectedSort) {
      case 'price_asc':
        list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price_desc':
        list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating':
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'name_asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recommended':
      default:
        // Default / recommended order
        break;
    }

    return list;
  }, [filters, selectedSort]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AvailableCarsHeader
        location={searchData.location}
        dates={searchData.dates}
        drivingOption={searchData.drivingOption}
        activeFiltersCount={activeFiltersCount}
        activeSortLabel={sortLabels[selectedSort]}
        onEdit={onEdit}
        onFilter={() => setIsFilterSheetVisible(true)}
        onSort={() => setIsSortSheetVisible(true)}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AvailableCars
          carsList={filteredAndSortedCars}
          onViewCarDetails={onViewCarDetails}
          onResetFilters={() => {
            setFilters(defaultFilters);
            setSelectedSort('recommended');
          }}
        />
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterCarsSheet
        visible={isFilterSheetVisible}
        filters={filters}
        onClose={() => setIsFilterSheetVisible(false)}
        onApply={(newFilters) => setFilters(newFilters)}
      />

      {/* Sort Bottom Sheet */}
      <SortCarsSheet
        visible={isSortSheetVisible}
        selectedSort={selectedSort}
        onClose={() => setIsSortSheetVisible(false)}
        onSelectSort={(newSort) => setSelectedSort(newSort)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F1',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },
});