import {
    Feather,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import { useState } from 'react';

import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface DrivingOptionSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirmOption: (option: string) => void;
}

type DrivingOption = 'Self Drive' | 'With Driver';

export default function DrivingOptionSheet({
  visible,
  onClose,
  onConfirmOption,
}: DrivingOptionSheetProps) {
  const [selectedOption, setSelectedOption] =
    useState<DrivingOption>('Self Drive');

  // Controls the Driver Charges information popup
  const [
    isDriverChargesVisible,
    setIsDriverChargesVisible,
  ] = useState(false);

  const handleConfirm = () => {
    onConfirmOption(selectedOption);
    onClose();
  };

  return (
    <>
      {/* Driving Option Bottom Sheet */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            {/* Drag Handle */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <Text style={styles.title}>
                    Driving option
                  </Text>

                  <Text style={styles.subtitle}>
                    Choose how you want to travel
                  </Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Feather
                    name="x"
                    size={22}
                    color="#101828"
                  />
                </Pressable>
              </View>

              {/* Options */}
              <View style={styles.optionsContainer}>
                {/* Self Drive */}
                <Pressable
                  style={[
                    styles.option,
                    selectedOption === 'Self Drive' &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedOption('Self Drive')
                  }
                >
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="steering"
                      size={24}
                      color="#101828"
                    />
                  </View>

                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>
                      Self Drive
                    </Text>

                    <Text style={styles.optionDescription}>
                      You drive the vehicle yourself.
                    </Text>

                    <Text style={styles.optionPrice}>
                      No driver charges
                    </Text>
                  </View>

                  <SelectionIndicator
                    selected={
                      selectedOption === 'Self Drive'
                    }
                  />
                </Pressable>

                {/* With Driver */}
                <Pressable
                  style={[
                    styles.option,
                    selectedOption === 'With Driver' &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedOption('With Driver')
                  }
                >
                  <View style={styles.iconContainer}>
                    <Feather
                      name="user"
                      size={24}
                      color="#101828"
                    />
                  </View>

                  <View style={styles.optionContent}>
                    <View style={styles.driverTitleRow}>
                      <Text style={styles.optionTitle}>
                        With Driver
                      </Text>

                      {/* Info button */}
                      <Pressable
                        onPress={(event) => {
                          // Prevent selecting the option when
                          // only the info icon is pressed
                          event.stopPropagation();
                          setIsDriverChargesVisible(true);
                        }}
                        hitSlop={8}
                      >
                        <Feather
                          name="info"
                          size={16}
                          color="#6F7280"
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.optionDescription}>
                      Travel with a professional driver.
                    </Text>

                    <Text style={styles.optionPrice}>
                      From ₹800/day
                    </Text>
                  </View>

                  <SelectionIndicator
                    selected={
                      selectedOption === 'With Driver'
                    }
                  />
                </Pressable>
              </View>

              {/* Confirm Button */}
              <Pressable
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>
                  Confirm Option
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Driver Charges Information Popup */}
      <Modal
        visible={isDriverChargesVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setIsDriverChargesVisible(false)
        }
      >
        <View style={styles.infoOverlay}>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>
                Driver charges
              </Text>

              <Pressable
                style={styles.infoCloseButton}
                onPress={() =>
                  setIsDriverChargesVisible(false)
                }
                hitSlop={10}
              >
                <Feather
                  name="x"
                  size={22}
                  color="#6F7280"
                />
              </Pressable>
            </View>

            <Text style={styles.infoMessage}>
              Driver charges are calculated based on the rental
              duration and applicable service conditions.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

interface SelectionIndicatorProps {
  selected: boolean;
}

function SelectionIndicator({
  selected,
}: SelectionIndicatorProps) {
  if (selected) {
    return (
      <View style={styles.selectedIndicator}>
        <Feather
          name="check"
          size={16}
          color="#B8F23A"
        />
      </View>
    );
  }

  return <View style={styles.unselectedIndicator} />;
}

const styles = StyleSheet.create({
  // =========================
  // Driving Option Sheet
  // =========================

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
    height: 22,
    paddingTop: 12,
    alignItems: 'center',
  },

  handle: {
    width: 44,
    height: 6,
    borderRadius: 100,
    backgroundColor: '#E5E5E0',
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  header: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    gap: 2,
    flex: 1,
  },

  title: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
  },

  subtitle: {
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

  optionsContainer: {
    marginTop: 24,
    gap: 12,
  },

  option: {
    height: 101,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E5E0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  selectedOption: {
    backgroundColor: 'rgba(184, 242, 58, 0.1)',
    borderColor: '#B8F23A',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F6F5F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  optionContent: {
    flex: 1,
    gap: 4,
  },

  optionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  driverTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  optionDescription: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  optionPrice: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#101828',
  },

  selectedIndicator: {
    width: 24,
    height: 24,
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: '#101828',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unselectedIndicator: {
    width: 24,
    height: 24,
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E0',
  },

  confirmButton: {
    height: 56,
    marginTop: 28,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },

  // =========================
  // Driver Charges Info Popup
  // =========================

  infoOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
  },

  infoContainer: {
    width: '100%',
    maxWidth: 345,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    gap: 2,
  },

  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  infoTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  infoCloseButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoMessage: {
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },
});