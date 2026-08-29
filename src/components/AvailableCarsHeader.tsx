import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface AvailableCarsHeaderProps {
  location: string;
  dates: string;
  drivingOption: string;
  onEdit: () => void;
  onFilter: () => void;
  onSort: () => void;
}

// Converts "17 Aug – 20 Aug" into "17–20 Aug"
function formatDates(dates: string) {
  const match = dates.match(
    /(\d+)\s+([A-Za-z]+)\s+[–-]\s+(\d+)\s+([A-Za-z]+)/
  );

  if (!match) return dates;

  const [, startDay, startMonth, endDay, endMonth] = match;

  // Same month → 17–20 Aug
  if (startMonth === endMonth) {
    return `${startDay}–${endDay} ${endMonth}`;
  }

  // Different months → 28 Aug–2 Sep
  return `${startDay} ${startMonth}–${endDay} ${endMonth}`;
}

export default function AvailableCarsHeader({
  location,
  dates,
  drivingOption,
  onEdit,
  onFilter,
  onSort,
}: AvailableCarsHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Available cars</Text>

          <Text style={styles.searchDetails} numberOfLines={1}>
            {location} · {formatDates(dates)} · {drivingOption}
          </Text>
        </View>

        <Pressable style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      {/* Filter and Sort */}
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onFilter}>
          <Feather name="filter" size={16} color="#101828" />
          <Text style={styles.actionText}>Filter</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={onSort}>
          <Feather name="sliders" size={16} color="#101828" />
          <Text style={styles.actionText}>Sort</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F6F5F1',
  },

  topRow: {
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginRight: 12,
  },

  label: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  searchDetails: {
    marginTop: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  editButton: {
    width: 56,
    height: 33,
    borderWidth: 0.5,
    borderColor: 'rgba(16, 24, 40, 0.5)',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
  },

  actions: {
    flexDirection: 'row',
    paddingTop: 12,
    gap: 8,
  },

  actionButton: {
    height: 34,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 99,
  },

  actionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
  },
});