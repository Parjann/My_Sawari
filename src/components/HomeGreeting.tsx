import { StyleSheet, Text, View } from 'react-native';

export default function HomeGreeting() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good morning, Jatin</Text>

      <Text style={styles.heading}>
        Where are you{'\n'}going next?
      </Text>

      <Text style={styles.subtitle}>
        Find a car that fits your journey.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 24,
    gap: 4,
  },

  greeting: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  heading: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: '#101828',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    letterSpacing: -0.16,
    color: '#6F7280',
  },
});