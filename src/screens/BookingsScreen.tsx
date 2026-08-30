import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BookingTab = 'Upcoming' | 'Active' | 'Completed';

interface BookingsScreenProps {
  onViewBookingDetails: () => void;
}

export default function BookingsScreen({
  onViewBookingDetails,
}: BookingsScreenProps) {
  const [activeTab, setActiveTab] = useState<BookingTab>('Upcoming');

  const tabs: BookingTab[] = ['Upcoming', 'Active', 'Completed'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Your booking</Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {tabs.map((tab) => (
              <Pressable
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Upcoming Booking */}
        {activeTab === 'Upcoming' && (
          <Pressable
            style={styles.bookingCard}
            onPress={onViewBookingDetails}
          >
            <Image
              source={require('@/assets/images/cars/verna.png')}
              style={styles.carImage}
              resizeMode="cover"
            />

            <View style={styles.bookingInfo}>
              {/* Car name + Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.carName}>Kia Seltos</Text>

                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Upcoming</Text>
                </View>
              </View>

              {/* Date */}
              <View style={styles.infoRow}>
                <Feather
                  name="calendar"
                  size={14}
                  color="#6F7280"
                />
                <Text style={styles.infoText}>17 Aug — 20 Aug</Text>
              </View>

              {/* Location */}
              <View style={styles.infoRow}>
                <Feather
                  name="navigation"
                  size={14}
                  color="#6F7280"
                />
                <Text style={styles.infoText}>
                  Bikaner · Self Drive
                </Text>
              </View>

              {/* Price */}
              <Text style={styles.price}>₹7,700 paid</Text>
            </View>
          </Pressable>
        )}

        {/* Active Empty State */}
        {activeTab === 'Active' && (
          <View style={styles.emptyState}>
            <Feather name="truck" size={32} color="#98A2B3" />
            <Text style={styles.emptyTitle}>No active bookings</Text>
            <Text style={styles.emptyText}>
              You don't have any active bookings right now.
            </Text>
          </View>
        )}

        {/* Completed Empty State */}
        {activeTab === 'Completed' && (
          <View style={styles.emptyState}>
            <Feather name="check-circle" size={32} color="#98A2B3" />
            <Text style={styles.emptyTitle}>No completed bookings</Text>
            <Text style={styles.emptyText}>
              Your completed bookings will appear here.
            </Text>
          </View>
        )}
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
  },

  /* =========================================
     TITLE
  ========================================= */

  title: {
    marginTop: 16,
    fontFamily: 'Manrope',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  /* =========================================
     TABS
  ========================================= */

  tabsContainer: {
    marginTop: 16,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E4E7EC',
  },

  tabs: {
    flexDirection: 'row',
    gap: 24,
  },

  tabButton: {
    height: 33,
    justifyContent: 'center',
    paddingBottom: 10,
  },

  activeTabButton: {
    borderBottomWidth: 1.6,
    borderBottomColor: '#101828',
  },

  tabText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  activeTabText: {
    fontWeight: '700',
    color: '#101828',
  },

  /* =========================================
     BOOKING CARD
  ========================================= */

  bookingCard: {
    flexDirection: 'row',
    marginTop: 32,
    width: '100%',
    minHeight: 115,
    padding: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },

  carImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#F7F7F3',
  },

  bookingInfo: {
    flex: 1,
    minHeight: 91,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  carName: {
    fontFamily: 'Manrope',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#356AE6',
  },

  statusText: {
    fontFamily: 'Manrope',
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: '600',
    letterSpacing: -0.16,
    color: '#101828',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  infoText: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#6F7280',
  },

  price: {
    marginTop: 4,
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    letterSpacing: -0.16,
    color: '#101828',
  },

  /* =========================================
     EMPTY STATES
  ========================================= */

  emptyState: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 12,
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
  },

  emptyText: {
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 13,
    lineHeight: 20,
    color: '#6F7280',
  },
});