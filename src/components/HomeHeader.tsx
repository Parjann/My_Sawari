import NotificationsSheet from '@/components/NotificationsSheet';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeHeader() {
  const insets = useSafeAreaInsets();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <View style={[styles.container, { marginTop: insets.top + 12 }]}>
        <View style={styles.brandRow}>
          <Image
            source={require('@/assets/images/app-logo.png')}
            style={styles.logoIcon}
          />
          <Text style={styles.logo}>My Sawari</Text>
        </View>

        <Pressable
          style={styles.notificationButton}
          onPress={() => setIsNotificationsOpen(true)}
        >
          <Feather name="bell" size={19} color="#101828" />
        </Pressable>
      </View>

      <NotificationsSheet
        visible={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
  },

  logo: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#101828',
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E7EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});