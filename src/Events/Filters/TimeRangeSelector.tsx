import React from 'react';
import { Slider, Typography } from '@material-ui/core';

export type RangeTuple = [number, number];

export const TimeRangeSelector: React.FunctionComponent<{
  value: RangeTuple;
  onChange: (value: RangeTuple) => void;
}> = ({ value, onChange }) => {
  const handleChange = (_: any, newValue: number | number[]) => {
    onChange(newValue as RangeTuple);
  };

  return (
    <>
      <Typography>Range</Typography>
      <Slider
        value={value}
        min={0}
        step={1}
        max={24}
        marks={[
          {
            value: 6,
            label: '6hr',
          },
          {
            value: 12,
            label: '12hr',
          },
          {
            value: 18,
            label: '18hr',
          },
        ]}
        valueLabelFormat={(v: number) => `${v}hr`}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />

    </>
  );
};
