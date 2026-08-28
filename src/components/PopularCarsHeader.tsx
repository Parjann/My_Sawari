import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PopularCarsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular near you</Text>

      <Pressable hitSlop={8}>
        <Text style={styles.viewAll}>View all</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 27,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  viewAll: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#356AE6',
  },
});