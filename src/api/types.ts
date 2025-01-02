export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherConditions[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };

  name: string;
  dt: number;
}

export interface ForecastData {
    list:Array<{
    dt: number;
    main:WeatherData['main'];
    weather:WeatherData['weather'];
    wind:WeatherData['wind'];
    dt_txt:string;
    }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
 
}

export interface ReverseGeocodeData {
    name:string;
    country:string;
    lat:number;
    lon:number;
    local_names?:Record<string,string>;
    state?:string;
}