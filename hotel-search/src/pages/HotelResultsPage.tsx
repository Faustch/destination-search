import React, { useState, useEffect, use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Hotel, HotelPrice, getHotelDetails, getHotelPrices, DetailedHotel } from '../services/api';
import HotelCard from '../components/HotelCard';
import HotelDetailsModal from '../components/HotelDetailsModal';

interface LocationState {
  searchParams: {
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
  };
  initialResults: {
    prices: HotelPrice[];
    hotels: Hotel[];
  };
}

const HotelResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams, initialResults } = location.state as LocationState;
  const [hotels, setHotels] = useState<Array<Hotel & {price?: HotelPrice}>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<DetailedHotel | null>(null);

  // Combine hotel details with their prices
  useEffect(() => {
    const combined = initialResults.hotels.map(hotel =>{
      const price = initialResults.prices.find(p => p.id === hotel.id);
      return {
        ...hotel,
        price: price
      };
    });
    setHotels(combined);
  }, [initialResults]);

  const handleHotelSelect = async (hotelId: string) => {
    setLoading(true);
    try {
      const [details, prices] = await Promise.all([
        getHotelDetails(hotelId),
        getHotelPrices(hotelId, searchParams)
      ]);
      setSelectedHotel({ ...details, rooms: prices });
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotel-results-container">
      <div className="search-summary">
        <h2>Search Results</h2>
        <p>
          {hotels.length} hotels found for {searchParams.checkin} to {searchParams.checkout}
        </p>
      </div>

      <div className="results-grid">
        {hotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onSelect={() => handleHotelSelect(hotel.id)}
          />
        ))}
      </div>

      {selectedHotel && (
        <HotelDetailsModal
          hotel={selectedHotel}
          searchParams={searchParams}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default HotelResultsPage;