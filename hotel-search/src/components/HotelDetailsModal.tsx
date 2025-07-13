import React from 'react';
import {DetailedHotel} from '../services/api';

interface HotelDetailsModalProps{
    hotel: DetailedHotel;
    searchParams:{
        checkin: string;
        checkout: string;
        guests: string;
    };
    onClose: () => void;
}

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({
    hotel,
    searchParams,
    onClose
}) =>{
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>x</button>

                <div className="modal-header">
                    <h2>{hotel.name}</h2>
                    <div className="rating">{'*'.repeat(hotel.rating)}</div>
                </div>

                <div className="image-gallery">
                    {hotel.image_details && (
                        <img
                            src={`${hotel.image_details.prefix}original${hotel.image_details.suffix}`}
                            alt={hotel.name}
                        />
                    )}
                </div>
                <div className="hotel-description">
                    <p>{hotel.description}</p>
                    <div className="amenities">
                        <h4>Amenities:</h4>
                        <div className="amenities-grid">
                            {hotel.amenities.map(amenity => (
                                <span key={amenity}>{amenity}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="room-types">
                    <h3>Available Rooms</h3>
                    {hotel.rooms.map(room =>(
                        <div key={room.key} className="room-card">
                            <h4>{room.roomType}</h4>
                            <p>{room.description}</p>
                            {room.freeCancellation && (
                                <div className="free-cancellation">Free Cancellation</div>
                            )}
                            <div className="room-price">
                                <span className="price">${room.price}</span>
                                <button className="book-button">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsModal;