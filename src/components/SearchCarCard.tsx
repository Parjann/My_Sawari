import { Feather } from '@expo/vector-icons';

import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SearchCarCardProps {
  onPress: () => void;
  location: string;
  dates: string;
  time: string;
  drivingOption: string;
}

export default function SearchCarCard({
  onPress,
  location,
  dates,
  time,
  drivingOption,
}: SearchCarCardProps) {
  return (
    <View style={styles.card}>
      {/* Pickup + Driving option */}
      <View style={styles.topRow}>
        <View style={styles.locationSection}>
          <View style={styles.pickupLabel}>
            <Feather name="map-pin" size={16} color="#6F7280" />
            <Text style={styles.pickupText}>Pickup</Text>
          </View>

          <Text style={styles.location}>{location}</Text>
        </View>

        <View style={styles.drivingOptionBadge}>
          <Text style={styles.drivingOptionText}>
            {drivingOption}
          </Text>
        </View>
      </View>

      {/* Date and time */}
      <View style={styles.dateTimeRow}>
        <View style={styles.infoItem}>
          <Feather name="calendar" size={18} color="#6F7280" />
          <Text style={styles.infoText}>{dates}</Text>
        </View>

        <View style={styles.infoItem}>
          <Feather name="clock" size={18} color="#6F7280" />
          <Text style={styles.infoText}>{time}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Search */}
      <Pressable style={styles.searchRow} onPress={onPress}>
        <Text style={styles.searchText}>Search cars</Text>

        <View style={styles.arrowButton}>
          <Feather
            name="arrow-right"
            size={22}
            color="#101828"
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  locationSection: {
    flex: 1,
  },

  pickupLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  pickupText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F7280',
  },

  location: {
    marginTop: 4,
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
  },

  drivingOptionBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#B8F23A',
    borderRadius: 16,
  },

  drivingOptionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
  },

  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 16,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#101828',
    flexShrink: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
    marginTop: 20,
  },

  searchRow: {
    height: 44,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});