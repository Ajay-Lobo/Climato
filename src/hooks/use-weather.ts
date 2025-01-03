import type { Coordinates } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "@/api/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coordinates: Coordinates) => ["forecast", coordinates] as const,
    reverseGeocode: (coordinates: Coordinates) => ["reverseGeocode", coordinates] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getWeatherData(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForeCastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getForecastData(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: ["reverseGeocode", coordinates],
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}
