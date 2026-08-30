import { Compass, House, Ticket } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Tab = 'home' | 'explore' | 'bookings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNav({
  activeTab,
  onTabChange,
}: BottomNavProps) {
  const isActive = (tab: Tab) => activeTab === tab;

  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        
        {/* Home */}
        <Pressable
          style={styles.navButton}
          onPress={() => onTabChange('home')}
        >
          <House
            size={24}
            color={isActive('home') ? '#101828' : '#6F7280'}
            strokeWidth={1.5}
          />
          <Text
            style={[
              styles.label,
              isActive('home') && styles.activeLabel,
            ]}
          >
            Home
          </Text>
        </Pressable>

        {/* Explore */}
        <Pressable
          style={styles.navButton}
          onPress={() => onTabChange('explore')}
        >
          <Compass
            size={24}
            color={isActive('explore') ? '#101828' : '#6F7280'}
            strokeWidth={1.5}
          />
          <Text
            style={[
              styles.label,
              isActive('explore') && styles.activeLabel,
            ]}
          >
            Explore
          </Text>
        </Pressable>

        {/* Bookings */}
        <Pressable
          style={styles.navButton}
          onPress={() => onTabChange('bookings')}
        >
          <Ticket
            size={24}
            color={isActive('bookings') ? '#101828' : '#6F7280'}
            strokeWidth={1.5}
          />
          <Text
            style={[
              styles.label,
              isActive('bookings') && styles.activeLabel,
            ]}
          >
            Bookings
          </Text>
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