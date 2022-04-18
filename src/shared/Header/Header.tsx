import React from 'react';
import { Typography, Box } from '@mui/material';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';

export const Header: React.FC = () => {
  return (
    <Box component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: '30px',
        padding: 2,
      }}
    >
      <Box
        sx={{
          marginRight: 2,
        }}
      >
        <GlobalSvgSelector id="header-logo" />
      </Box>
      <Typography variant="h4" component="h1">Weather data app</Typography>
    </Box >
  );
};
