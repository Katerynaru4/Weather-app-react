import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { storage } from '../../model/Storage';
import { hourlyWeatherData, Weather } from '../types/types';

type CurrentWeather = {
  weather: Weather;
  isLoading: boolean;
  response: Response;
  citiesWeather: Weather[];
  hourlyWeather: hourlyWeatherData;
};

type Response = {
  status: number;
  message: string;
};

const initialState: CurrentWeather = {
  citiesWeather: [],
  hourlyWeather: {
    current: {
      temp: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      wind_speed: 0,
    },
    timezone: '',
    hourly: [{
      temp: 0,
      dew_point: 0,
    }]
  },
  weather: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: 'Kyiv',
    wind: {
      speed: 0,
    },
    coord: {
      lat: 0,
      lon: 0,
    },
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
};

export const currentWeatherSlice = createSlice({
  name: 'current_weather',
  initialState,
  reducers: {
    fetchWeatherAction(state) {
      state.isLoading = true;
    },
    removeCityAction(state, action: PayloadAction<any>) {
      const cityName = action.payload;
      storage.setItem('citiesList', storage.getItem('citiesList').filter((item: string) => item !== cityName));
      state.citiesWeather = state.citiesWeather.filter(city => city.name !== cityName)
    },
    fetchHourlyWeatherSucces(
      state,
      action: PayloadAction<AxiosResponse<hourlyWeatherData>>,
    ) {
      state.isLoading = false;
      state.hourlyWeather = action.payload.data;

      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCitiesWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>,
    ) {
      state.isLoading = false;
      const name = action.payload.data.name;

      let i = state.citiesWeather.length;
      state.citiesWeather.forEach((city, idx) => {
        if (city.name === name) {
          i = idx
        }
      })
      state.citiesWeather[i] = action.payload.data

      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.isLoading = false;
      state.weather = action.payload.data;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchHourlyWeatherError(
      state,
      action: PayloadAction<AxiosResponse<hourlyWeatherData>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default currentWeatherSlice.reducer;
