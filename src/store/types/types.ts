export type Weather = {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  }
};

export type hourlyWeatherData = {
  current: {
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    wind_speed: number,
  },
  timezone: string,
  hourly: {
    temp: number,
    dew_point: number,
  }[]
}