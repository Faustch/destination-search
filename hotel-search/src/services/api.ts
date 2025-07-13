import axios from 'axios';

const API_BASE_URL = "https://hotelapi.loyalty.dev/api";

export interface Destination {
  term: string;
  uid: string;
  lat: number;
  lng: number;
  type: string;
  state?: string;
  country?: string;
}

export interface HotelPrice{
    id: string;
    searchRank: number;
    price: number;
    market_rates?: Record<string, number>;
}

export interface Hotel{
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  categories: string[];
  description: string;
  amenities: string[];
  image_details: {
    suffix: string;
    count: number;
    prefix: string;
  };
}

export interface DetailedHotelPrice {
    key: string;
    roomType: string;
    freeCancellation: boolean;
    description: string;
    longDescription: string;
    images: string[];
    amenities: string[];
    price: number;
    marketRates: Record<string, number>;
}

export interface DetailedHotel extends Hotel{
    rooms: DetailedHotelPrice[];
}

//API Methods
export const searchDestinations = async (query: string): Promise<Destination[]> =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/hotels/destinations`,
        {
            params: {
                query: encodeURIComponent(query),
                lang:'en_US'
            },
            timeout: 5000
        });
        return response.data;
    } catch (error){
        console.error('Destination search error:', error);
        throw new Error('Failed to fetch destinations. Please try again');
    }
    
}

export const searchHotelPrices = async (params: {
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
    lang?: string;
    currency?: string;
    country_code?: string;
    partner_id?: number;
}): Promise<HotelPrice[]> => {
    const response = await axios.get(`${API_BASE_URL}/hotels/prices`, {
        params: {
        lang: 'en_US',
        currency:'SGD',
        country_code: 'SG',
        partner_id: 1,
        ...params
    }
    });
    return response.data;
    
};

export const getHotelsByDestination = async (destinationId: string): Promise<Hotel[]> => {
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
        params: { destination_id: destinationId }
    });
    return response.data;
};  


export const getHotelDetails = async (hotelId: string): Promise<DetailedHotel> => {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
    return response.data;
};

export const getHotelPrices = async (
    hotelId: string,
    params:{
        destination_id: string,
        checkin: string;
        checkout: string;
        guests: string;
        lang?: string;
        currency?: string;
        country_code?: string;
        partner_id?: number;
    }
): Promise<DetailedHotelPrice[]> => {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}/prices`, {
        params: {
            lang: 'en_US',
            currency: 'SGD',
            country_code: 'SG',
            partner_id: 1,
            ...params
        }
    });
    return response.data;
};