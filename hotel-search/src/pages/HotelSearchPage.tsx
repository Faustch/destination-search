import React, { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm';
import { useNavigate } from 'react-router-dom';
import {searchHotelPrices, getHotelsByDestination, HotelPrice, Hotel} from '../services/api';


interface SearchResults {
  prices: HotelPrice[];
  hotels: Hotel[];
}

const HotelSearchPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (searchParams: {
        destination_id: string; //uid from the destination
        checkin: string;
        checkout: string;
        guests: string;   
    }) => {
        setIsLoading(true);
        setError('');

        try{
            //fetch prices and hotel data in parallel
            const [prices, hotels] = await Promise.all([
                searchHotelPrices(searchParams),
                getHotelsByDestination(searchParams.destination_id)
            ]);

            //combine the data
            const results: SearchResults = {
                prices,
                hotels
            };

            //redirect to results page with combined data
            navigate('/results', {
                state: {
                    searchParams,
                    results
                }
            });
        } catch(err){
            setError('Failed to search for hotels. Please try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="hotel-search-page">
            <h1>Find Your Perfect Hotel</h1>
            <HotelSearchForm onSearch={handleSearch} />
            {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default HotelSearchPage;