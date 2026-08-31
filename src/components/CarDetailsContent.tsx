import { Car } from '@/data/cars';
import { Feather } from '@expo/vector-icons';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface CarDetailsContentProps {
  car: Car;
  drivingOption: 'Self Drive' | 'With Driver';
  onDrivingOptionChange: (option: 'Self Drive' | 'With Driver') => void;
  location?: string;
  pickupDate?: string;
  returnDate?: string;
  days?: number;
  rentalPrice: number;
  additionalCharges: number;
  discount: number;
  securityDeposit: number;
  totalPrice: number;
}

export default function CarDetailsContent({
  car,
  drivingOption,
  onDrivingOptionChange,
  location = 'Bikaner',
  pickupDate = '17 Aug',
  returnDate = '20 Aug',
  days = 3,
  rentalPrice,
  additionalCharges,
  discount,
  securityDeposit,
  totalPrice,
}: CarDetailsContentProps) {
  const features = [
    ['Sunroof', 'Bluetooth', 'Touchscreen Infotainment'],
    ['Rear camera', 'Cruise control', 'Power steering'],
  ];

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.carName}>{car.name}</Text>

          <View style={styles.ratingRow}>
            <Feather name="star" size={16} color="#101828" />
            <Text style={styles.rating}>{car.rating ?? 4.8}</Text>
            <Text style={styles.trips}>· {car.trips ?? 214} trips</Text>
          </View>
        </View>

        <View style={styles.availableBadge}>
          <View
            style={[
              styles.statusDot,
              !car.available && styles.statusDotUnavailable,
            ]}
          />
          <Text style={styles.availableText}>
            {car.available ? 'Available' : 'Booked'}
          </Text>
        </View>
      </View>

      {/* ================= CAR SPECS ================= */}
      <View style={styles.specsRow}>
        <SpecCard icon="users" label={`${car.seats} seats`} />
        <SpecCard icon="activity" label={car.transmission} />
        <SpecCard icon="droplet" label={car.fuel} />
      </View>

      {/* ================= DRIVING OPTION ================= */}
      <SectionTitle title="Driving option" />

      <View style={styles.drivingRow}>
        <DrivingCard
          icon="circle"
          title="Self Drive"
          subtitle="No driver charges"
          selected={drivingOption === 'Self Drive'}
          onPress={() => onDrivingOptionChange('Self Drive')}
        />

        <DrivingCard
          icon="user"
          title="With Driver"
          subtitle="₹800/day"
          selected={drivingOption === 'With Driver'}
          onPress={() => onDrivingOptionChange('With Driver')}
        />
      </View>

      {/* ================= FEATURES ================= */}
      <SectionTitle title="Features" />

      <View style={styles.featuresContainer}>
        {features.map((column, columnIndex) => (
          <View style={styles.featureColumn} key={columnIndex}>
            {column.map((feature) => (
              <View style={styles.featureRow} key={feature}>
                <Feather name="check" size={18} color="#2E9B62" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* ================= RENTAL INFORMATION ================= */}
      <SectionTitle title="Rental information" />

      <View style={styles.infoCard}>
        <InfoRow label="Pickup" value={`${location}, 10:00 AM`} />
        <InfoRow
          label="Duration"
          value={`${pickupDate}–${returnDate} · ${days} ${days === 1 ? 'day' : 'days'}`}
        />
        <InfoRow label="Return" value={`${location}, 10:00 AM`} last />
      </View>

      {/* ================= PRICE DETAILS ================= */}
      <SectionTitle title="Price details" />

      <View style={styles.priceContainer}>
        <PriceRow
          label={`Vehicle rental · ${days} ${days === 1 ? 'day' : 'days'}`}
          value={`₹${rentalPrice.toLocaleString('en-IN')}`}
        />
        <PriceRow
          label="Additional charges"
          value={`₹${additionalCharges.toLocaleString('en-IN')}`}
        />
        {discount > 0 && (
          <PriceRow
            label="Discount"
            value={`−₹${discount.toLocaleString('en-IN')}`}
            discount
          />
        )}
        <PriceRow
          label="Security deposit (refundable)"
          value={`₹${securityDeposit.toLocaleString('en-IN')}`}
          muted
        />
      </View>

      {/* ================= TOTAL ================= */}
      <View style={styles.totalContainer}>
        <Text style={styles.payToday}>Pay today</Text>
        <Text style={styles.totalPrice}>
          ₹{totalPrice.toLocaleString('en-IN')}
        </Text>
      </View>

      <Text style={styles.note}>
        Security deposit is collected separately and fully refunded after the
        vehicle is returned in original condition.
      </Text>
    </View>
  );
}


/* ======================================================
   REUSABLE SMALL COMPONENTS
====================================================== */

function SpecCard({
  icon,
  label,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.specCard}>
      <Feather name={icon} size={18} color="#6F7280" />
      <Text style={styles.specText}>{label}</Text>
    </View>
  );
}

function DrivingCard({
  icon,
  title,
  subtitle,
  selected = false,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.drivingCard,
        selected && styles.drivingCardSelected,
      ]}
      onPress={onPress}
    >
      <View style={styles.drivingTop}>
        <Feather name={icon} size={20} color="#101828" />

        <View
          style={[
            styles.radio,
            selected && styles.radioSelected,
          ]}
        >
          {selected && (
            <Feather name="check" size={12} color="#B8F23A" />
          )}
        </View>
      </View>

      <Text style={styles.drivingTitle}>{title}</Text>
      <Text style={styles.drivingSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function PriceRow({
  label,
  value,
  discount = false,
  muted = false,
}: {
  label: string;
  value: string;
  discount?: boolean;
  muted?: boolean;
}) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>

      <Text
        style={[
          styles.priceValue,
          discount && styles.discountValue,
          muted && styles.mutedValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* ======================================================
   STYLES
====================================================== */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  carName: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33,
    letterSpacing: -0.6,
    color: '#101828',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },

  rating: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
    color: '#101828',
  },

  trips: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#6F7280',
  },

  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(184, 242, 58, 0.25)',
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

  availableText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    color: '#101828',
  },

  /* SPECS */
  specsRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 24,
  },

  specCard: {
    flex: 1,
    height: 77,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  specText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: '#101828',
  },

  /* SECTIONS */
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#101828',
    marginTop: 32,
  },

  /* DRIVING OPTIONS */
  drivingRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },

  drivingCard: {
    flex: 1,
    height: 112,
    padding: 16,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 16,
    gap: 8,
  },

  drivingCardSelected: {
    backgroundColor: 'rgba(184, 242, 58, 0.1)',
    borderColor: '#B8F23A',
  },

  drivingTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    backgroundColor: '#101828',
    borderColor: '#101828',
  },

  drivingTitle: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    color: '#101828',
  },

  drivingSubtitle: {
    fontFamily: 'Manrope',
    fontSize: 13,
    lineHeight: 20,
    color: '#6F7280',
  },

  /* FEATURES */
  featuresContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  featureColumn: {
    flex: 1,
    gap: 12,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  featureText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 21,
    color: '#101828',
  },

  /* RENTAL INFO */
  infoCard: {
    marginTop: 12,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 16,
    overflow: 'hidden',
  },

  infoRow: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoBorder: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E0',
  },

  infoLabel: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#6F7280',
  },

  infoValue: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },

  /* PRICE */
  priceContainer: {
    marginTop: 12,
    gap: 12,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceLabel: {
    fontFamily: 'Manrope',
    fontSize: 15,
    lineHeight: 22,
    color: '#6F7280',
  },

  priceValue: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    color: '#101828',
  },

  discountValue: {
    color: '#2E9B62',
  },

  mutedValue: {
    color: '#6F7280',
  },

  /* TOTAL */
  totalContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 0.8,
    borderTopColor: '#E5E5E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  payToday: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '500',
    color: '#6F7280',
  },

  totalPrice: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33,
    letterSpacing: -0.6,
    color: '#101828',
  },

  note: {
    marginTop: 12,
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 15,
    color: '#6F7280',
  },
});