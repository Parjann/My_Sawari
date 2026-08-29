import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import LocationSheet from './LocationSheet';

interface SearchCarsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchCarsSheet({
  visible,
  onClose,
}: SearchCarsSheetProps) {
  const [isLocationSheetVisible, setIsLocationSheetVisible] =
    useState(false);

  const [selectedLocation, setSelectedLocation] = useState('Guwahati');

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            {/* Drag Indicator */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Where do you want to go?</Text>
                <Text style={styles.subtitle}>
                  Find the right car for your journey.
                </Text>
              </View>

              <Pressable style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={22} color="#101828" />
              </Pressable>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Pickup Location */}
              <SearchRow
                icon="map-pin"
                label="Pickup location"
                value={selectedLocation}
                onPress={() => setIsLocationSheetVisible(true)}
              />

              <View style={styles.divider} />

              {/* Dates */}
              <SearchRow
                icon="calendar"
                label="Dates"
                value="17 Aug – 20 Aug"
              />

              <View style={styles.divider} />

              {/* Time */}
              <SearchRow
                icon="clock"
                label="Time"
                value="10:00 AM – 10:00 AM"
              />

              <View style={styles.divider} />

              {/* Driving Option */}
              <SearchRow
                icon="circle"
                label="Driving Option"
                value="Self Drive"
              />

              <View style={styles.divider} />

              {/* No driver charges */}
              <View style={styles.noDriverCard}>
                <View style={styles.greenDot} />
                <Text style={styles.noDriverText}>No driver charges</Text>
              </View>
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomSection}>
              <Pressable style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search cars</Text>
                <Feather name="arrow-right" size={21} color="#101828" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pickup Location Sheet */}
      <LocationSheet
        visible={isLocationSheetVisible}
        onClose={() => setIsLocationSheetVisible(false)}
        onSelectLocation={(location) => {
          setSelectedLocation(location);
          setIsLocationSheetVisible(false);
        }}
      />
    </>
  );
}

interface SearchRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
}

function SearchRow({
  icon,
  label,
  value,
  onPress,
}: SearchRowProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
    >
      <Feather name={icon} size={24} color="#101828" />

      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>

      <Feather name="chevron-right" size={24} color="#6F7280" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
  },

  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },

  handleContainer: {
    height: 16,
    paddingTop: 12,
    alignItems: 'center',
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 10,
    backgroundColor: '#E5E5E0',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F6F5F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },

  row: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  rowText: {
    flex: 1,
    gap: 2,
  },

  rowLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  rowValue: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E0',
  },

  noDriverCard: {
    height: 43,
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F6F5F1',
    borderRadius: 16,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#2E9B62',
  },

  noDriverText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#101828',
  },

  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
  },

  searchButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  searchButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});