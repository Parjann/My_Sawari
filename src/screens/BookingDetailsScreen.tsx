import { Feather } from '@expo/vector-icons';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BookingDetailsScreenProps {
  onBack: () => void;
}

export default function BookingDetailsScreen({
  onBack,
}: BookingDetailsScreenProps) {
  const customerDetails = [
    {
      icon: 'user',
      label: 'Full name',
      value: 'Jatin Prajapat',
    },
    {
      icon: 'smartphone',
      label: 'Mobile',
      value: '1234565433',
    },
    {
      icon: 'mail',
      label: 'Email',
      value: 'jatinprajapat682@gmail.com',
    },
    {
      icon: 'check-circle',
      label: 'Driving licence',
      value: '23456543456y65434',
    },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#101828" />
        </Pressable>

        <Text style={styles.headerTitle}>Booking details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Booking ID */}
        <View style={styles.bookingCard}>
          <View>
            <Text style={styles.bookingLabel}>Booking ID</Text>
            <Text style={styles.bookingId}>MS-20260817-001</Text>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Upcoming</Text>
          </View>
        </View>

        {/* Vehicle */}
        <SectionTitle title="VEHICLE" />

        <View style={styles.vehicleCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80',
            }}
            style={styles.vehicleImage}
          />

          <View style={styles.vehicleContent}>
            <Text style={styles.carName}>Kia Seltos</Text>

            <View style={styles.specsContainer}>
              <Spec icon="users" text="5 seats" />
              <Spec icon="zap" text="Diesel" />
              <Spec icon="wind" text="Automatic" />
            </View>

            <View style={styles.secondSpecRow}>
              <Spec icon="activity" text="Unlimited km" />
            </View>
          </View>
        </View>

        {/* Trip */}
        <SectionTitle title="TRIP" />

        <View style={styles.tripCard}>
          <TripBlock
            title="PICKUP"
            location="Bikaner"
            date="17 Aug · 10:00 AM"
            border
          />

          <TripBlock
            title="RETURN"
            location="Bikaner"
            date="20 Aug · 10:00 AM"
          />
        </View>

        {/* Customer */}
        <SectionTitle title="CUSTOMER" />

        <View style={styles.customerCard}>
          {customerDetails.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.customerRow,
                index === customerDetails.length - 1 &&
                  styles.customerLastRow,
              ]}
            >
              <Feather
                name={item.icon as any}
                size={19}
                color="#6F7280"
                style={styles.customerIcon}
              />

              <View style={styles.customerText}>
                <Text style={styles.customerLabel}>{item.label}</Text>
                <Text style={styles.customerValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driving Option */}
        <SectionTitle title="DRIVING OPTION" />

        <View style={styles.drivingCard}>
          <View style={styles.steeringBox}>
            <Feather name="check-circle" size={26} color="#101828" />
          </View>

          <View>
            <Text style={styles.drivingTitle}>Self Drive</Text>
            <Text style={styles.drivingSubtitle}>
              You drive · no driver charges
            </Text>
          </View>
        </View>

        {/* Payment */}
        <SectionTitle title="PAYMENT" />

        <View style={styles.paymentCard}>
          <PriceRow label="Rental (3 days)" value="₹7,500" />
          <PriceRow label="Additional charges" value="₹500" />
          <PriceRow label="Discount" value="−₹300" discount />

          <View style={styles.divider} />

          <View style={styles.paidTodayRow}>
            <Text style={styles.paidTodayLabel}>Paid today</Text>
            <Text style={styles.paidTodayValue}>₹7,700</Text>
          </View>

          <PriceRow
            label="Security deposit (at pickup)"
            value="₹2,000"
            mutedValue
          />
        </View>

        {/* Rental Information */}
        <SectionTitle title="RENTAL INFORMATION" />

        <View style={styles.infoCard}>
          <Feather
            name="info"
            size={20}
            color="#6F7280"
            style={styles.infoIcon}
          />

          <Text style={styles.infoText}>
            Free cancellation until 24h before pickup. Unlimited kilometres.
            Carry your original driving licence and a valid ID at pickup.
            Deposit refunded within 3 days of return.
          </Text>
        </View>

        {/* Help */}
        <Pressable style={styles.helpButton}>
          <Feather name="help-circle" size={18} color="#356AE6" />
          <Text style={styles.helpText}>Need help with this booking?</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------ Reusable Components ------------------ */

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Spec({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <View style={styles.spec}>
      <Feather name={icon as any} size={17} color="#6F7280" />
      <Text style={styles.specText}>{text}</Text>
    </View>
  );
}

