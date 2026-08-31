export interface Destination {
  id: string;
  name: string;
  carsAvailable: number;
  priceRange: string;
  popular: boolean;
}

export const destinations: Destination[] = [
  {
    id: 'bikaner',
    name: 'Bikaner',
    carsAvailable: 12,
    priceRange: '₹1,500 - ₹3,500',
    popular: true,
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    carsAvailable: 18,
    priceRange: '₹1,800 - ₹3,500',
    popular: true,
  },
  {
    id: 'delhi',
    name: 'Delhi',
    carsAvailable: 25,
    priceRange: '₹2,000 - ₹4,000',
    popular: true,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    carsAvailable: 20,
    priceRange: '₹1,500 - ₹3,800',
    popular: true,
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    carsAvailable: 15,
    priceRange: '₹1,800 - ₹3,500',
    popular: false,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    carsAvailable: 14,
    priceRange: '₹1,600 - ₹3,200',
    popular: false,
  },
];

export function getPopularDestinations(): Destination[] {
  return destinations.filter((d) => d.popular);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function searchDestinations(query: string): Destination[] {
  const lowerQuery = query.toLowerCase();
  return destinations.filter((dest) =>
    dest.name.toLowerCase().includes(lowerQuery)
  );
}
