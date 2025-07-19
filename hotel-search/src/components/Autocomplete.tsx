import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import destinations from '../destinations.json';
import './Autocomplete.css';

type Destination = {
  term: string;
  uid: string;
  lat: number;
  lng: number;
  type: string;
  state?: string;
};

interface AutocompleteProps {
  onSelect: (destination: Destination) => void;
}

export default function Autocomplete({ onSelect }: AutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Destination[]>([]);

  const fuse = new Fuse(destinations, {
    keys: ['term'],
    includeScore: true,
    threshold: 0.5,
    ignoreLocation: true,
  });

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(query, { limit: 5 });
    setSuggestions(results.map((result) => result.item));
  }, [query]);

  const handleSelect = (destination: Destination) => {
    setQuery(destination.term);
    setSuggestions([]);
    onSelect(destination); // Notify parent
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={query}
        placeholder="Search destination..."
        onChange={(e) => setQuery(e.target.value)}
        className="autocomplete-input"
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((item) => (
            <li key={item.uid} onClick={() => handleSelect(item)}>
              {item.term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}