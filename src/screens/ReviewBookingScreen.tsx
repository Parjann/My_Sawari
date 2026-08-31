import { CustomerDetails } from '@/data/bookings';
import { getCarById } from '@/data/cars';
import { BookingDraft } from '@/screens/CarDetailsScreen';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
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

export interface FinalizedBookingData extends BookingDraft {
  customer: CustomerDetails;
}

interface ReviewBookingScreenProps {
  bookingDraft: BookingDraft;
  onBack: () => void;
  onContinue: (finalData: FinalizedBookingData) => void;
}

export default function ReviewBookingScreen({
  bookingDraft,
  onBack,
  onContinue,
}: ReviewBookingScreenProps) {
  const car = getCarById(bookingDraft.carId);

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: 'Jatin Prajapat',
    mobile: '1234565433',
    email: 'jatinprajapat682@gmail.com',
    drivingLicence: 'RJ0620230001234',
  });

  const handleContinue = () => {
    onContinue({
      ...bookingDraft,
      customer,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* =========================================
          SCROLLABLE CONTENT
      ========================================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={20} color="#101828" />
          </Pressable>

          <Text style={styles.headerTitle}>Review booking</Text>
        </View>

        {/* Car Summary */}
        {car && (
          <View style={styles.carCard}>
            <Image
              source={car.image}
              style={styles.carImage}
              resizeMode="cover"
            />

            <View style={styles.carInfo}>
              <Text style={styles.carName}>{car.name}</Text>

              <Text style={styles.carDetails}>
                {car.category} · {car.seats} seats · {car.transmission}
              </Text>

              <Text style={styles.selfDrive}>
                {bookingDraft.drivingOption}
              </Text>
            </View>
          </View>
        )}

        {/* Trip Details */}
        <View style={styles.tripSection}>
          <Text style={styles.sectionTitle}>Trip details</Text>

          <View style={styles.tripRows}>
            <DetailRow
              icon="map-pin"
              label="Pickup"
              value={bookingDraft.location}
            />

            <DetailRow
              icon="calendar"
              label="Dates"
              value={`${bookingDraft.pickupDate} — ${bookingDraft.returnDate} · ${bookingDraft.days} days`}
            />

            <DetailRow
              icon="clock"
              label="Time"
              value={`${bookingDraft.pickupTime} — ${bookingDraft.returnTime}`}
            />

            <DetailRow
              icon="user"
              label="Driving option"
              value={
                bookingDraft.drivingOption === 'Self Drive'
                  ? 'Self Drive · No driver charges'
                  : 'With Driver · Driver charges included'
              }
              isLast
            />
          </View>
        </View>

        {/* Customer Details */}
        <View style={styles.customerSection}>
          <Text style={styles.sectionTitle}>Customer details</Text>

          <View style={styles.form}>
            <InputField
              label="Full name"
              value={customer.fullName}
              onChangeText={(text) =>
                setCustomer((prev) => ({ ...prev, fullName: text }))
              }
            />

            <InputField
              label="Mobile number"
              value={customer.mobile}
              placeholder="10-digit mobile number"
              keyboardType="phone-pad"
              onChangeText={(text) =>
                setCustomer((prev) => ({ ...prev, mobile: text }))
              }
            />

            <InputField
              label="Email"
              value={customer.email}
              keyboardType="email-address"
              onChangeText={(text) =>
                setCustomer((prev) => ({ ...prev, email: text }))
              }
            />

            <InputField
              label="Driving licence number"
              value={customer.drivingLicence}
              placeholder="e.g. RJ0620230001234"
              onChangeText={(text) =>
                setCustomer((prev) => ({ ...prev, drivingLicence: text }))
              }
            />
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Price summary</Text>

          <View style={styles.priceRows}>
            <PriceRow
              label="Vehicle rental"
              value={`₹${bookingDraft.pricing.rental.toLocaleString('en-IN')}`}
              first
            />

            <PriceRow
              label="Additional charges"
              value={`₹${bookingDraft.pricing.additionalCharges.toLocaleString('en-IN')}`}
            />

            {bookingDraft.pricing.discount > 0 && (
              <PriceRow
                label="Discount"
                value={`− ₹${bookingDraft.pricing.discount.toLocaleString('en-IN')}`}
                valueStyle={styles.discount}
              />
            )}

            <PriceRow
              label="Security deposit (refundable)"
              value={`₹${bookingDraft.pricing.securityDeposit.toLocaleString('en-IN')}`}
              labelStyle={styles.mutedText}
              valueStyle={styles.mutedText}
            />
          </View>
        </View>
      </ScrollView>

      {/* =========================================
          FIXED PAYMENT FOOTER
      ========================================= */}
      <View style={styles.paymentFooter}>
        <View style={styles.footerDivider} />

        <View style={styles.payTodayRow}>
          <Text style={styles.payTodayLabel}>Pay today</Text>
          <Text style={styles.payTodayPrice}>
            ₹{bookingDraft.pricing.paidToday.toLocaleString('en-IN')}
          </Text>
        </View>

        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            Continue to payment
          </Text>

          <Feather
            name="arrow-right"
            size={19}
            color="#101828"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


/* =========================================
   TRIP DETAIL ROW
========================================= */

function DetailRow({
  icon,
  label,
  value,
  isLast = false,
}: {
  icon: any;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View
      style={[
        styles.detailRow,
        !isLast && styles.detailBorder,
      ]}
    >
      <Feather
        name={icon}
        size={18}
        color="#6F7280"
      />

      <Text style={styles.detailLabel}>{label}</Text>

      <Text
        style={styles.detailValue}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

/* =========================================
   INPUT FIELD
========================================= */

function InputField({
  label,
  value,
  placeholder,
  keyboardType = 'default',
  onChangeText,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  keyboardType?: any;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6F7280"
        keyboardType={keyboardType}
      />
    </View>
  );
}

/* =========================================
   PRICE ROW
========================================= */

function PriceRow({
  label,
  value,
  valueStyle,
  labelStyle,
  first = false,
}: {
  label: string;
  value: string;
  valueStyle?: object;
  labelStyle?: object;
  first?: boolean;
}) {
  return (
    <View
      style={[
        styles.priceRow,
        first && styles.firstPriceRow,
      ]}
    >
      <Text style={[styles.priceLabel, labelStyle]}>
        {label}
      </Text>

      <Text style={[styles.priceValue, valueStyle]}>
        {value}
      </Text>
    </View>
  );
}

/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  /* Header */

  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  /* Car Card */

  carCard: {
    height: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E5E0',
  },

  carImage: {
    width: 96,
    height: 80,
    borderRadius: 16,
  },

  carInfo: {
    height: 72,
    justifyContent: 'flex-start',
  },

  carName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  carDetails: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#6F7280',
    marginTop: 2,
  },

  selfDrive: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
    marginTop: 6,
  },

  /* Common Section Title */

  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  /* Trip Details */

  tripSection: {
    paddingTop: 28,
  },

  tripRows: {
    paddingTop: 12,
  },

  detailRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  detailBorder: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E0',
  },

  detailLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#6F7280',
  },

  detailValue: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    color: '#101828',
    textAlign: 'right',
  },

  /* Customer Details */

  customerSection: {
    paddingTop: 24,
  },

  form: {
    paddingTop: 10,
  },

  inputGroup: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    color: '#6F7280',
    marginBottom: 6,
  },

  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E4E7EC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    color: '#101828',
  },

  /* Price Summary */

  priceSection: {
    paddingTop: 16,
  },

  priceRows: {
    paddingTop: 0,
  },

  priceRow: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  firstPriceRow: {
    height: 47,
    paddingTop: 18,
    paddingBottom: 6,
  },

  priceLabel: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#101828',
  },

  priceValue: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#101828',
  },

  discount: {
    color: '#2E9B62',
  },

  mutedText: {
    color: '#6F7280',
  },

  /* Fixed Payment Footer */

  paymentFooter: {
    backgroundColor: '#F7F7F3',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },

  footerDivider: {
    height: 1,
    backgroundColor: '#E5E5E0',
  },

  payTodayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 14,
  },

  payTodayLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#101828',
  },

  payTodayPrice: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    color: '#101828',
  },

  continueButton: {
    height: 52,
    backgroundColor: '#B8F23A',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  continueText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#101828',
  },
});