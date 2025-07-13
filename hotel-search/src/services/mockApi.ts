// src/services/mockApi.ts
import { Destination } from './api';

const mockDestinations: Destination[] = [
  {
    term: "Rome, Italy",
    uid: "A6Dz",
    lat: 41.895466,
    lng: 12.482324,
    type: "city",
    state: "Lazio"
  },
  {
    term: "Singapore, Singapore",
    uid: "SG123",
    lat: 1.3521,
    lng: 103.8198,
    type: "city",
    country: "Singapore"
  }
  // Add more mock destinations as needed
];

export const mockSearchDestinations = async (query: string): Promise<Destination[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        mockDestinations.filter(dest =>
          dest.term.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300);
  });
};