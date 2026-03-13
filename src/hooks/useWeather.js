"use client";
import { useState, useCallback } from "react";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?action=forecast&q=${encodeURIComponent(query)}&days=7`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch weather");
      }
      const data = await res.json();
      setWeather(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) return [];
    try {
      const res = await fetch(`/api/weather?action=search&q=${encodeURIComponent(query)}`);
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  }, []);

  const fetchCityWeather = useCallback(async (city) => {
    try {
      const res = await fetch(`/api/weather?action=current&q=${encodeURIComponent(city)}`);
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }, []);

  return { weather, loading, error, loadWeather, searchCities, fetchCityWeather };
}
