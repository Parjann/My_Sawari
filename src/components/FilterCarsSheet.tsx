import { CategoryType, categories } from '@/data/cars';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface CarFilters {
  category: CategoryType | 'All';
  transmission: 'All' | 'Automatic' | 'Manual';
  fuel: 'All' | 'Petrol' | 'Diesel' | 'Hybrid';
  seats: 'All' | '5' | '7+';
  maxPrice: number | null; // null = any price
}

export const defaultFilters: CarFilters = {
  category: 'All',
  transmission: 'All',
  fuel: 'All',
  seats: 'All',
  maxPrice: null,
};

interface FilterCarsSheetProps {
  visible: boolean;
  filters: CarFilters;
  onClose: () => void;
  onApply: (filters: CarFilters) => void;
}

export default function FilterCarsSheet({
  visible,
  filters,
  onClose,
  onApply,
}: FilterCarsSheetProps) {
  const [draftFilters, setDraftFilters] = useState<CarFilters>(filters);

  // Sync draft filters when modal opens
  useEffect(() => {
    if (visible) {
      setDraftFilters(filters);
    }
  }, [visible, filters]);

  const transmissions: ('All' | 'Automatic' | 'Manual')[] = [
    'All',
    'Automatic',
    'Manual',
  ];

  const fuelTypes: ('All' | 'Petrol' | 'Diesel' | 'Hybrid')[] = [
    'All',
    'Petrol',
    'Diesel',
    'Hybrid',
  ];

  const seatOptions: ('All' | '5' | '7+')[] = ['All', '5', '7+'];

  const pricePresets: { label: string; value: number | null }[] = [
    { label: 'All prices', value: null },
    { label: 'Under ₹2,000', value: 2000 },
    { label: 'Under ₹2,500', value: 2500 },
    { label: 'Under ₹3,500', value: 3500 },
  ];

  const handleReset = () => {
    setDraftFilters(defaultFilters);
  };

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filter cars</Text>
            <Pressable onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Category */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Body Type</Text>
              <View style={styles.chipRow}>
                {categories.map((cat) => {
                  const isSelected = draftFilters.category === cat;
                  return (
                    <Pressable
                      key={cat}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          category: cat,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Transmission */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transmission</Text>
              <View style={styles.chipRow}>
                {transmissions.map((t) => {
                  const isSelected = draftFilters.transmission === t;
                  return (
                    <Pressable
                      key={t}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          transmission: t,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {t}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Fuel Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fuel Type</Text>
              <View style={styles.chipRow}>
                {fuelTypes.map((f) => {
                  const isSelected = draftFilters.fuel === f;
                  return (
                    <Pressable
                      key={f}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          fuel: f,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {f}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Seats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Seats</Text>
              <View style={styles.chipRow}>
                {seatOptions.map((s) => {
                  const isSelected = draftFilters.seats === s;
                  return (
                    <Pressable
                      key={s}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          seats: s,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {s === 'All' ? 'All Seats' : `${s} Seats`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Price Preset */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Max Price / Day</Text>
              <View style={styles.chipRow}>
                {pricePresets.map((preset) => {
                  const isSelected = draftFilters.maxPrice === preset.value;
                  return (
                    <Pressable
                      key={preset.label}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          maxPrice: preset.value,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {preset.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer Action */}
          <View style={styles.footer}>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
              <Feather name="check" size={18} color="#101828" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },

  backdrop: {
    flex: 1,
  },

  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '85%',
    paddingBottom: 24,
  },

  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D5DD',
    borderRadius: 99,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },

  title: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },

  resetText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: '#356AE6',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 20,
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '700',
    color: '#344054',
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  chipSelected: {
    backgroundColor: '#101828',
    borderColor: '#101828',
  },

  chipText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  applyButton: {
    height: 52,
    backgroundColor: '#B8F23A',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  applyButtonText: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '700',
    color: '#101828',
  },
});
