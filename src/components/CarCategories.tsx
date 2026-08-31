import { categories, CategoryType } from '@/data/cars';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CarCategoriesProps {
  selectedCategory?: CategoryType;
  onCategoryChange?: (category: CategoryType) => void;
}

export default function CarCategories({
  selectedCategory = 'All',
  onCategoryChange,
}: CarCategoriesProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <TouchableOpacity
            key={category}
            onPress={() => onCategoryChange?.(category)}
            style={[
              styles.categoryButton,
              isActive && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                isActive && styles.activeText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 8,
  },

  categoryButton: {
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },

  activeButton: {
    borderBottomWidth: 1.6,
    borderBottomColor: '#101828',
  },

  categoryText: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.16,
    color: '#6F7280',
  },

  activeText: {
    fontWeight: '700',
    color: '#101828',
  },
});