import { Feather } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface NotificationsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationsSheet({
  visible,
  onClose,
}: NotificationsSheetProps) {
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
            <Text style={styles.title}>Notifications</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={18} color="#101828" />
            </Pressable>
          </View>

          {/* Content - Empty State */}
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Feather name="bell-off" size={32} color="#101828" />
            </View>

            <Text style={styles.emptyTitle}>No notifications right now</Text>

            <Text style={styles.emptySubtitle}>
              We'll notify you about your upcoming trips, booking status updates,
              and special offers here.
            </Text>

            <Pressable style={styles.gotItButton} onPress={onClose}>
              <Text style={styles.gotItText}>Got it</Text>
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
    paddingBottom: 36,
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

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 12,
    alignItems: 'center',
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F3F7E8',
    borderWidth: 1.5,
    borderColor: '#B8F23A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
    textAlign: 'center',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    lineHeight: 22,
    color: '#6F7280',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 12,
  },

  gotItButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#101828',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gotItText: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
