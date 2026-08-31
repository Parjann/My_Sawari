import { Car, cars, CategoryType } from '@/data/cars';

export function getAllCars(): Car[] {
  return cars;
}

export function getCarsInLocation(location: string): Car[] {
  return cars.filter((car) => car.location === location);
}

export function getAvailableCars(): Car[] {
  return cars.filter((car) => car.available);
}

export function getCarsByPriceRange(
  minPrice: number,
  maxPrice: number
): Car[] {
  return cars.filter(
    (car) => car.pricePerDay >= minPrice && car.pricePerDay <= maxPrice
  );
}

export function searchCars(query: string): Car[] {
  const lowerQuery = query.toLowerCase();
  return cars.filter(
    (car) =>
      car.name.toLowerCase().includes(lowerQuery) ||
      car.category.toLowerCase().includes(lowerQuery) ||
      car.location.toLowerCase().includes(lowerQuery)
  );
}

export function getCarsByCategory(category: CategoryType): Car[] {
  return category === 'All'
    ? cars
    : cars.filter((car) => car.category === category);
}

export function getPopularCars(limit: number = 6): Car[] {
  return [...cars]
    .sort((a, b) => (b.trips || 0) - (a.trips || 0))
    .slice(0, limit);
}

export function getTopRatedCars(limit: number = 6): Car[] {
  return [...cars]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export type CarFilter = {
  category?: CategoryType;
  location?: string;
  priceRange?: [number, number];
  minRating?: number;
  transmission?: 'Automatic' | 'Manual';
  fuel?: 'Petrol' | 'Diesel' | 'Hybrid';
};

export function filterCars(filters: CarFilter): Car[] {
  return cars.filter((car) => {
    if (
      filters.category &&
      filters.category !== 'All' &&
      car.category !== filters.category
    ) {
      return false;
    }

    if (filters.location && car.location !== filters.location) {
      return false;
    }

    if (
      filters.priceRange &&
      (car.pricePerDay < filters.priceRange[0] ||
        car.pricePerDay > filters.priceRange[1])
    ) {
      return false;
    }

    if (
      filters.minRating &&
      (!car.rating || car.rating < filters.minRating)
    ) {
      return false;
    }

    if (
      filters.transmission &&
      car.transmission !== filters.transmission
    ) {
      return false;
    }

    if (filters.fuel && car.fuel !== filters.fuel) {
      return false;
    }

    return true;
  });
}
