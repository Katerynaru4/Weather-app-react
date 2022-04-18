import { WeatherService } from '../../services/WeatherService';
import { currentWeatherSlice } from '../slices/currentWeatherSlice';
import { AppDispatch } from '../store';
import { storage } from '../../model/Storage';

export const fetchCurrentWeather =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeatherSlice.actions.fetchWeatherAction());
      const res = await WeatherService.getCurrentWeather(payload);
      if (res.status === 200) {
        const previousState = storage.getItem('citiesList')
        if (!previousState.includes(payload)) {
          storage.setItem('citiesList', previousState.concat(res.data.name));
        }
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(res));
        dispatch(currentWeatherSlice.actions.fetchCitiesWeatherSuccess(res));
      } else {
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(res));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const fetchHourlyWeather =
  (lat: number, lon: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeatherSlice.actions.fetchWeatherAction());
      const res = await WeatherService.getHourlyWeather(lat, lon);
      if (res.status === 200) {
        dispatch(currentWeatherSlice.actions.fetchHourlyWeatherSucces(res));
      } else {
        dispatch(currentWeatherSlice.actions.fetchHourlyWeatherError(res));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const removeCityWeather = (payload: string) => (dispatch: AppDispatch) => {
  dispatch(currentWeatherSlice.actions.removeCityAction(payload))
}