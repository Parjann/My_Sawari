import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface DateSheetProps {
  visible: boolean;
  onClose: () => void;
  onApplyDates: (startDate: Date, endDate: Date) => void;
}

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

// August 2026 - matching the Figma design
const YEAR = 2026;
const MONTH = 7; // August (JavaScript months start from 0)

export default function DateSheet({
  visible,
  onClose,
  onApplyDates,
}: DateSheetProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(YEAR, MONTH, 17)
  );

  const [endDate, setEndDate] = useState<Date | null>(
    new Date(YEAR, MONTH, 20)
  );

  const daysInMonth = new Date(
    YEAR,
    MONTH + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    YEAR,
    MONTH,
    1
  ).getDay();

  // Converts a Date object into text like "17 Aug"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Number of days between the selected dates
  const getDaysDifference = () => {
    if (!startDate || !endDate) return 0;

    const difference =
      endDate.getTime() - startDate.getTime();

    return Math.round(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // Checks whether two dates are the same calendar day
  const isSameDay = (
    date1: Date,
    date2: Date | null
  ) => {
    if (!date2) return false;

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Checks whether a date is inside the selected range
  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;

    const dateTime = date.getTime();

    return (
      dateTime >= startDate.getTime() &&
      dateTime <= endDate.getTime()
    );
  };

  const handleDatePress = (date: Date) => {
    // If there is no start date, select one
    if (!startDate) {
      setStartDate(date);
      return;
    }

    // If both dates are already selected,
    // start a completely new date range
    if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    // If the selected date is before the start date,
    // make it the new start date
    if (date.getTime() < startDate.getTime()) {
      setStartDate(date);
      return;
    }

    // Otherwise, select it as the end date
    setEndDate(date);
  };

  const handleApply = () => {
    if (!startDate || !endDate) return;

    // Send the actual Date objects back to SearchCarsSheet
    onApplyDates(startDate, endDate);

    onClose();
  };

  // Empty spaces + all days of the month
  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

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
              <View>
                <Text style={styles.title}>
                  Where do you want to go?
                </Text>

                <Text style={styles.subtitle}>
                  Find the right car for your journey.
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

            {/* Calendar */}
            <View style={styles.calendar}>
              {/* Week Days */}
              <View style={styles.weekRow}>
                {WEEK_DAYS.map((day, index) => (
                  <View
                    key={`${day}-${index}`}
                    style={styles.weekDay}
                  >
                    <Text style={styles.weekDayText}>
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Calendar Dates */}
              <View style={styles.daysContainer}>
                {calendarDays.map((day, index) => {
                  // Empty space before the first day
                  if (day === null) {
                    return (
                      <View
                        key={`empty-${index}`}
                        style={styles.dayContainer}
                      />
                    );
                  }

                  const date = new Date(
                    YEAR,
                    MONTH,
                    day
                  );

                  const isStart = isSameDay(
                    date,
                    startDate
                  );

                  const isEnd = isSameDay(
                    date,
                    endDate
                  );

                  const isInRange =
                    isDateInRange(date);

                  return (
                    <Pressable
                      key={`day-${day}`}
                      style={[
                        styles.dayContainer,

                        // Green background for the selected range
                        isInRange &&
                          styles.rangeDay,

                        // Rounded left side of the range
                        isStart &&
                          styles.rangeStart,

                        // Rounded right side of the range
                        isEnd &&
                          styles.rangeEnd,
                      ]}
                      onPress={() =>
                        handleDatePress(date)
                      }
                    >
                      <View
                        style={[
                          styles.dayCircle,
                          (isStart || isEnd) &&
                            styles.selectedCircle,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            (isStart || isEnd) &&
                              styles.selectedDayText,
                          ]}
                        >
                          {day}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Date Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.daysText}>
                {startDate && endDate
                  ? `${getDaysDifference()} days`
                  : 'Select dates'}
              </Text>

              <Text style={styles.dateRangeText}>
                {startDate && endDate
                  ? `${formatDate(startDate)} — ${formatDate(endDate)}`
                  : startDate
                  ? `${formatDate(startDate)} — Select end date`
                  : 'Select your dates'}
              </Text>
            </View>

            {/* Apply Dates Button */}
            <Pressable
              style={[
                styles.applyButton,
                (!startDate || !endDate) &&
                  styles.disabledButton,
              ]}
              onPress={handleApply}
              disabled={!startDate || !endDate}
            >
              <Text style={styles.applyButtonText}>
                Apply Dates
              </Text>
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
    gap: 20,
  },

  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
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
    borderRadius: 100,
    backgroundColor: '#F6F5F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendar: {
    width: '100%',
  },

  weekRow: {
    flexDirection: 'row',
    height: 26,
  },

  weekDay: {
    width: '14.2857%',
    alignItems: 'center',
  },

  weekDayText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#6F7280',
  },

  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayContainer: {
    width: '14.2857%',
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayCircle: {
    width: 37,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#101828',
  },

  // Light green background between selected dates
  rangeDay: {
    backgroundColor: 'rgba(184, 242, 58, 0.25)',
  },

  rangeStart: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },

  rangeEnd: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },

  // Dark circle for start and end dates
  selectedCircle: {
    backgroundColor: '#101828',
  },

  selectedDayText: {
    color: '#FFFFFF',
  },

  summaryContainer: {
    borderTopWidth: 0.8,
    borderTopColor: '#E5E5E0',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  daysText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  dateRangeText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  applyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  applyButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});