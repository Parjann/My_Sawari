import { Feather } from '@expo/vector-icons';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface DriverChargesInfoProps {
  visible: boolean;
  onClose: () => void;
}

export default function DriverChargesInfo({
  visible,
  onClose,
}: DriverChargesInfoProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Driver charges</Text>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={10}
            >
              <Feather
                name="x"
                size={22}
                color="#6F7280"
              />
            </Pressable>
          </View>

          {/* Message */}
          <Text style={styles.message}>
            Driver charges are calculated based on the rental duration and
            applicable service conditions.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
    paddingHorizontal: 24,
  },

  container: {
    width: '100%',
    maxWidth: 345,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    gap: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  closeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },
});