import { Car } from '@/data/cars';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AvailableCarCard from './AvailableCarCard';

interface AvailableCarsProps {
  carsList: Car[];
  onViewCarDetails: (carId: string) => void;
  onResetFilters?: () => void;
}

export default function AvailableCars({
  carsList,
  onViewCarDetails,
  onResetFilters,
}: AvailableCarsProps) {
  if (carsList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="alert-circle" size={36} color="#98A2B3" />
        <Text style={styles.emptyTitle}>No cars match your filters</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting or clearing your filters to see more available cars.
        </Text>
        {onResetFilters && (
          <Pressable style={styles.resetButton} onPress={onResetFilters}>
            <Text style={styles.resetButtonText}>Reset filters</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {carsList.length} {carsList.length === 1 ? 'car' : 'cars'} ready
      </Text>

      {carsList.map((car) => (
        <AvailableCarCard
          key={car.id}
          name={car.name}
          type={car.category}
          seats={String(car.seats)}
          transmission={car.transmission}
          price={car.pricePerDay.toLocaleString('en-IN')}
          image={car.image}
          onViewDetails={() => onViewCarDetails(car.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },

  heading: {
    fontFamily: 'Manrope',
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
    marginBottom: 28,
  },

  emptyContainer: {
    paddingHorizontal: 24,
    paddingVertical: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
    marginTop: 12,
  },

  emptySubtitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 21,
    color: '#6F7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },

  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#101828',
    borderRadius: 12,
  },

  resetButtonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});