import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/system';
import { IndicatorSvgSelector } from '../../assets/icons/indicators/IndicatorSvgSelector';
import { useDispatch } from 'react-redux';
import { selectCurrentWeatherData } from '../../store/selectors';
import { useCustomSelector } from '../../hooks/store';
import { fetchHourlyWeather } from '../../store/thunks/fetchCurrentWeather';

interface stateType {
  lon: number, lat: number, cityName: string
}

export const CityPage: React.FC = () => {
  const location = useLocation<stateType>()
  const dispatch = useDispatch();
  const { hourlyWeather } = useCustomSelector(selectCurrentWeatherData);
  const { lon, lat, cityName } = location.state;

  useEffect(() => {
    dispatch(fetchHourlyWeather(lon, lat))
  }, [dispatch, lon, lat]);

  const {
    temp, feels_like, humidity, pressure, wind_speed
  } = hourlyWeather.current;

  const items = [{
    icon_id: 'temp',
    value: `${Math.round(temp)}° -  feels like ${Math.round(feels_like)}°`,
  },
  {
    icon_id: 'precipitation',
    value: `humidity ${humidity}%`,
  },
  {
    icon_id: 'pressure',
    value: `${pressure} mmHg`,
  },
  {
    icon_id: 'wind',
    value: `${Math.round(wind_speed)} м/с `,
  },
  ];

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant='h4' gutterBottom>
          {cityName}
        </Typography>
        {items.map(({ icon_id, value }) => (
          <Box key={icon_id} sx={{
            display: 'flex',
            marginBottom: 2,
            marginTop: 2,
          }
          }>
            <IndicatorSvgSelector id={icon_id} />
            <Typography sx={{ marginLeft: 2 }} variant="subtitle1">{value}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2 }} >
        <Typography variant="subtitle1" gutterBottom>
          Hourly forecast
        </Typography>
        <Box sx={{ display: 'flex', overflowY: 'auto', }}>
          {hourlyWeather.hourly.map((item, idx) => {
            if (idx > 24) {
              return null
            }
            return (
              <Card key={item.dew_point + idx} sx={{
                width: 40, height: 26,
                m: 1,
                display: 'flex',
                flexShrink: 0,
                p: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }} >
                <Typography sx={{ fontSize: 12 }} gutterBottom>
                  {Math.round(item.temp)}°
                </Typography>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
};
