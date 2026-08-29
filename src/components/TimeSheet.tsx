import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface TimeSheetProps {
  visible: boolean;
  onClose: () => void;
  onApplyTimes: (pickupTime: string, returnTime: string) => void;
}

const TIME_OPTIONS = [
  '06:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
  '08:00 PM',
];

export default function TimeSheet({
  visible,
  onClose,
  onApplyTimes,
}: TimeSheetProps) {
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [returnTime, setReturnTime] = useState('10:00 AM');

  const handleApply = () => {
    onApplyTimes(pickupTime, returnTime);
    onClose();
  };

  const renderTimeOptions = (
    selectedTime: string,
    setSelectedTime: (time: string) => void
  ) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeList}
      >
        {TIME_OPTIONS.map((time) => {
          const isSelected = selectedTime === time;

          return (
            <Pressable
              key={time}
              style={[
                styles.timeButton,
                isSelected && styles.selectedTimeButton,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  isSelected && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  };

  return (
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

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Select pickup & return time
              </Text>

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

            {/* Pickup */}
            <View style={styles.timeSection}>
              <Text style={styles.sectionLabel}>
                Pickup
              </Text>

              <View style={styles.timeListContainer}>
                {renderTimeOptions(
                  pickupTime,
                  setPickupTime
                )}
              </View>
            </View>

            {/* Return */}
            <View style={styles.timeSection}>
              <Text style={styles.sectionLabel}>
                Return
              </Text>

              <View style={styles.timeListContainer}>
                {renderTimeOptions(
                  returnTime,
                  setReturnTime
                )}
              </View>
            </View>

            {/* Apply Button */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.applyButton}
                onPress={handleApply}
              >
                <Text style={styles.applyButtonText}>
                  Apply Time
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
  },

  sheet: {
    height: 380,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },

  handleContainer: {
    height: 22,
    paddingTop: 12,
    paddingBottom: 4,
    alignItems: 'center',
  },

  handle: {
    width: 44,
    height: 6,
    borderRadius: 100,
    backgroundColor: '#E5E5E0',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  header: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    flex: 1,
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: '#F6F5F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeSection: {
    paddingTop: 24,
  },

  sectionLabel: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  timeListContainer: {
    paddingTop: 12,
  },

  timeList: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
  },

  timeButton: {
    height: 46,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    borderRadius: 100,
  },

  selectedTimeButton: {
    backgroundColor: '#101828',
    borderColor: '#101828',
  },

  timeText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#101828',
  },

  selectedTimeText: {
    color: '#FFFFFF',
  },

  buttonContainer: {
    paddingTop: 28,
  },

  applyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  applyButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});