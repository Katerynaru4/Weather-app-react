import React from 'react';
import { Box, Button, Input } from '@mui/material';

type Props = {
  inputValue: string,
  setInputValue: (value: string) => void,
  addCityToList: () => void
}

export const CityInput: React.FC<Props> = ({ inputValue, setInputValue, addCityToList }) => {
  return (
    <Box sx={{ marginBottom: 4, marginLeft: 2 }} >
      <Input sx={{ marginRight: 1 }} value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.code === 'Enter') {
            addCityToList()
          }
        }} />
      <Button
        onClick={(e) => {
          e.preventDefault()
          addCityToList()
        }}
        variant="contained"
        sx={{
          background: '#4793ff',
          fontSize: 10,
          border: 0,
          color: '#fff',
        }}
        size="small"
      >
        Find out city weather
      </Button>
    </Box>
  );
}

