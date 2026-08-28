import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const cars = [
  {
    name: 'Hyundai Creta',
    details: 'SUV · Automatic · 5 seats',
    price: '₹2,500',
    status: 'Available',
    image: require('@/assets/images/cars/hyundai-creta.png'),
    available: true,
  },
  {
    name: 'Kia Seltos',
    details: 'SUV · Automatic · 5 seats',
    price: '₹2,500',
    status: 'Available',
    image: require('@/assets/images/cars/kia-seltos.png'),
    available: true,
  },
  {
    name: 'Maruti Suzuki Ignis',
    details: 'MUV · Manual · 7 seats',
    price: '₹2,200',
    status: 'Available',
    image: require('@/assets/images/cars/maruti-ignis.png'),
    available: true,
  },
  {
    name: 'Toyota Innova Crysta',
    details: 'MUV · Manual · 7 seats',
    price: '₹3,200',
    status: 'Completed',
    image: require('@/assets/images/cars/toyota-innova.png'),
    available: false,
  },
];

export default function PopularCars() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {cars.map((car, index) => (
        <View style={styles.card} key={index}>
          <View style={styles.imageContainer}>
            <Image source={car.image} style={styles.image} />
          </View>

          <View style={styles.cardContent}>
            <View style={styles.infoContainer}>
              <Text style={styles.carName}>{car.name}</Text>

              <Text style={styles.details}>{car.details}</Text>

              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    !car.available && styles.completedDot,
                  ]}
                />

                <Text style={styles.statusText}>{car.status}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>{car.price}</Text>
              <Text style={styles.perDay}>/day</Text>
            </View>
          </View>
        </View>
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