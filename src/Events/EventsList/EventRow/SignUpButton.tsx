import React from 'react';
import { Button } from '@material-ui/core';

export const SignUpButton: React.FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={onClick}
    fullWidth
  >
    Sign Up
  </Button>
);
