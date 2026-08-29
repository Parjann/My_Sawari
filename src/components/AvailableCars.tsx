import { StyleSheet, Text, View } from 'react-native';
import AvailableCarCard from './AvailableCarCard';

interface AvailableCarsProps {
  onViewCarDetails: (carName: string) => void;
}

export default function AvailableCars({
  onViewCarDetails,
}: AvailableCarsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>2 cars ready</Text>

      <AvailableCarCard
        name="Hyundai Creta"
        type="SUV"
        seats="5"
        transmission="Automatic"
        price="2,500"
        image={require('@/assets/images/cars/verna.png')}
        onViewDetails={() =>
          onViewCarDetails('Hyundai Creta')
        }
      />

      <AvailableCarCard
        name="Mahindra Thar"
        type="Off-road"
        seats="4"
        transmission="Automatic"
        price="2,500"
        image={require('@/assets/images/cars/ford.png')}
        onViewDetails={() =>
          onViewCarDetails('Mahindra Thar')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },

  heading: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
    marginBottom: 28,
  },
});