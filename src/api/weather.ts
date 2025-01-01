import { API_CONFIG } from "./config";
import { Coordinates } from "./types";

class WeatherAPI {
  private createURL(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchWeatherData<T>(url:string):Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  }

  async getWeatherData({lat,lon}:Coordinates):Promise<> {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon:lat.toString(),
      units:API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchWeatherData(url);
  }

  async getForecastData() {}

  async reverseGeocode() {}
}
