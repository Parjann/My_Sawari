import { Compass, House, Ticket } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        
        {/* Home */}
        <Pressable style={styles.navButton}>
          <House size={24} color="#101828" strokeWidth={1.5} />
          <Text style={[styles.label, styles.activeLabel]}>Home</Text>
        </Pressable>

        {/* Explore */}
        <Pressable style={styles.navButton}>
          <Compass size={24} color="#6F7280" strokeWidth={1.5} />
          <Text style={styles.label}>Explore</Text>
        </Pressable>

        {/* Bookings */}
        <Pressable style={styles.navButton}>
          <Ticket size={24} color="#6F7280" strokeWidth={1.5} />
          <Text style={styles.label}>Bookings</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 84,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E4E7EC',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 59,
  },

  navButton: {
    flex: 1,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 4,
  },

  label: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  activeLabel: {
    color: '#101828',
  },
});