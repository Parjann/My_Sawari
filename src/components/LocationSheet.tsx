import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface LocationSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

interface PlacePrediction {
  placeId: string;
  primaryText: string;
  secondaryText?: string;
  fullText: string;
}

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function LocationSheet({
  visible,
  onClose,
  onSelectLocation,
}: LocationSheetProps) {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Search locations when the user types
  useEffect(() => {
    if (searchText.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchLocations(searchText);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const searchLocations = async (query: string) => {
    if (!GOOGLE_API_KEY) {
      console.log('Google Maps API key is missing');
      return;
    }

    try {
      setIsSearching(true);

      const response = await fetch(
        'https://places.googleapis.com/v1/places:autocomplete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask':
              'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat',
          },
          body: JSON.stringify({
            input: query,
            languageCode: 'en',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log('Google Places API error:', data);
        setSuggestions([]);
        return;
      }

      const places: PlacePrediction[] =
        data.suggestions
          ?.filter((item: any) => item.placePrediction)
          .map((item: any) => {
            const prediction = item.placePrediction;

            return {
              placeId: prediction.placeId || '',
              primaryText:
                prediction.structuredFormat?.mainText?.text ||
                prediction.text?.text ||
                '',
              secondaryText:
                prediction.structuredFormat?.secondaryText?.text || '',
              fullText: prediction.text?.text || '',
            };
          }) || [];

      setSuggestions(places);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Get the user's real GPS location
  const handleCurrentLocation = async () => {
    try {
      setIsGettingLocation(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location permission required',
          'Please allow location access to use your current location.'
        );
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const { latitude, longitude } = currentLocation.coords;

      // Convert GPS coordinates into an address
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];

        // Prefer city, then district, then region
        const locationName =
          address.city ||
          address.district ||
          address.subregion ||
          address.region ||
          'Current location';

        onSelectLocation(locationName);
      } else {
        onSelectLocation('Current location');
      }
    } catch (error) {
      console.error('Error getting current location:', error);

      Alert.alert(
        'Unable to get location',
        'Please check your location settings and try again.'
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSelectLocation = (location: PlacePrediction) => {
    onSelectLocation(location.fullText || location.primaryText);
    setSearchText('');
    setSuggestions([]);
  };

  const handleClose = () => {
    setSearchText('');
    setSuggestions([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Pickup location</Text>

              <Pressable
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Feather name="x" size={20} color="#101828" />
              </Pressable>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color="#6F7280"
              />

              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search city or location"
                placeholderTextColor="#6F7280"
                style={styles.searchInput}
                autoCorrect={false}
              />

              {isSearching && (
                <ActivityIndicator size="small" color="#101828" />
              )}

              {searchText.length > 0 && !isSearching && (
                <Pressable
                  onPress={() => {
                    setSearchText('');
                    setSuggestions([]);
                  }}
                >
                  <Feather name="x" size={18} color="#6F7280" />
                </Pressable>
              )}
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              {/* Search Results */}
              {searchText.length >= 2 ? (
                <View>
                  {suggestions.map((location) => (
                    <Pressable
                      key={location.placeId || location.fullText}
                      style={styles.locationRow}
                      onPress={() => handleSelectLocation(location)}
                    >
                      <Feather
                        name="map-pin"
                        size={20}
                        color="#101828"
                      />

                      <View style={styles.locationTextContainer}>
                        <Text style={styles.locationName}>
                          {location.primaryText}
                        </Text>

                        {!!location.secondaryText && (
                          <Text style={styles.locationAddress}>
                            {location.secondaryText}
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  ))}

                  {!isSearching &&
                    suggestions.length === 0 &&
                    searchText.length >= 2 && (
                      <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>
                          No locations found
                        </Text>
                      </View>
                    )}
                </View>
              ) : (
                <>
                  {/* Current Location */}
                  <Pressable
                    style={styles.currentLocationButton}
                    onPress={handleCurrentLocation}
                    disabled={isGettingLocation}
                  >
                    <View style={styles.currentLocationIcon}>
                      {isGettingLocation ? (
                        <ActivityIndicator
                          size="small"
                          color="#101828"
                        />
                      ) : (
                        <Feather
                          name="crosshair"
                          size={22}
                          color="#101828"
                        />
                      )}
                    </View>

                    <Text style={styles.currentLocationText}>
                      {isGettingLocation
                        ? 'Getting your location...'
                        : 'Use current location'}
                    </Text>
                  </Pressable>

                  {/* Recent */}
                  <Text style={styles.sectionTitle}>Recent</Text>

                  <LocationRow
                    name="Bikaner"
                    active
                    onPress={() => onSelectLocation('Bikaner')}
                  />

                  <LocationRow
                    name="Jaipur"
                    onPress={() => onSelectLocation('Jaipur')}
                  />

                  {/* Popular Locations */}
                  <Text style={styles.sectionTitle}>
                    Popular locations
                  </Text>

                  <LocationRow
                    name="Bikaner"
                    active
                    onPress={() => onSelectLocation('Bikaner')}
                  />

                  <LocationRow
                    name="Delhi"
                    onPress={() => onSelectLocation('Delhi')}
                  />

                  <LocationRow
                    name="Jodhpur"
                    onPress={() => onSelectLocation('Jodhpur')}
                  />

                  <LocationRow
                    name="Udaipur"
                    onPress={() => onSelectLocation('Udaipur')}
                  />

                  <LocationRow
                    name="Ajmer"
                    onPress={() => onSelectLocation('Ajmer')}
                    last
                  />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

interface LocationRowProps {
  name: string;
  active?: boolean;
  last?: boolean;
  onPress: () => void;
}

function LocationRow({
  name,
  active = false,
  last = false,
  onPress,
}: LocationRowProps) {
  return (
    <Pressable
      style={[styles.locationRow, last && styles.lastRow]}
      onPress={onPress}
    >
      <Feather
        name="map-pin"
        size={20}
        color={active ? '#101828' : '#6F7280'}
      />

      <Text style={styles.locationName}>{name}</Text>

      {active && <View style={styles.greenDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16, 24, 40, 0.25)',
  },

  sheet: {
    height: '78%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },

  handleContainer: {
    height: 22,
    paddingTop: 12,
    alignItems: 'center',
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#E5E5E0',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.6,
    color: '#101828',
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F6F5F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    height: 49,
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F6F5F1',
    borderWidth: 0.5,
    borderColor: '#E5E5E0',
    borderRadius: 16,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: '#101828',
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 30,
  },

  currentLocationButton: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 14,
  },

  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(184, 242, 58, 0.25)',
  },

  currentLocationText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#101828',
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  locationRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E5E5E0',
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  locationTextContainer: {
    flex: 1,
  },

  locationName: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#101828',
  },

  locationAddress: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: '#6F7280',
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#B8F23A',
  },

  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#6F7280',
  },
});