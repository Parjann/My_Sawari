import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function PaymentProcessing() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Animated loading circle */}
      <View style={styles.loaderContainer}>
        {/* Light background circle */}
        <View style={styles.backgroundCircle} />

        {/* Rotating dark circle */}
        <Animated.View
          style={[
            styles.spinner,
            {
              transform: [{ rotate }],
            },
          ]}
        />

        {/* Lock icon */}
        <View style={styles.lockContainer}>
          <Feather
            name="lock"
            size={26}
            color="#101828"
          />
        </View>
      </View>

      <Text style={styles.title}>
        Confirming your payment
      </Text>

      <Text style={styles.subtitle}>
        This usually takes a few seconds.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 236,
    alignItems: 'center',
  },

  loaderContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#E5E7EB',
  },

  spinner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,

    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#101828',
    borderRightColor: '#101828',
  },

  lockContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 24,
    width: 236,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#101828',
  },

  subtitle: {
    marginTop: 6,
    width: 208,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: -0.16,
    textAlign: 'center',
    color: '#6F7280',
  },
});