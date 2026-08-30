import { Feather } from '@expo/vector-icons';

import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

interface BookingSuccessScreenProps {
  carName: string;
  onBackToHome: () => void;
  onViewBookings: () => void;
}

export default function BookingSuccessScreen({
  carName,
  onBackToHome,
  onViewBookings,
}: BookingSuccessScreenProps) {
  const carImage =
    carName === 'Hyundai Creta'
      ? require('@/assets/images/cars/verna.png')
      : require('@/assets/images/cars/ford.png');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* SUCCESS SECTION */}
        <View style={styles.successSection}>
          <View style={styles.successIcon}>
            <Feather
              name="check"
              size={40}
              color="#101828"
            />
          </View>

          <Text style={styles.title}>You're all set</Text>

          <Text style={styles.subtitle}>
            Your {carName} is booked. Details sent to your phone.
          </Text>
        </View>

        {/* BOOKING DETAILS CARD */}
        <View style={styles.bookingCard}>
          {/* Booking Reference */}
          <View style={styles.referenceRow}>
            <Text style={styles.referenceLabel}>
              Booking reference
            </Text>

            <Text style={styles.referenceNumber}>
              MS-6816
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Car Information */}
          <View style={styles.carRow}>
            <Image
              source={carImage}
              style={styles.carImage}
              resizeMode="cover"
            />

            <View style={styles.carInfo}>
              <Text style={styles.carName}>
                {carName}
              </Text>

              <Text style={styles.driveType}>
                Self Drive
              </Text>
            </View>
          </View>

          {/* Location, Date & Time */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Feather
                name="map-pin"
                size={17}
                color="#6F7280"
              />

              <Text style={styles.detailText}>
                Bikaner
              </Text>
            </View>

            <View style={styles.detailRowSpacing}>
              <Feather
                name="calendar"
                size={17}
                color="#6F7280"
              />

              <Text style={styles.detailText}>
                17 Aug — 20 Aug · 3 days
              </Text>
            </View>

            <View style={styles.detailRowSpacing}>
              <Feather
                name="clock"
                size={17}
                color="#6F7280"
              />

              <Text style={styles.detailText}>
                10:00 AM — 10:00 AM
              </Text>
            </View>
          </View>

          <View style={styles.dividerBottom} />

          {/* Paid Amount */}
          <View style={styles.paidRow}>
            <Text style={styles.paidLabel}>
              Paid today
            </Text>

            <Text style={styles.paidAmount}>
              ₹7,700
            </Text>
          </View>
        </View>
      </View>

      {/* FOOTER ACTIONS */}
      <View style={styles.footer}>
        <Pressable
          style={styles.homeButton}
          onPress={onBackToHome}
        >
          <Text style={styles.homeButtonText}>
            Back to home
          </Text>
        </Pressable>

        <Pressable
          style={styles.bookingsButton}
          onPress={onViewBookings}
        >
          <Text style={styles.bookingsButtonText}>
            View my bookings
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  successSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 37,
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 24,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.75,
    color: '#101828',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    width: '100%',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: '#6F7280',
    textAlign: 'center',
  },

  bookingCard: {
    width: '100%',
    marginTop: 36,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5E0',
  },

  referenceRow: {
    height: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  referenceLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    color: '#6F7280',
  },

  referenceNumber: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '800',
    letterSpacing: -0.375,
    color: '#101828',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E0',
    marginTop: 16,
  },

  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },

  carImage: {
    width: 80,
    height: 64,
    borderRadius: 16,
  },

  carInfo: {
    justifyContent: 'center',
  },

  carName: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '800',
    letterSpacing: -0.425,
    color: '#101828',
  },

  driveType: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    color: '#6F7280',
  },

  detailsContainer: {
    marginTop: 16,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  detailRowSpacing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },

  detailText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    color: '#101828',
  },

  dividerBottom: {
    height: 1,
    backgroundColor: '#E5E5E0',
    marginTop: 16,
  },

  paidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },

  paidLabel: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    color: '#101828',
  },

  paidAmount: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#101828',
  },

  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 15,
  },

  homeButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#101828',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },

  bookingsButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookingsButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});