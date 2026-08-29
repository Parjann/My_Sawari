import AvailableCars from '@/components/AvailableCars';
import AvailableCarsHeader from '@/components/AvailableCarsHeader';
import { SearchData } from '@/components/SearchCarsSheet';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AvailableCarsScreenProps {
  searchData: SearchData;
  onEdit: () => void;
  onViewCarDetails: (carName: string) => void;
}

export default function AvailableCarsScreen({
  searchData,
  onEdit,
  onViewCarDetails,
}: AvailableCarsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AvailableCarsHeader
        location={searchData.location}
        dates={searchData.dates}
        drivingOption={searchData.drivingOption}
        onEdit={onEdit}
        onFilter={() => console.log('Filter pressed')}
        onSort={() => console.log('Sort pressed')}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AvailableCars onViewCarDetails={onViewCarDetails} />
      </ScrollView>
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

  scrollContent: {
    paddingBottom: 24,
  },
});