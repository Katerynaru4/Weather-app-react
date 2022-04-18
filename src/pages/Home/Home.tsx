import { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/store';
import { selectCurrentWeatherData } from '../../store/selectors';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import { CardComponent } from './components/Card/Card';
import { Box } from '@mui/material';
import { storage } from '../../model/Storage';
import { useDispatch } from 'react-redux';
import { CityInput } from './components/CityInput/CityInput';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { citiesWeather } = useCustomSelector(selectCurrentWeatherData);
  const [inputValue, setInputValue] = useState<string>('');

  function addCityToList() {
    if (citiesWeather.some(city => city.name.includes(inputValue))) return;
    dispatch(fetchCurrentWeather(inputValue));
    setInputValue('');
  }

  useEffect(() => {
    storage.getItem('citiesList').map((city: string) => dispatch(fetchCurrentWeather(city)))
  }, [dispatch]);

  return (
    <Box sx={{
      p: 1,
    }}>
      <CityInput {...{ inputValue, setInputValue, addCityToList }} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          m: 1,
        }}
      >
        {citiesWeather.map(city => <CardComponent {...{ ...city }} key={city.name} />
        )}
      </Box>
    </Box>
  );
};
