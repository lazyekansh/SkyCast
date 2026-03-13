"use client";
import { useState, useEffect, useRef } from "react";
import { notifyLocationAccess } from "@/utils/notify";

export default function SearchBar({ onSearch, onSearchCities }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (value) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await onSearchCities(value);
      setSuggestions(results || []);
      setShowSuggestions(true);
    }, 300);
  };

  const handleSelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(city.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query.trim());
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const q = `${latitude},${longitude}`;
        setQuery("My Location");
        onSearch(q);
        notifyLocationAccess(latitude, longitude);
      },
      () => {
        setQuery("Location unavailable");
      }
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center glass-card rounded-2xl px-4 py-3 gap-3 shadow-lg border border-white/20">
          <button
            type="button"
            onClick={handleLocate}
            className="text-white/70 hover:text-white transition-colors shrink-0"
            aria-label="Use my location"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Search city or zip code..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-base"
          />
          <button
            type="submit"
            className="text-white/70 hover:text-white transition-colors shrink-0"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl overflow-hidden shadow-xl z-50 border border-white/20">
          {suggestions.map((city, i) => (
            <button
              key={i}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left text-white/90 hover:bg-white/15 transition-colors flex items-center gap-3 border-b border-white/10 last:border-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <span className="font-medium">{city.name}</span>
                {city.region && <span className="text-white/50 text-sm ml-1">{city.region}, {city.country}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
