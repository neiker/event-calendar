import React from 'react';
import { Button } from '@material-ui/core';

export const CancelButton: React.FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  return (
    <Button
      color={isHovered ? 'secondary' : undefined}
      variant={isHovered ? 'contained' : 'outlined'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      fullWidth
    >
      {isHovered ? 'Cancel' : 'You are in'}
    </Button>
  );
};
