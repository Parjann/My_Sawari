import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface BookingFooterProps {
  price?: string;
  onConfirm?: () => void;
}

export default function BookingFooter({
  price = '₹7,700',
  onConfirm,
}: BookingFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.payToday}>Pay today</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        {/* Confirm Button */}
        <Pressable style={styles.button} onPress={onConfirm}>
          <Text style={styles.buttonText}>Confirm Booking</Text>

          <Feather
            name="arrow-right"
            size={19}
            color="#101828"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.8,
    borderTopColor: '#E5E5E0',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  content: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceContainer: {
    height: 48,
    justifyContent: 'space-between',
  },

  payToday: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#6F7280',
  },

  price: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: '#101828',
  },

  button: {
    width: 220,
    height: 56,
    backgroundColor: '#B8F23A',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  buttonText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#101828',
  },
});