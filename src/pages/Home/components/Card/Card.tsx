import React, { memo, useCallback } from 'react';
import { fetchCurrentWeather, removeCityWeather } from '../../../../store/thunks/fetchCurrentWeather';
import { Link } from 'react-router-dom';
import { IndicatorSvgSelector } from '../../../../assets/icons/indicators/IndicatorSvgSelector';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Card, CardActions, Typography } from '@mui/material';
import { Weather } from '../../../../store/types/types';
import { useDispatch } from 'react-redux';

const areEqual = (prevProps: any, nextProps: any) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export const CardComponent: React.FC<Weather> = memo(({ ...city }) => {
  const dispatch = useDispatch();

  const onUpdateHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(fetchCurrentWeather(city.name));
  }, [dispatch, city.name])

  const deleteCityFromList = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    dispatch(removeCityWeather(city.name))
  }, [dispatch, city.name])

  const {
    feels_like,
    humidity,
    temp,
  } = city.main;

  const items = [
    {
      icon_id: 'temp',
      value: `${Math.round(temp)}° - feels like ${Math.round(feels_like)}°`,
    },
    {
      icon_id: 'precipitation',
      value: `humidity ${humidity}%`,
    },
    {
      icon_id: 'wind',
      value: `wind ${Math.round(city.wind.speed)} м/с `,
    },
  ];

  return (
    <Link
      to={{
        pathname: `Weather-app/${city.name}`,
        state: { ...city.coord, cityName: city.name }
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        sx={{ minWidth: 275, p: 2, m: 1, }}
        elevation={10}
      >
        <Box sx={{ position: 'relative' }}>
          <HighlightOffIcon
            sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
            onClick={deleteCityFromList}
          />
          <Typography
            variant="h5"
            sx={{ marginBottom: 3 }}
            gutterBottom>
            {city.name}
          </Typography>
          <Box>
            {items.map(({ icon_id, value }) => (
              <Box
                key={icon_id}
                sx={{
                  display: 'flex',
                  marginBottom: '5px',
                  flexDirection: 'row',
                }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                  }}>
                  <IndicatorSvgSelector id={icon_id} />
                </Box>
                <Typography variant='subtitle2'>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{
            background: '#4793ff',
            color: '#fff',
          }} size="small"
            onClick={onUpdateHandler}>
            Update weather data
          </Button>
        </CardActions>
      </Card>
    </Link >
  );
}, areEqual);
