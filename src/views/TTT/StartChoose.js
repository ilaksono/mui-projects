import React from 'react';
import Button from '@material-ui/core/Button';

const StartChoose = (props) => {
  const handleClick = (val) => {
    props.handleStart(val);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Button onClick={() => handleClick('X')}>
        X
      </Button>
      <Button onClick={() => handleClick('O')}>
        O
      </Button>
    </div>
  );
};

export default StartChoose;