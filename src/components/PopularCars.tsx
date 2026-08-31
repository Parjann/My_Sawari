import { cars, CategoryType, getCarsByCategory } from '@/data/cars';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface PopularCarsProps {
  selectedCategory?: CategoryType;
  onSelectCar?: (carId: string) => void;
}

function formatCarDetails(car: typeof cars[0]): string {
  return `${car.category} · ${car.transmission} · ${car.seats} seats`;
}

function getStatusText(available: boolean): string {
  return available ? 'Available' : 'Completed';
}

export default function PopularCars({
  selectedCategory = 'All',
  onSelectCar,
}: PopularCarsProps) {
  const filteredCars = getCarsByCategory(selectedCategory);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {filteredCars.map((car) => (
        <Pressable
          style={styles.card}
          key={car.id}
          onPress={() => onSelectCar?.(car.id)}
        >
          <View style={styles.imageContainer}>
            <Image source={car.image} style={styles.image} />
          </View>

          <View style={styles.cardContent}>
            <View style={styles.infoContainer}>
              <Text style={styles.carName}>{car.name}</Text>

              <Text style={styles.details}>
                {formatCarDetails(car)}
              </Text>

              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    !car.available && styles.completedDot,
                  ]}
                />

                <Text style={styles.statusText}>
                  {getStatusText(car.available)}
                </Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{car.pricePerDay}</Text>
              <Text style={styles.perDay}>/day</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContent: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 20,
  },

  card: {
    width: 270,
    height: 267,
  },

  imageContainer: {
    width: 270,
    height: 176,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  cardContent: {
    flexDirection: 'row',
    paddingTop: 14,
    alignItems: 'flex-start',
    width: 270,
  },

  infoContainer: {
    flex: 1,
    gap: 4,
  },

  carName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
    // fontFamily: 'Manrope',
  },

  details: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
    // fontFamily: 'Manrope',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#B8F23A',
  },

  completedDot: {
    backgroundColor: '#6F7280',
  },

  statusText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
    // fontFamily: 'Manrope',
  },

  priceContainer: {
    width: 55,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
    textAlign: 'right',
    // fontFamily: 'Manrope',
  },

  perDay: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    color: '#6F7280',
    textAlign: 'right',
  },
});