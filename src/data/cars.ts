export interface Car {
  id: string;
  name: string;
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'MUV' | 'Luxury';
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid';
  seats: number;
  pricePerDay: number;
  location: string;
  available: boolean;
  image: any;
  rating?: number;
  trips?: number;
}

export const cars: Car[] = [
  {
    id: 'kia-seltos',
    name: 'Kia Seltos',
    category: 'SUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    pricePerDay: 2500,
    location: 'Bikaner',
    available: true,
    image: require('@/assets/images/cars/kia-seltos.png'),
    rating: 4.8,
    trips: 214,
  },

  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta',
    category: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    pricePerDay: 2500,
    location: 'Bikaner',
    available: true,
    image: require('@/assets/images/cars/hyundai-creta.png'),
    rating: 4.7,
    trips: 189,
  },

  {
    id: 'maruti-ignis',
    name: 'Maruti Ignis',
    category: 'Hatchback',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    pricePerDay: 1800,
    location: 'Jaipur',
    available: true,
    image: require('@/assets/images/cars/maruti-ignis.png'),
    rating: 4.5,
    trips: 156,
  },

  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    category: 'MUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 8,
    pricePerDay: 3500,
    location: 'Delhi',
    available: true,
    image: require('@/assets/images/cars/toyota-innova.png'),
    rating: 4.9,
    trips: 342,
  },

  {
    id: 'hyundai-verna',
    name: 'Hyundai Verna',
    category: 'Sedan',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    pricePerDay: 1500,
    location: 'Mumbai',
    available: true,
    image: require('@/assets/images/cars/verna.png'),
    rating: 4.6,
    trips: 298,
  },

  {
    id: 'ford-ecosport',
    name: 'Ford EcoSport',
    category: 'SUV',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    pricePerDay: 2000,
    location: 'Bangalore',
    available: true,
    image: require('@/assets/images/cars/ford.png'),
    rating: 4.4,
    trips: 127,
  },
];

export const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'MUV', 'Luxury'] as const;

export type CategoryType = typeof categories[number];

export function getCarsByCategory(category: CategoryType): Car[] {
  if (category === 'All') {
    return cars;
  }
  return cars.filter((car) => car.category === category);
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}