function TripBlock({
  title,
  location,
  date,
  border,
}: {
  title: string;
  location: string;
  date: string;
  border?: boolean;
}) {
  return (
    <View style={[styles.tripBlock, border && styles.tripBlockBorder]}>
      <Text style={styles.tripLabel}>{title}</Text>
      <Text style={styles.tripLocation}>{location}</Text>
      <Text style={styles.tripDate}>{date}</Text>
    </View>
  );
}

function PriceRow({
  label,
  value,
  discount,
  mutedValue,
}: {
  label: string;
  value: string;
  discount?: boolean;
  mutedValue?: boolean;
}) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>

      <Text
        style={[
          styles.priceValue,
          discount && styles.discountValue,
          mutedValue && styles.mutedValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  /* Header */
  header: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E4E7EC',
  },

  backButton: {
    width: 42,
    height: 42,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },

  /* Scroll */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Booking */
  bookingCard: {
    minHeight: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bookingLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F7280',
    marginBottom: 2,
  },

  bookingId: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#101828',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#356AE6',
  },

  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  /* Section */
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#6F7280',
  },

  /* Vehicle */
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    overflow: 'hidden',
  },

  vehicleImage: {
    width: '100%',
    height: 160,
  },

  vehicleContent: {
    padding: 16,
  },

  carName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101828',
  },

  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 10,
  },

  secondSpecRow: {
    marginTop: 8,
  },

  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  specText: {
    fontSize: 14,
    color: '#6F7280',
  },

  /* Trip */
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  tripBlock: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  tripBlockBorder: {
    borderRightWidth: 0.8,
    borderRightColor: '#E4E7EC',
  },

  tripLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#6F7280',
  },

  tripLocation: {
    fontSize: 15,
    fontWeight: '700',
    color: '#101828',
    marginTop: 4,
  },

  tripDate: {
    fontSize: 12,
    color: '#6F7280',
    marginTop: 2,
  },

  /* Customer */
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    overflow: 'hidden',
  },

  customerRow: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#E4E7EC',
  },

  customerLastRow: {
    borderBottomWidth: 0,
  },

  customerIcon: {
    width: 24,
    marginRight: 10,
  },

  customerText: {
    flex: 1,
  },

  customerLabel: {
    fontSize: 12,
    color: '#6F7280',
    marginBottom: 2,
  },

  customerValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  /* Driving */
  drivingCard: {
    minHeight: 74,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  steeringBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#B8F23A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  drivingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
  },

  drivingSubtitle: {
    fontSize: 13,
    color: '#6F7280',
    marginTop: 2,
  },

  /* Payment */
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    padding: 16,
  },

  priceRow: {
    minHeight: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  priceLabel: {
    fontSize: 14,
    color: '#6F7280',
  },

  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  discountValue: {
    color: '#16A34A',
  },

  mutedValue: {
    color: '#6F7280',
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
    marginTop: 10,
  },

  paidTodayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 4,
  },

  paidTodayLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#101828',
  },

  paidTodayValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
  },

  /* Rental Information */
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  infoIcon: {
    marginTop: 1,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 21,
    color: '#6F7280',
  },

  /* Help */
  helpButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  helpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#356AE6',
  },
});