import React from 'react';
import {
  TextField,
  Popover,
  Box,
  Button,
  Divider,
} from '@material-ui/core';

import styles from './Filters.module.css';
import { TimeRangeSelector, RangeTuple } from './TimeRangeSelector';
import { CheckboxFreeEvents } from './CheckboxFreeEvents';

const Search: React.FunctionComponent<{
  value?: string;
  onChange: (value: string) => void;
}> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      label="Search"
      value={value}
      onChange={handleChange}
    />
  );
};

export interface FilterValue {
  search: string;
  range: RangeTuple;
  free: boolean;
}

export const Filters: React.FunctionComponent<{
  onChange: (values: FilterValue) => void;
  value: FilterValue;
}> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = anchorEl !== null;
  const id = open ? 'simple-popover' : undefined;

  const count = React.useMemo(() => {
    let result = 0;

    if (value.search) {
      result += 1;
    }

    if (value.free) {
      result += 1;
    }

    if (value.range[0] !== 0 || value.range[1] !== 24) {
      result += 1;
    }

    return result;
  }, [value]);

  return (
    <Box className={styles.container}>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Filter
        {count ? ` (${count})` : ''}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={styles.filters}>
          <Search
            value={value.search}
            onChange={(search) => {
              onChange({
                ...value,
                search,
              });
            }}
          />

          <Divider style={{ margin: '15px 0' }} />

          <TimeRangeSelector
            value={value.range}
            onChange={(range) => {
              onChange({
                ...value,
                range,
              });
            }}
          />

          <Divider style={{ margin: '15px 0' }} />

          <CheckboxFreeEvents
            checked={value.free}
            onChange={(free) => {
              onChange({
                ...value,
                free,
              });
            }}
          />
        </Box>
      </Popover>
    </Box>
  );
};
