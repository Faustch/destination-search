import React from 'react';
import { Hotel, HotelPrice} from '../services/api';
import { on } from 'events';

interface HotelCardProps{
    hotel: Hotel & { price?: HotelPrice };
    onSelect: ()=> void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect}) => {
    const imageUrl = hotel.image_details
        ? `${hotel.image_details.prefix}original${hotel.image_details.suffix}`
        : '';

    return (
        <div className="hotel-card" onClick={onSelect}>
            <div className="hotel-image">
                {imageUrl && <img src={imageUrl} alt={hotel.name} />}
            </div>
            <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <div className="rating">{'*'.repeat(hotel.rating)}</div>
                <p className="address">{hotel.address}</p>
                <div className="amenities">
                    {hotel.amenities.slice(0,3).map(amenity => (
                        <span key={amenity}>{amenity}</span>
                    ))}
                </div>
            </div>
            <div className="hotel-price">
                {hotel.price && (
                    <>
                    <div className="price">${hotel.price.price}</div>
                    <button className="view-button">View Details</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default HotelCard;