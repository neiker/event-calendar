import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const CheckboxFreeEvents: React.FunctionComponent<{
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ checked, onChange }) => (
  <FormControlLabel
    control={(
      <Checkbox
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.checked);
        }}
      />
)}
    label="Free"
  />
);
