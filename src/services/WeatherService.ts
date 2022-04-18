import { AxiosResponse } from 'axios';
import api from '../axios';
import { hourlyWeatherData, Weather } from '../store/types/types';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?q=${city}`);
  }
  static getHourlyWeather(lat: number, lon: number): Promise<AxiosResponse<hourlyWeatherData>> {
    return api.get<hourlyWeatherData>(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily`);
  }
}