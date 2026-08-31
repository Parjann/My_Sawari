import { BookingStatus } from '@/data/bookings';
import { getCarById } from '@/data/cars';
import { useBooking } from '@/store/BookingContext';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BookingTab = 'Upcoming' | 'Active' | 'Completed';

interface BookingsScreenProps {
  onViewBookingDetails: (bookingId?: string) => void;
}

export default function BookingsScreen({
  onViewBookingDetails,
}: BookingsScreenProps) {
  const { bookings } = useBooking();
  const [activeTab, setActiveTab] = useState<BookingTab>('Upcoming');

  const tabs: BookingTab[] = ['Upcoming', 'Active', 'Completed'];

  const tabStatusMap: Record<BookingTab, BookingStatus> = {
    Upcoming: 'upcoming',
    Active: 'active',
    Completed: 'completed',
  };

  const currentBookings = bookings.filter(
    (b) => b.status === tabStatusMap[activeTab]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {/* =====================================================
            TITLE
        ====================================================== */}
        <Text style={styles.title}>Your bookings</Text>

        {/* =====================================================
            TABS
        ====================================================== */}
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollList}
        >
          {currentBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather
                name={
                  activeTab === 'Completed'
                    ? 'check-circle'
                    : activeTab === 'Active'
                    ? 'activity'
                    : 'calendar'
                }
                size={36}
                color="#98A2B3"
              />
              <Text style={styles.emptyTitle}>
                No {activeTab.toLowerCase()} bookings
              </Text>
              <Text style={styles.emptyText}>
                Your {activeTab.toLowerCase()} bookings will appear here.
              </Text>
            </View>
          ) : (
            currentBookings.map((booking) => {
              const car = getCarById(booking.carId);
              const carName = car ? car.name : 'Rental Vehicle';
              const carImage = car
                ? car.image
                : require('@/assets/images/cars/verna.png');

              if (activeTab === 'Active') {
                return (
                  <View style={styles.activeCard} key={booking.id}>
                    {/* Active status */}
                    <View style={styles.activeHeader}>
                      <View style={styles.activeStatus}>
                        <View style={styles.activeDot} />
                        <Text style={styles.activeStatusText}>
                          Your rental is active
                        </Text>
                      </View>
                    </View>

                    {/* Vehicle information */}
                    <View style={styles.activeVehicleContainer}>
                      <Image
                        source={carImage}
                        style={styles.activeCarImage}
                        resizeMode="cover"
                      />

                      <View style={styles.activeVehicleInfo}>
                        <Text style={styles.activeCarName}>{carName}</Text>

                        {/* Driver + Location */}
                        <View style={styles.activeInfoRow}>
                          <Feather
                            name={
                              booking.drivingOption === 'With Driver'
                                ? 'user'
                                : 'navigation'
                            }
                            size={14}
                            color="rgba(255,255,255,0.7)"
                          />
                          <Text style={styles.activeInfoText}>
                            {booking.drivingOption} · {booking.pickup.location}
                          </Text>
                        </View>

                        {/* Return */}
                        <Text style={styles.activeInfoText}>
                          Return · {booking.return.date} · {booking.return.time}
                        </Text>
                      </View>
                    </View>

                    {/* View Rental button */}
                    <View style={styles.activeButtonContainer}>
                      <Pressable
                        style={styles.viewRentalButton}
                        onPress={() => onViewBookingDetails(booking.id)}
                      >
                        <Text style={styles.viewRentalText}>View Rental</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              }

              // Upcoming or Completed card
              return (
                <Pressable
                  key={booking.id}
                  style={styles.bookingCard}
                  onPress={() => onViewBookingDetails(booking.id)}
                >
                  <Image
                    source={carImage}
                    style={styles.carImage}
                    resizeMode="cover"
                  />

                  <View style={styles.bookingInfo}>
                    {/* Car name + Status */}
                    <View style={styles.cardHeader}>
                      <Text style={styles.carName}>{carName}</Text>

                      <View style={styles.statusBadge}>
                        <View
                          style={[
                            styles.statusDot,
                            booking.status === 'completed' &&
                              styles.statusDotCompleted,
                          ]}
                        />
                        <Text style={styles.statusText}>
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </Text>
                      </View>
                    </View>

                    {/* Date */}
                    <View style={styles.infoRow}>
                      <Feather name="calendar" size={14} color="#6F7280" />
                      <Text style={styles.infoText}>
                        {booking.pickup.date} — {booking.return.date}
                      </Text>
                    </View>

                    {/* Location */}
                    <View style={styles.infoRow}>
                      <Feather name="navigation" size={14} color="#6F7280" />
                      <Text style={styles.infoText}>
                        {booking.pickup.location} · {booking.drivingOption}
                      </Text>
                    </View>

                    {/* Price */}
                    <Text style={styles.price}>
                      ₹{booking.pricing.paidToday.toLocaleString('en-IN')} paid
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({

  /* ==========================================================
     MAIN
  ========================================================== */

  container: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollList: {
    paddingTop: 8,
    paddingBottom: 40,
  },

  /* ==========================================================
     TITLE
  ========================================================== */

  title: {
    marginTop: 16,
    fontFamily: 'Manrope',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  /* ==========================================================
     TABS
  ========================================================== */

  tabsContainer: {
    marginTop: 16,
    height: 49,
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
    fontWeight: '500',
    color: '#101828',
  },

  /* ==========================================================
     UPCOMING BOOKING CARD
  ========================================================== */

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

  statusDotCompleted: {
    backgroundColor: '#6F7280',
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

  /* ==========================================================
     ACTIVE BOOKING CARD
  ========================================================== */

  activeCard: {
    width: '100%',
    height: 215,
    marginTop: 16,
    backgroundColor: '#101828',
    borderRadius: 16,
    overflow: 'hidden',
  },

  /* ----------------------------------------------------------
     Active status
  ---------------------------------------------------------- */

  activeHeader: {
    height: 35,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  activeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#B8F23A',
  },

  activeStatusText: {
    fontFamily: 'Manrope',
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: '600',
    letterSpacing: -0.16,
    color: '#B8F23A',
  },

  /* ----------------------------------------------------------
     Active vehicle
  ---------------------------------------------------------- */

  activeVehicleContainer: {
    height: 112,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  activeCarImage: {
    width: 96,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#1D2939',
  },

  activeVehicleInfo: {
    flex: 1,
    height: 80,
  },

  activeCarName: {
    fontFamily: 'Manrope',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.16,
    color: '#FFFFFF',
  },

  activeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },

  activeInfoText: {
    fontFamily: 'Manrope',
    fontSize: 12.5,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: 'rgba(255,255,255,0.7)',
  },

  /* ----------------------------------------------------------
     View Rental
  ---------------------------------------------------------- */

  activeButtonContainer: {
    height: 68,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  viewRentalButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#B8F23A',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewRentalText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },

  /* ==========================================================
     EMPTY STATES
  ========================================================== */

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