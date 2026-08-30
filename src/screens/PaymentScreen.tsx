import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import PaymentProcessing from '@/components/PaymentProcessing';

interface PaymentScreenProps {
  carName: string;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function PaymentScreen({
  carName,
  onBack,
  onPaymentSuccess,
}: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('upi');

  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: {
    id: PaymentMethod;
    title: string;
    subtitle: string;
  }[] = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay by any UPI app',
    },
    {
      id: 'card',
      title: 'Card',
      subtitle: 'Credit or debit card',
    },
    {
      id: 'netbanking',
      title: 'Net banking',
      subtitle: 'All major banks',
    },
  ];

  /* =========================================
     PAYMENT PROCESSING → SUCCESS
  ========================================= */

  useEffect(() => {
    if (!isProcessing) return;

    // Show the processing animation for 3 seconds
    const paymentTimer = setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 3000);

    return () => clearTimeout(paymentTimer);
  }, [isProcessing, onPaymentSuccess]);

  /* =========================================
     PAYMENT PROCESSING SCREEN
  ========================================= */

  if (isProcessing) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['top', 'bottom']}
      >
        <View style={styles.processingScreen}>
          <PaymentProcessing />
        </View>
      </SafeAreaView>
    );
  }

  /* =========================================
     PAYMENT SCREEN
  ========================================= */

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={onBack}
          >
            <Feather
              name="arrow-left"
              size={20}
              color="#101828"
            />
          </Pressable>

          <Text style={styles.headerTitle}>Payment</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Pay today
          </Text>

          <Text style={styles.summaryPrice}>
            ₹7,700
          </Text>

          <Text style={styles.summaryMeta}>
            {carName} · 17 Aug–20 Aug · Self Drive
          </Text>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>
          Payment method
        </Text>

        <View style={styles.methodsList}>
          {paymentMethods.map((method) => {
            const isSelected =
              selectedMethod === method.id;

            const iconName:
              | 'credit-card'
              | 'briefcase'
              | 'smartphone' =
              method.id === 'card'
                ? 'credit-card'
                : method.id === 'netbanking'
                ? 'briefcase'
                : 'smartphone';

            return (
              <Pressable
                key={method.id}
                style={[
                  styles.methodRow,
                  isSelected && styles.methodRowSelected,
                ]}
                onPress={() =>
                  setSelectedMethod(method.id)
                }
              >
                <Feather
                  name={iconName}
                  size={22}
                  color="#101828"
                />

                <View style={styles.methodTextWrap}>
                  <Text style={styles.methodTitle}>
                    {method.title}
                  </Text>

                  <Text style={styles.methodSubtitle}>
                    {method.subtitle}
                  </Text>
                </View>

                {/* Radio Button */}
                <View
                  style={[
                    styles.radio,
                    isSelected && styles.radioSelected,
                  ]}
                >
                  {isSelected && (
                    <Feather
                      name="check"
                      size={14}
                      color="#101828"
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Security Message */}
        <View style={styles.securityRow}>
          <Feather
            name="check-circle"
            size={16}
            color="#2E9B62"
          />

          <Text style={styles.securityText}>
            Secure payment · Deposit refunded after return
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <Pressable
          style={styles.payButton}
          onPress={() => {
            console.log('Payment initiated');
            setIsProcessing(true);
          }}
        >
          <Text style={styles.payButtonText}>
            Pay ₹7,700
          </Text>

          <Feather
            name="arrow-right"
            size={19}
            color="#101828"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F3',
  },

  /* =========================================
     PAYMENT PROCESSING
  ========================================= */

  processingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* =========================================
     SCROLL CONTENT
  ========================================= */

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },

  /* =========================================
     HEADER
  ========================================= */

  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#101828',
  },

  /* =========================================
     PAYMENT SUMMARY
  ========================================= */

  summaryCard: {
    height: 130,
    backgroundColor: '#101828',
    borderRadius: 24,
    padding: 20,
  },

  summaryLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  },

  summaryPrice: {
    marginTop: 4,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.85,
    color: '#FFFFFF',
  },

  summaryMeta: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
  },

  /* =========================================
     PAYMENT METHODS
  ========================================= */

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  methodsList: {
    gap: 12,
  },

  methodRow: {
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  methodRowSelected: {
    backgroundColor: 'rgba(184, 242, 58, 0.25)',
    borderColor: '#101828',
  },

  methodTextWrap: {
    flex: 1,
  },

  methodTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  methodSubtitle: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    color: '#6F7280',
  },

  /* Radio Button */

  radio: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 0.8,
    borderColor: '#E5E5E0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    backgroundColor: '#B8F23A',
    borderColor: '#101828',
  },

  /* =========================================
     SECURITY MESSAGE
  ========================================= */

  securityRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  securityText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    color: '#6F7280',
  },

  /* =========================================
     FIXED FOOTER
  ========================================= */

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#F7F7F3',
  },

  payButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#B8F23A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  payButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#101828',
  },
});