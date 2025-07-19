import React, { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import destinationsData from '../destinations.json';
import { Destination } from '../types/destination';

let debounceTimer: NodeJS.Timeout;

interface DestinationDropdownProps {
  onSelect: (destination: Destination) => void;
  selectedDestination: Destination | null;
}

export const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  onSelect,
  selectedDestination,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Destination[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fuse = new Fuse(destinationsData, {
    keys: ['term'],
    threshold: 0.4,
    ignoreLocation: true,
    includeScore: true,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (value.trim() === '') {
        setResults([]);
      } else {
        const matches = fuse.search(value, { limit: 10 }).map((result) => result.item);
        setResults(matches);
      }
    }, 300);
  };

  const handleSelect = (destination: Destination) => {
    onSelect(destination);
    setInputValue(destination.term);
    setIsOpen(false);
  };

  return (
    <div className="destination-dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={selectedDestination?.term || inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Search destinations..."
        className="dropdown-input"
      />

      {isOpen && (
        <div className="dropdown-menu">
          {results.length === 0 ? (
            <div className="dropdown-item no-results">No destinations found</div>
          ) : (
            results.map((destination) => (
              <div
                key={destination.uid}
                className="dropdown-item"
                onClick={() => handleSelect(destination)}
              >
                {destination.term}
                {destination.state && `, ${destination.state}`}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
