import React from 'react';
import { Button } from '@material-ui/core';

export const SignUpButton: React.FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  
  return (
    <Button
      variant={isHovered ? 'contained' : 'outlined'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      color="primary"
      onClick={onClick}
      fullWidth
    >
      Sign Up
    </Button>
  );
};
