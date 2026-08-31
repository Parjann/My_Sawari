import { StyleSheet, Text, View } from 'react-native';

export default function PopularCarsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular near you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },

  title: {
    fontFamily: 'Manrope',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },
});