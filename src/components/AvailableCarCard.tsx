import { Feather } from '@expo/vector-icons';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface AvailableCarCardProps {
  name: string;
  type: string;
  seats: string;
  transmission: string;
  price: string;
  image: ImageSourcePropType;
  onViewDetails: () => void;
}

export default function AvailableCarCard({
  name,
  type,
  seats,
  transmission,
  price,
  image,
  onViewDetails,
}: AvailableCarCardProps) {
  return (
    <View style={styles.card}>
      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Available Badge */}
        <View style={styles.availableBadge}>
          <Text style={styles.availableText}>
            Available
          </Text>
        </View>
      </View>

      {/* Car Information */}
      <View style={styles.infoRow}>
        {/* Left Side */}
        <View style={styles.carInfo}>
          <Text style={styles.carName}>
            {name}
          </Text>

          <Text style={styles.carDetails}>
            {type} · {seats} seats · {transmission}
          </Text>
        </View>

        {/* Price */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>
            ₹{price}
          </Text>

          <Text style={styles.perDay}>
            per day
          </Text>
        </View>
      </View>

      {/* View Details Button */}
      <Pressable
        style={styles.detailsButton}
        onPress={onViewDetails}
      >
        <Text style={styles.detailsText}>
          View Details
        </Text>

        <Feather
          name="arrow-right"
          size={19}
          color="#101828"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 24,
  },

  imageContainer: {
    width: '100%',
    height: 208,
    backgroundColor: '#E5E5E0',
    borderRadius: 24,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  availableBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#B8F23A',
    borderRadius: 999,
  },

  availableText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    color: '#101828',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
  },

  carInfo: {
    flex: 1,
    paddingRight: 12,
  },

  carName: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#101828',
  },

  carDetails: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#6F7280',
  },

  priceSection: {
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 22,
    lineHeight: 33,
    fontWeight: '800',
    letterSpacing: -0.55,
    color: '#101828',
  },

  perDay: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#6F7280',
  },

  detailsButton: {
    height: 56,
    marginTop: 16,
    borderWidth: 0.5,
    borderColor: '#101828',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});