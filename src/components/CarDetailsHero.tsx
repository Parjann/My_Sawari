import { Feather } from '@expo/vector-icons';

import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

interface CarDetailsHeroProps {
  image: ImageSourcePropType;
  onBack: () => void;
  onShare?: () => void;
}

export default function CarDetailsHero({
  image,
  onBack,
  onShare,
}: CarDetailsHeroProps) {
  return (
    <View style={styles.container}>
      {/* Car Image */}
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Floating Buttons */}
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onBack}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="#101828"
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={onShare}
        >
          <Feather
            name="share-2"
            size={22}
            color="#101828"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 330,
    backgroundColor: '#E5E5E0',
    position: 'relative',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});