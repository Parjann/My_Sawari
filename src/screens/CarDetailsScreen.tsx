import CarDetailsHero from '@/components/CarDetailsHero';

import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CarDetailsScreenProps {
  carName: string;
  onBack: () => void;
}

export default function CarDetailsScreen({
  carName,
  onBack,
}: CarDetailsScreenProps) {
  const carImage =
    carName === 'Hyundai Creta'
      ? require('@/assets/images/cars/verna.png')
      : require('@/assets/images/cars/ford.png');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CarDetailsHero
        image={carImage}
        onBack={onBack}
        onShare={() => {
          console.log(`Share ${carName}`);
        }}
      />

      <View style={styles.content}>
        {/* Car details content will go here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F1',
  },

  content: {
    flex: 1,
  },
});