import { Feather } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type SortOption =
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'rating'
  | 'name_asc';

interface SortCarsSheetProps {
  visible: boolean;
  selectedSort: SortOption;
  onClose: () => void;
  onSelectSort: (sort: SortOption) => void;
}

export default function SortCarsSheet({
  visible,
  selectedSort,
  onClose,
  onSelectSort,
}: SortCarsSheetProps) {
  const sortOptions: { id: SortOption; label: string; icon: keyof typeof Feather.glyphMap }[] = [
    { id: 'recommended', label: 'Recommended', icon: 'award' },
    { id: 'price_asc', label: 'Price: Low to High', icon: 'trending-up' },
    { id: 'price_desc', label: 'Price: High to Low', icon: 'trending-down' },
    { id: 'rating', label: 'Top Rated', icon: 'star' },
    { id: 'name_asc', label: 'Name: A to Z', icon: 'type' },
  ];

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
            <Text style={styles.title}>Sort cars</Text>
            <Pressable onPress={onClose}>
              <Feather name="x" size={20} color="#6F7280" />
            </Pressable>
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            {sortOptions.map((opt) => {
              const isSelected = selectedSort === opt.id;
              return (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => {
                    onSelectSort(opt.id);
                    onClose();
                  }}
                >
                  <View style={styles.optionLeft}>
                    <Feather
                      name={opt.icon}
                      size={18}
                      color={isSelected ? '#101828' : '#6F7280'}
                    />
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.radioSelected,
                    ]}
                  >
                    {isSelected && (
                      <Feather name="check" size={13} color="#101828" />
                    )}
                  </View>
                </Pressable>
              );
            })}
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
    paddingBottom: 32,
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },

  title: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },

  optionsList: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 8,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },

  optionRowSelected: {
    backgroundColor: 'rgba(184, 242, 58, 0.2)',
    borderColor: '#101828',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  optionLabel: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '600',
    color: '#344054',
  },

  optionLabelSelected: {
    fontWeight: '700',
    color: '#101828',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 99,
    borderWidth: 1.5,
    borderColor: '#D0D5DD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    backgroundColor: '#B8F23A',
    borderColor: '#101828',
  },
});
