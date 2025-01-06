import { API_CONFIG } from "./config";
import {
  Coordinates,
  ForecastData,
  WeatherData,
  ReverseGeocodeData,
} from "./types";

class WeatherAPI {
  private createURL(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchWeatherData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  }

  async getWeatherData({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchWeatherData<WeatherData>(url);
  }

  async getForecastData({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchWeatherData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<ReverseGeocodeData[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
    return this.fetchWeatherData<ReverseGeocodeData[]>(url);
  }

  async searchLocations(query: string): Promise<ReverseGeocodeData[]> {
    const url = this.createURL(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });
    return this.fetchWeatherData<ReverseGeocodeData[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
