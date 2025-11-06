export type Unit = 'imperial' | 'metric';

export type Period = 'none' | 'dawn' | 'day' | 'dusk' | 'night';

export type WeatherAPIResponse = {
  weather?: { 
    id: number; 
    main: string; 
    description: string; 
    icon: string 
  }[];
  base?: string;
  main?: { 
    temp: number; 
    feels_like: number; 
    temp_min: number; 
    temp_max: number; 
    pressure: number; 
    humidity: number;
  };
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: { '1h': number };
  snow?: { '1h': number };
  clouds?: { [any: string]: number };
  sys?: {
    sunrise: number;
    sunset: number;
  };
  name?: string;
  dt?: number;
  timezone?: number;
  visibility?: number;
};