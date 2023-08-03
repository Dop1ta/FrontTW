import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { Controller } from "react-hook-form";
import Box from '@mui/material/Box';

export const CustomAutocomplete = ({ control, name, label, error, placeholder, options, values, ...rest }) => {
  return (

    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch', ml: 9.2 },
      }}
      noValidate
      autoComplete="off"
    >
      <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          id={name}
          sx={{ mt: .5 }}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          options={options ? options : []}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder={label}/>
          )}
          {...rest}
        />
      )} 
      />
    </Box>
    
  )
}